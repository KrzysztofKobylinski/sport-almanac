/**
 * Method for calculating score for individual skill
 * @param {number} personalSkill skill value of an athlete
 * @param {number} requirement skill value requirement of a discipline
 */
export const skillScore = (personalSkill, requirement) => {
    return (personalSkill - requirement) * requirement * 2;
}


// added condition, because skillScore can be negative, and I don't think Skill Score Prediction should be negative 
export const predictionSkillScore = (personalSkill, requirement) => {
    let temp = (personalSkill - requirement) * requirement * 2;
    return ( temp > 0 ? temp : "0")
}


/**
 * Method for calculating score for an athlete in specific discipline
 * @param {object} athleteSkillset object with an athlete skillset
 * @param {object} disciplineRequirements object with an discipline requirements
 */
export const disciplineScore = (athleteSkillset, disciplineRequirements) => {
    let score = 50;
    for (let skill of Object.keys(athleteSkillset))
        score += skillScore(athleteSkillset[skill], disciplineRequirements[skill]);
    return score;
}

//Checks if discipline is individual or not
export const solo = (discipline) => 
	discipline.isIndividual 
		? "Individual sport" 
		: "Team sport"

//Displays tags
export const tags = (discipline) => 
	discipline.tags.length !== 0 
		? "Tags: " + discipline.tags.toString().replace(",", ", ") 
		: "No tags"

//Returns style name depending on value
export const isExtreme = (value, current) => {
	const arr = Object.values(value)
	const min = Math.min(...arr)
	const max = Math.max(...arr)
	if (current === min) {
		return "minSkill"
	} else if (current === max) {
	    return "maxSkill"
	} else {
		return "normalSkill"
	}
}