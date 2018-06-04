/**
 * Component for displaying basic info about the provided athlete.
 */
import React from "react";
import PropTypes from "prop-types";
import { isExtreme } from "../../libs/calculate";
import { assets } from "../../libs/assets";
import "./index.styl";

export default class Overview extends React.Component {
  render() {
    const { skillset, bio } = this.props; 
    return (
      <section className="c-overview">
        <div className="label">Bio</div>
        <div className="bio">{bio}</div>
        <div className="label">Skillset</div>
        <div className="skillset">
          {Object.keys(skillset).map((skill, index) => {
            return (
              <div className={`skill ${isExtreme(skillset,skillset[skill])}`} key={skill}>
                <img className="assetphoto" src={assets[index]} alt={index}/>
                {skillset[skill]}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

Overview.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  skillset: PropTypes.objectOf(PropTypes.number).isRequired,
  nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired
};