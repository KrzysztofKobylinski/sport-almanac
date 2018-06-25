/**
 * Component displaying and managing list of disciplines with calculated athlete score.
 */

import React from "react";
import PropTypes from "prop-types";
import { disciplineScore } from "../../libs/calculate";
import { PanelGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import SinglePanel from "./SinglePanel";
import "./index.styl";

export default class Predictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disciplines: [],
      tagFilter: "",
      isIndividual: "",
      isSortedBy: "",
      activePanelNumber: ""
    };
  }

  componentDidMount() {
    this.setState({
      disciplines: this.props.disciplines
    });
  }

  componentDidUpdate(prevProps) {
    const { isIndividual, isSortedBy } = this.state;
    if (this.props.athlete.skillset !== prevProps.athlete.skillset) {
      if (isIndividual === "yes") {
        this.showOnlyIndividual();
      } else if (isIndividual === "no") {
        this.showOnlyTeamSport();
      } else {
        this.showAllSports();
      }

      if (isSortedBy === "alphabet") {
        this.sortByAlphabet();
      } else if (isSortedBy === "overallscore") {
        this.sortByOverallScore();
      }
    }
  }

  showOnlyIndividual = () => {
    const filteredDisciplines = this.state.disciplines.filter(
      a => a.isIndividual
    );
    this.setState(
      {
        disciplines: filteredDisciplines,
        isIndividual: "yes",
        activePanelNumber: ""
      },
      () => this.tagClick(this.state.tagFilter)
    );
  };

  showOnlyTeamSport = () => {
    const filteredDisciplines = this.state.disciplines.filter(
      a => !a.isIndividual
    );
    this.setState(
      {
        disciplines: filteredDisciplines,
        isIndividual: "no",
        activePanelNumber: ""
      },
      () => this.tagClick(this.state.tagFilter)
    );
  };

  showAllSports = () => {
    this.setState(
      {
        disciplines: this.state.disciplines,
        isIndividual: "default",
        activePanelNumber: ""
      },
      () => this.tagClick(this.state.tagFilter)
    );
  };

  getUniqueTags = () => {
    const tagArray = this.props.disciplines.map(a => a.tags);
    const arrayOfUniqueTags = []
      .concat(...tagArray)
      .map(tag => tag.replace("-", " "))
      .filter((el, i, arr) => arr.indexOf(el) === i)
      .sort((a, b) => a.localeCompare(b)); 
    return arrayOfUniqueTags;
  };

  tagClick = input => {
    console.log("TAG KLIK!")
    const { disciplines } = this.state;
    console.log(disciplines)
    if (input !== "default") {
      const filteredByTags = disciplines
        .map(a => a.tags
        .filter(a => a === input)
      );
      console.log(filteredByTags)

      const disciplinesFilteredByTags = disciplines
        .filter((discipline, index) => filteredByTags[index] == input
      );
      console.log(disciplinesFilteredByTags)

      this.setState(
        {
          disciplines: disciplinesFilteredByTags,
          tagFilter: input
        },
        () => this.applySorting()
      );
    } else {
      this.setState(
        {
          disciplines: disciplines,
          tagFilter: "default"
        },
        () => this.applySorting()
      );
    }
  };

  applySorting = () => {
    const { isSortedBy } = this.state;
    isSortedBy === "alphabet"
      ? this.sortByAlphabet()
      : isSortedBy === "overallscore"
        ? this.sortByOverallScore()
        : null;
  };

  sortByAlphabet = () => {
    const sortedDisciplines = this.state.disciplines;
    sortedDisciplines.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({
      disciplines: sortedDisciplines,
      isSortedBy: "alphabet",
      activePanelNumber: ""
    });
  };

  sortByOverallScore = () => {
    const sortedDisciplines = this.state.disciplines;
    const { skillset } = this.props.athlete;
    sortedDisciplines.sort(
      (a, b) =>
        disciplineScore(skillset, b.requirements) -
          disciplineScore(skillset, a.requirements) ||
        a.name.localeCompare(b.name)
    );
    this.setState({
      disciplines: sortedDisciplines,
      isSortedBy: "overallscore",
      activePanelNumber: ""
    });
  };

  handleSelect = activePanelNumber => {
    this.setState({ activePanelNumber });
  };

  render() {
    const { activePanelNumber, disciplines } = this.state;
    return (
      <section className="c-predictions">
        <span className="label">Is this sport individual?</span>
        <div className="buttonsection">
          <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
            <ToggleButton value={0} onClick={this.showAllSports}>
              Show All
            </ToggleButton>
            <ToggleButton value={1} onClick={this.showOnlyIndividual}>
              Yes
            </ToggleButton>
            <ToggleButton value={2} onClick={this.showOnlyTeamSport}>
              No
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <span className="label">Filter tags:</span>
        <div className="buttonsection">
          <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
            <ToggleButton onClick={() => this.tagClick("default")} value={0} key={0}>
              Show All
            </ToggleButton>
            {this.getUniqueTags().map((tag, index) => {
              return (
                <ToggleButton
                  onClick={() => this.tagClick(tag)}
                  value={index + 1}
                  key={index + 1}
                >
                  {tag}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </div>
        <span className="label">Sorting order:</span>
        <div className="buttonsection">
          <ToggleButtonGroup type="radio" name="options">
            <ToggleButton value={1} onClick={this.sortByAlphabet}>
              Alphabet
            </ToggleButton>
            <ToggleButton value={2} onClick={this.sortByOverallScore}>
              Overall Score
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <PanelGroup
          accordion
          id="disciplinesection"
          activeKey={activePanelNumber}
          onSelect={this.handleSelect}
        >
          {disciplines.map((discipline, index) => (
            <SinglePanel
              athlete={this.props.athlete}
              discipline={discipline}
              index={index}
              key={index}
            />
          ))}
        </PanelGroup>
      </section>
    );
  }
}

Predictions.propTypes = {
  athlete: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    skillset: PropTypes.objectOf(PropTypes.number).isRequired,
    nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  disciplines: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      isIndividual: PropTypes.bool.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      requirements: PropTypes.objectOf(PropTypes.number).isRequired
    })
  ).isRequired
};