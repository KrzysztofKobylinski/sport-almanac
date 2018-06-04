Junior Front-end Developer Assignment
-------------------------------

# Introduction:

Hello there! So you are applying for Junior Front-end Developer position at Bevy? That's great, we sincerely hope all of us can benefit from it.
To help you show your skills and prepare you for work ahead of you we've prepared a small assignment.
We'd like you to finish up this small tool for speculating how well athletes would perform in olympic disciplines they don't normally participate in.
Below you'll find list of features for that tool. Not all of them are necessary, but your chances for landing this job vastly increases with quality of your work.
Don't forget about quantity, though. Completing fewer tasks, but with greater attention to details will be noted. So decide on your own how to best show your best assets.
We really appreciate your time and effort, thanks again for applying and see you at the other end!


# Requirements

### TL;DR 
Use this code as a bootstrap for your project, do your thing and then send us the results as a .zip package.

### Development
1. Run `npm install` in your console to install all dependencies
2. Run `npm start` to start project in your browser
3. Development server should automatically refresh on any changes made on project files in your IDE
4. After development pack all of your work and send in our direction (email address we contacted you from).
You may run `npm run zip` to create "assignment.zip" with project assets but check if it contains all your changes. 


# Features
1. Add buttons for displaying previous and next athlete profiles
2. Display Section as tabs instead of the list (Overview, Predictions, Hints)
3. Improve "Skillset" display in "Overview"
 - display items horizontally
 - use icons from assets/ directory instead of names
 - use green & red to mark the highest and lowest values (with Simone Biles upperBody and endurance should be in red, aesthetics in green)
4. Add Filters to "Predictions" based on discipline tags and 'isIndividual' flag
5. Add sort options alphabetical & based on overall score
6. Improve display of diciplines in "Predictions"
 - add discipline photo
 - add 'Individual sport' / 'Team sport' based on 'isIndividual' flag
 - add disciplines tags
 - make each discipline collapsible (toggle when clicked)
 - animate fold / unfold effect
 - display drilldown of score per skill (similar to skills in "Profile" but this time with skillScore)
7. Extract common style values into reusable variables set (eg. primary color) and use it throughout the project
8. Implement Hints
    Display 2 columns "Should try" & "Should avoid" with at least three disciplines each.
    It should be those disciplines, that are not native for the athlete and have highest & lowest overall score respectively.
    If more then 3 disciplines share the same score display them as well.
