const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const empRoster = [];

async function promptManager() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Enter employee name:',
		},
		{
			type: 'input',
			name: 'id',
			message: 'Enter employee ID:',
		},
		{
			type: 'input',
			name: 'email',
			message: 'Enter employee email:',
		},
		{
			type: 'input',
			name: 'office',
			message: 'Enter office number:',
		}
	]).then(function (answers) {
		answers.emptype = 'Manager';
		rosterAdd(answers);
		goAgain();
	})
}

function promptEmployee() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Enter employee name:',
		},
		{
			type: 'input',
			name: 'id',
			message: 'Enter employee ID:',
		},
		{
			type: 'input',
			name: 'email',
			message: 'Enter employee email:',
		},
		{
			type: 'list',
			name: 'emptype',
			message: 'Select employee type',
			choices: ['Engineer', 'Intern'],
		},
		{
			type: 'input',
			name: 'github',
			message: 'Enter GitHub user name:',
			when: (answers) => answers.emptype === 'Engineer',
		},
		{
			type: 'input',
			name: 'school',
			message: 'Enter school the intern attends:',
			when: (answers) => answers.emptype === 'Intern',
		}
	]).then(function (answers) {
		rosterAdd(answers);
		goAgain();
	});
}

function goAgain() {
	inquirer.prompt([
		{
			type: 'list',
			name: 'exitChoice',
			message: 'Would you like to enter another employee?',
			choices: ['Yes', 'No'],
		},
	]).then(function (userChoice) {
		switch (userChoice.exitChoice) {
			case 'Yes':
				promptEmployee();
				break;
			case 'No':
				if (!fs.existsSync(OUTPUT_DIR)) {
					fs.mkdirSync(OUTPUT_DIR);
				}
				fs.writeFile(outputPath, render(empRoster), (err) => {
					if (err) throw err;
					console.log('\n Your web page is being created...');
				});
				break;
		}
	})
}

function rosterAdd(employee) {
	switch (employee.emptype) {
		case 'Manager':
			empRoster.push(new Manager(employee.name, employee.id, employee.email, employee.office));
			break;
		case 'Engineer':
			empRoster.push(new Engineer(employee.name, employee.id, employee.email, employee.github));
			break;
		case 'Intern':
			empRoster.push(new Intern(employee.name, employee.id, employee.email, employee.school));
			break;
	}
}

promptManager();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```