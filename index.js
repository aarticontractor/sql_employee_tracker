//Imported all the required packages and file paths
const figlet = require('figlet');
const inquirer = require("inquirer");
const Database = require('./Develop/assets/database');
const db_obj = new Database();

//Created inquirer prompt questions and stored them in 'questions' variable
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
            return (answers.choice === 'add a department') //added the 'when' conditional function
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
        choices: () => { // added function to dynamically create an array/list of department name choices by calling the function from database.js
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
        type: 'list',
        message: 'What is the Role name of the Employee?',
        name: 'role_name',
        choices: () => { // added function to dynamically create an array/list of role name choices by calling the function from database.js
            return db_obj.generateRoleChoices().then(names => {
                return names;
            });
        },
        when: function (answers) {
            return (answers.choice === 'add an employee')
        }
    },
    {
        type: 'list',
        message: 'Who is the employees manager?',
        name: 'manager_name',
        choices: () => { // added function to dynamically create an array/list of manager name choices by calling the function from database.js
            return db_obj.generateManagerChoices().then(names => {
                return names;
            });
        },
        when: function (answers) {
            return (answers.choice === 'add an employee')
        }
    },
    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        name: 'emp_name',
        choices: () => { // added function to dynamically create an array/list of employee name choices by calling the function from database.js
            return db_obj.generateEmployeeChoices().then(names => {
                return names;
            });
        },
        when: function (answers) {
            return (answers.choice === 'update an employee role')
        }
    },
    {
        type: 'list',
        message: "Which role do you want to assign the selected employee?",
        name: 'emp_role_name',
        choices: () => { // added function to dynamically create an array/list of role name choices by calling the function from database.js
            return db_obj.generateRoleChoices().then(names => {
                return names;
            });
        },
        when: function (answers) {
            return (answers.choice === 'update an employee role')
        }
    }
]

//added async...await function 
async function start() {
    // console.log ('Welcome to the company database!')
    const answers = await inquirer.prompt(questions)

    //added sql queries for if conditions
    // console.log (answers)
    if (answers.choice === 'view all departments') {
        query('SELECT * FROM department')
    }
    if (answers.choice === 'view all roles') {
        const selectQuery = "SELECT role.id, role.title, role.salary, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id;"
        query(selectQuery)
    }
    if (answers.choice === 'view all employees') {
        const joinQuery = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager, role.title, role.salary, department.name as department_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;"
        query(joinQuery)
    }
    if (answers.choice === 'add a department') {
        let queryString = `INSERT INTO department (name) VALUES ("${answers.name}")`
        query(queryString)
    }
    if (answers.choice === 'add a role') {
        // Get department ID by name
        let department_id = await db_obj.getDepartmentIdByName(answers.department_name);
        console.log("Department ID is: " + department_id);
        // Insert new role into the database
        let queryString = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${department_id})`;
        query(queryString);
    }
    if (answers.choice === 'add an employee') {
        // Get role ID by name
        let role_id = await db_obj.getRoleIdByName(answers.role_name);
        // Insert new employee into the database
        let queryString = `INSERT INTO employee (first_name, last_name, role_id, manager) VALUES ("${answers.first_name}", "${answers.last_name}", ${role_id}, "${answers.manager_name}")`;
        query(queryString);
    }
    if (answers.choice === 'update an employee role') {
        // Get role ID by name
        let role_id = await db_obj.getRoleIdByName(answers.emp_role_name);
        // Update existing emmployee
        // Convert first_name and last_name
        const [first_name, last_name] = answers.emp_name.split(" ");
        let updateQuery = `UPDATE employee SET role_id = ${role_id} WHERE first_name = "${first_name}" and last_name = "${last_name}"`;
        query(updateQuery);
    }
}

function query(queryString) {
    db_obj.runQuery(queryString, start)
}



// Define the text to display in the figlet
const figletText = 'employee tracker';

// Create the figlet and log it to the console
figlet(figletText, function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);

    // Start the inquirer prompt after displaying the figlet
    start();
});