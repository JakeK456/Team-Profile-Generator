const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

// team consists of one manager and optionally any number of engineers and interns
class Team {
    constructor(managerName, managerID, managerEmail, managerOfficeNumber){
        this.members = [];
        this.manager = new Manager(managerName, managerID, managerEmail, managerOfficeNumber);
        this.members.push(this.manager);
    }

    addEngineer(name, id, email, github){
        const engineer = new Engineer(name, id, email, github);
        this.members.push(engineer);
    }

    addIntern(name, id, email, school){
        const intern = new Intern(name, id, email, school);
        this.members.push(intern);
    }
}

module.exports = Team;
