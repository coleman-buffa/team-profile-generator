# Team Profile Generator

The Team Profile Generator is a command line interface application that takes in employee data and makes a web page with that information. Through a series of prompts the user can enter an employee's name, ID, email address, and select weather the employee is an engineer or an intern. An additional question will be asked depending on the type of employee selected. Once the entry process is complete the application will ask if the user wants to repeat the employee data collection process, or stop. Once the user is satisfied then a HTML page will be generated and stored inside an output directory. The HTML document is created by making Bootstrap cards for each employee and appending the cards to a template document.

![Walkthrough Video](./assets/walkthrough.gif)

## Table of Contents

||||
|:-|:-|:-|:-|:-
| [Project Introduction](#team-profile-generator) | [Table of Contents](#table-of-contents) | [Goals and Methods](#goals-and-methods) 
| [Installation](#installation) | [Technologies](#technologies) | [Deployed Link](#deployed-link) |
| [Authors](#authors) | [Acknowledgments](#acknowledgments) | [License](#license) |
---

## Goals and Methods

There were three primary learning objectives for this build:
* Build an application  given a set of tests built with jest.js,
* Practice using javascript classes and constructors, and 
* Additional practice with handling asynchronous processing.

A mentor provided a set of tests built using jest.js as a means of simulating a test driven development environment. These tests guided the development of the employee class and three inheritor classses including what properties and methods to include in constructors. Snippet 1 demonstrates how tests were used to shape the development of classes and constructors:
Snippet 1:
```javascript
test("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Alice", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});

class Employee {
	constructor (name, id, email) {
		this.name = name;
		this.id = id;
		this.email = email;
	}
}
```

All class methods were declared as prototypes to save on memory as multiple instatiations of each class are expected in the use the this application.

Developing the application required handling asynchronous tasks such as inquirer.js prompts and writing to file. Node.js provides synchronous versions of some functions inside the file system package. It is understood that using synchronous functions may not be considered best practice. However their function blocking property provided a simple solution to checking the file directory for the existense of the target directory and writing to said directory. In addition by this point in the application's execution these was nothing else going on that would be delayed. See Snippet 2 for details:
Snippet 2:
```javascript
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR);
}
fs.writeFileSync(outputPath, render(empRoster));
```

## Installation

This application requires node.js and inquirer.js. Testing was developed using jest.js. Once node is installed please used npm install inquirer and npm install jest.js.

## Technologies 

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Bootstrap ](https://getbootstrap.com/)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/)
* [Inquirer.js](https://www.npmjs.com/package/inquirer)
* [jest.js](https://jestjs.io/)

## Authors

Coleman Buffa

* [Git Hub](https://github.com/coleman-buffa/team-profile-generator)
* [LinkedIn](https://www.linkedin.com/in/coleman-buffa/)

## Acknowledgments

My thanks to the many mentors and friends who are a constant source of project ideas, learning topics, and guidance.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### [Back to Table of Contents](#table-of-contents)