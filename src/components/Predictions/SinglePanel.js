/**
 * Panel with discipline name, image, score, isIndividual flag, and tags.
 */

import React from "react";
import PropTypes from "prop-types";
import { disciplineScore, predictionSkillScore, solo, tags } from "../../libs/calculate";
import { Panel } from "react-bootstrap";
import { assets } from "../../libs/assets";
import "./index.styl";

export default class SinglePanel extends React.Component {
  render(){
    const { discipline, index, athlete } = this.props;
      return (
        <Panel key={discipline.name} eventKey={index}>
          <Panel.Heading>
            <Panel.Title toggle>
              <span className="disciplinename">{discipline.name} </span>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible className="disciplinedescription">
            <div>
              <img className="disciplinephoto" src={discipline.photo} alt="Logo" />
            </div>
            <div>
              <p>Discipline Score:{" "}{disciplineScore(athlete.skillset,discipline.requirements)}</p>
              <p>{solo(discipline)}</p>
              <p>{tags(discipline)}</p>
              <div className="skillset">
                {Object.keys(discipline.requirements).map((skill, index) => {
                  return (
                    <div className="blueskill" key={skill}>
                      <img className="assetphoto" src={assets[index]} alt={index}/>
                      {predictionSkillScore(athlete.skillset[skill], discipline.requirements[skill])}
                    </div>
                  );
                })}
              </div>
            </div>
          </Panel.Body>
        </Panel>
    );
  }
}