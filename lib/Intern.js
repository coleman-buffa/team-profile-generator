const Employee = require ('./Employee.js');

class Intern extends Employee {
	constructor (name, id, email, school) {
		super (name, id, email);
		this.school = school;
	}
}

Intern.prototype.getSchool = function () {
	return this.school;
}

Intern.prototype.getRole = function () { 
	return 'Intern';
}

module.exports = Intern;