//Package imports.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//Filepath for writing output HTML.
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Project module that creates HTML document when given the employee list.
const render = require("./lib/htmlRenderer");

const empRoster = [];

//Starting point for the application where the user gets to input the 
//manager's info. Then the function calls the goAgain funcion which
//can continue the process as long as the user wants.
function promptManager() {
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

//Collect an employee's information and call goAgain.
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

//Ask the user if they want to enter an additional employee. If they 
//select no all entered employee will be passed off to the render HTML
//function.
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
				//Create target directory if it does not exist
				if (!fs.existsSync(OUTPUT_DIR)) {
					fs.mkdirSync(OUTPUT_DIR);
				}
				fs.writeFileSync(outputPath, render(empRoster));
				console.log('\n Your web page is being created...');
				break;
		}
	})
}

//Creates a new employee object using the appropriate class and push it to the
//employee roster.
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