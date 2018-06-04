/**
 * Component for aggregating user data. Displays disciplines with lowest & highest scores for the given athlete.
 */

import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import HintTable from "./HintTable";
import "./index.styl";

export default class Hints extends React.Component {
  render() {
    const { athlete, disciplines } = this.props; 
    return (
      <section className="c-hints">
        <Row>
          <Col xs={6}>
            <HintTable athlete={athlete} disciplines={disciplines} whichExtreme="max"/>
          </Col>
          <Col xs={6}>
            <HintTable athlete={athlete} disciplines={disciplines} whichExtreme="min"/>
          </Col>
        </Row>
      </section>
    );
  }
}

Hints.propTypes = {
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
