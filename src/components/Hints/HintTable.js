/**
 * Table component
 */

import React from "react";
import PropTypes from "prop-types";
import {
  disciplineScore,
  predictionSkillScore,
  isExtreme
} from "../../libs/calculate";
import "./index.styl";
import { Table } from "react-bootstrap";

export default class HintTable extends React.Component {
  getExtremeValues = whichExtreme => {
    const { athlete, disciplines } = this.props;
    const arrayOfDisciplineScores = [];
    const arrayOfExtremeValues = [];

    disciplines
      .map(discipline => {
        arrayOfDisciplineScores
          .push(disciplineScore(athlete.skillset, discipline.requirements)
      );
    });

    arrayOfDisciplineScores
      .sort((a, b) => 
        (whichExtreme === "max" 
          ? b - a 
          : a - b))
      .map(
        score =>
          !arrayOfExtremeValues.includes(score) &&
          arrayOfExtremeValues.length < 3
            ? arrayOfExtremeValues.push(score)
            : null
      );
    return arrayOfExtremeValues;
  };

  getHints = whichExtreme => {
    
    const { athlete, disciplines } = this.props;

    const sortedDisciplines = disciplines
      .filter(
        discipline => !athlete.nativeDisciplines.includes(discipline.name)
      )
      .filter(discipline =>
        this.getExtremeValues(whichExtreme).includes(
          disciplineScore(athlete.skillset, discipline.requirements)
        )
      )
      .sort(
        (a, b) =>
          disciplineScore(athlete.skillset, b.requirements) -
            disciplineScore(athlete.skillset, a.requirements) ||
          a.name.localeCompare(b.name)
      );
    return whichExtreme === "max"
      ? sortedDisciplines
      : sortedDisciplines.reverse();
  };

  render() {
    const { athlete, whichExtreme } = this.props;
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Should {whichExtreme === "max" ? "try" : "avoid"}</th>
            <th className="score">Score</th>
          </tr>
        </thead>
        <tbody>
          {this.getHints(whichExtreme).map((discipline, index) => {
            
            return (
              <tr key={discipline.name}>
                <td>{discipline.name}</td>
                <td>
                  {disciplineScore(athlete.skillset, discipline.requirements)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
