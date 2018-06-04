/**
 * Component responsible for Home page layout.
 */
import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, ButtonGroup, Button } from "react-bootstrap";
import Profile from "../../components/Profile";
import Overview from "../../components/Overview";
import Predictions from "../../components/Predictions";
import Hints from "../../components/Hints";
import "./index.styl";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      key: 1
    }
  }

  onClick = input => e => {
    const { count } = this.state
    const { length } = this.props.athletes
    input === "Previous"
    ? count !== 0
        ? this.setState({ count: count - 1 })
        : this.setState({ count: length - 1 })
    : count < length - 1
        ? this.setState({ count: count + 1 })
        : this.setState({ count: 0 })
    
  };

  render() {
    const athlete = this.props.athletes ? this.props.athletes[this.state.count] : null;
    const disciplines = this.props.disciplines ? this.props.disciplines : []
    if (athlete)
      return (
        <div className="home">
          <ButtonGroup className="buttons">
            <Button onClick={this.onClick("Previous")} id="previous">Previous</Button>
            <Button onClick={this.onClick("Next")} id="next">Next</Button>
          </ButtonGroup>
          <Profile {...athlete} />
          <Tabs id="tabs" animation={false}>
            <Tab eventKey={1} title={<div className="tabtitle">Overview</div>}>
              <Overview {...athlete} />
            </Tab>
            <Tab eventKey={2} title={<div className="tabtitle">Predictions</div>}>
              <Predictions athlete={athlete} disciplines={disciplines} />
            </Tab>
            <Tab eventKey={3} title={<div className="tabtitle">Hints</div>}>
              <Hints athlete={athlete} disciplines={disciplines} />
            </Tab>
          </Tabs>
        </div>
      );
    else return <span>No athlete data</span>;
  }
}

Home.propTypes = {
  athletes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      skillset: PropTypes.objectOf(PropTypes.number).isRequired,
      nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
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
