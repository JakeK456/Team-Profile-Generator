const figlet = require("figlet");
const fs = require("fs").promises;
const generateHTML = require("../src/generateHTML");
const inquirer = require("inquirer");
const Team = require("./Team");

class CLI {
  constructor() {
    // initialize list to null. List will be created after user provides a name.
    this.team = null;
  }

  start() {
    //create a promise to allow chaining .then/.catch
    new Promise((resolve, reject) => {
      figlet("Team Profile Generator", function (err, data) {
        if (err) {
          reject(err);
          return;
        }
        console.log(data);
        resolve();
      });
    })
      .catch(() => {
        // something is wrong with figlet.
        // provide fallback welcome message
        console.log("Welcome to Team Profile Generator");
      })
      .then(() => {
        // return promise to continue chaining
        return inquirer.prompt([
          {
            type: "input",
            message: "Enter team managers name:",
            name: "managerName",
          },
          {
            type: "input",
            message: "Enter team managers employee ID:",
            name: "managerID",
          },
          {
            type: "input",
            message: "Enter team managers email address:",
            name: "managerEmail",
          },
          {
            type: "input",
            message: "Enter team managers email office number:",
            name: "managerOfficeNumber",
          },
        ]);
      })
      .then(({ managerName, managerID, managerEmail, managerOfficeNumber }) => {
        this.team = new Team(managerName, managerID, managerEmail, managerOfficeNumber);
        // return to chain any errors to the last .catch below
        this.addEmployee();
      })
      .catch((err) => this.handleError(err));
  }

  handleError(err) {
    console.log(err);
    console.log("Uh oh. Something went wrong. Scroll up to see details.");
  }

  addEmployee() {
    return inquirer
      .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["Add an Engineer", "Add an Intern", "Finish Building Team"],
        }
        ])
        .then(({ choice }) => {
            if (choice === "Add an Engineer") {
                // run prompt to create engineer
                return inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Enter engineer's name:",
                            name: "name"
                        },
                        {
                            type: "input",
                            message: "Enter engineer's ID:",
                            name: "id"
                        },
                        {
                            type: "input",
                            message: "Enter engineer's email:",
                            name: "email"
                        },
                        {
                            type: "input",
                            message: "Enter engineer's GitHub:",
                            name: "github"
                        },
                    ])
                    .then(({ name, id, email, github }) => {
                        this.team.addEngineer(name, id, email, github);
                        return this.addEmployee();
                    })
                    .catch((err) => this.handleError(err));
            }
            else if (choice === "Add an Intern"){
                // run prompt to create intern
                return inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Enter intern's name:",
                            name: "name"
                        },
                        {
                            type: "input",
                            message: "Enter intern's ID:",
                            name: "id"
                        },
                        {
                            type: "input",
                            message: "Enter intern's email:",
                            name: "email"
                        },
                        {
                            type: "input",
                            message: "Enter intern's school:",
                            name: "school"
                        },
                    ])
                    .then(({ name, id, email, school }) => {
                        this.team.addIntern(name, id, email, school);
                        return this.addEmployee();
                    })
                    .catch((err) => this.handleError(err));
            }
            else{
                return this.writeHtml();
            }
        })  
        .catch((err) => this.handleError(err));
  }

  writeHtml() {
    const html = generateHTML(this.team.members);
    fs.writeFile("dist/team.html", html)
      .then(() => {
        console.log(
          "Created team.html file. You'll find it in the 'dist' folder."
        );
      })
      .catch((err) => this.handleError(err));
  }
}

module.exports = CLI;