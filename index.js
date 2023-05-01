const fs = require("fs");
const inquirer = require("inquirer");
const Database = require('./Develop/assets/database');
const db_obj = new Database();

let questions = [{
    type: 'list',
    message: 'What do you want to do?',
    name: 'choice',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
},
{
    type: 'input',
    message: 'What is the new Department name?',
    name: 'name',
    when: function (answers) {
        return (answers.choice === 'add a department')
    }
},
{
    type: 'input',
    message: 'What is the new Role title?',
    name: 'title',
    when: function (answers) {
        return (answers.choice === 'add a role')
    }
},
{
    type: 'input',
    message: 'What is the salary of this role?',
    name: 'salary',
    when: function (answers) {
        return (answers.choice === 'add a role')
    }
    
},
{
    type: 'list',
    message: 'What is the Department name for this role?',
    name: 'department_name',
    choices: () => {
      return db_obj.generateDepartmentChoices().then(names => {
        return names;
      });
    },
    when: function (answers) {
      return (answers.choice === 'add a role')
    }
},
{
    type: 'input',
    message: 'What is the first name of the employee?',
    name: 'first_name',
    when: function (answers) {
        return (answers.choice === 'add an employee')
    }
},
{
    type: 'input',
    message: 'What is the last name of the employee?',
    name: 'last_name',
    when: function (answers) {
        return (answers.choice === 'add an employee')
    }
},
{
    type: 'input',
    message: 'What is the role ID of the employee?',
    name: 'role_id',
    when: function (answers) {
        return (answers.choice === 'add an employee')
    }
},
{
    type: 'input',
    message: 'Who is the manager of this employee?',
    name: 'manager',
    when: function (answers) {
        return (answers.choice === 'add an employee')
    }
},
]


async function start() {
    console.log ('Welcome to the company database!')
    const answers = await inquirer.prompt(questions)
    
    console.log (answers)
    if (answers.choice === 'view all departments'){
    query('SELECT * FROM department')
    }
    if (answers.choice === 'view all roles'){
        const selectQuery = "SELECT role.id, role.title, role.salary, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id;"
        query(selectQuery)
        }
    if (answers.choice === 'view all employees'){
        const joinQuery = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager, role.title, role.salary, department.name as department_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;"
        query(joinQuery)
        }
    if (answers.choice === 'add a department'){
        let queryString = `INSERT INTO department (name) VALUES ("${answers.name}")`
        query(queryString)
        }
    if (answers.choice === 'add a role') {
        // Get department ID by name
        let department_id = await db_obj.getDepartmentIdByName(answers.department_name);
        console.log("Department ID is: " +department_id);
        // Insert new role into the database
        let queryString = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${department_id})`;
        query(queryString);
        }
    }

function query (queryString) {
    db_obj.runQuery(queryString, start)
    }


start();