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
    type: 'input',
    message: 'What is the Department ID for this role?',
    name: 'department_id',
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
        query('SELECT * FROM role')
        }
    if (answers.choice === 'view all employees'){
        query('SELECT * FROM employee')
        }
    }
    function query (queryString) {
    db_obj.runQuery(queryString, start)
    }
    start();