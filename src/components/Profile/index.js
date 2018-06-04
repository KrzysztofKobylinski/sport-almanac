/**
 * Component displaying basic info about the athlete.
 */

import React from 'react'
import PropTypes from 'prop-types'
import './index.styl'

export default class Profile extends React.Component {
    render() {
        const { photo, name, nativeDisciplines } = this.props;
        return (
            <div className="c-profile">
                <div className="photo" style={{ backgroundImage: `url(${photo})` }} /> 
                <div>
                    <h1 className="name" >{name}</h1>
                    <ul className="disciplines" >
                        {nativeDisciplines.map((name) => 
                            <li key={name} className="discipline-label">{name}</li> 
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    skillset: PropTypes.objectOf(PropTypes.number).isRequired,
    nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
}