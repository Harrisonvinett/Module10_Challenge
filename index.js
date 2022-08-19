const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DISTDIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DISTDIR, 'index.html');

const teamMembers = [];
const idArray = [];
const render = require('./src/pagetemplate.js');


// asks user for team logger
console.log(
  '\n Team generator!\nUse `npm run reset` to reset the dist/ folder\n'
);




function appMenu() {
  function createManager() {
    inquirer.prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "Enter the Manager's name:",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            
            return 'Please enter at least one character.';
          },
        },

        {
          type: 'input',
          name: 'managerId',
          message: "What is manager's id?",
          validate: (answer) => {
            // allows answer to be a numerial character
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter number';
          },
        },

        {
          type: 'input',
          name: 'managerEmail',
          message: "Enter manager's email?",
          validate: (answer) => {
            // checks to see if answer has @ & .
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: "Enter manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
      ]).then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'Which type of Employee would you like to add?',
          choices: [
            'Engineer',
            'Intern',
            "All-done",
          ],
        },
      ])
      // uses switch case so user can pick nxt employee
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case 'Engineer':
            addEngineer();
            break;
          case 'Intern':
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engineerName',
          message: "Eneter engineer's name:",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter a name.';
          },
        },
        {
          type: 'input',
          name: 'engineerId',
          message: "Enter engineer's id:",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return 'This ID is already taken!';
              } else {
                return true;
              }
            }
            return 'Please enter number.';
          },
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: "Enter engineer's email:",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'engineerGithub',
          message: "Enter engineer's GitHub name:",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter a name:';
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        idArray.push(answers.engineerId);
        teamMembers.push(engineer);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: "Enter intern's name:",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Enter name!';
          },
        },
        {
          type: 'input',
          name: 'internId',
          message: "Enter intern's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return 'ID is already taken!';
              } else {
                return true;
              }
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'internEmail',
          message: "Enter intern's email:",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'internSchool',
          message: "Enter intern's school:",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please Enter Name';
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        idArray.push(answers.internId);
        teamMembers.push(intern);
        createTeam();
      });
  }

  function buildTeam() {
    // Creates  directory if path doesn't exist
    if (!fs.existsSync(DISTDIR)) {
      fs.mkdirSync(DISTDIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  createManager();
}

appMenu();
