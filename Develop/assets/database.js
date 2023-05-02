const mysql = require('mysql2');
// created a constructor class which has the SQL connection
class Database {
  constructor() {
    // console.log("Constructor was run");
    this.db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysql1234@',
      database: 'company_db'
    });
    this.departments = {};
    this.roles = {};
    this.managers = {};
  }

  runQuery(queryString, start) {
    return new Promise((resolve, reject) => {
      this.db.query(queryString, function(err, results) {
        if (err) {
          reject(err);
        } else {
          if (queryString.startsWith('INSERT')) {
            // For INSERT queries, just resolve with no results
            resolve();
          } else if (queryString.startsWith('SELECT')) {
            // For SELECT queries, log results and resolve with results
            console.table(results);
            resolve(results);
          } else if (queryString.startsWith('UPDATE')) {
            // For UPDATE queries, just resolve with no results
            resolve();
          }
        }
      });
    }).then(() => start());
  }
  
  // Created method generateDepartmentChoices to give list options of department names when prompted
 generateDepartmentChoices() {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT name FROM department", (err, results) => {
        if (err) reject(err);
        else {
          const choices = results.map((department) => department.name);
          this.departments = choices; // store the choices array in the object
          resolve(choices);
        }
      });
    });
  }


  // Created method generateRoleChoices to give list options of role names when prompted
  generateRoleChoices() {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT title FROM role", (err, results) => {
        if (err) reject(err);
        else {
          const choices = results.map((role) => role.title);
          this.roles = choices; // store the choices array in the object
          resolve(choices);
        }
      });
    });
  }

  // Created method generateManagerChoices to give list options of manager names when prompted 
  generateManagerChoices() {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT DISTINCT(manager) FROM employee", (err, results) => { //using distinct help to filter out only the unique manager names 
        if (err) {
          reject(err);
        } else {
          const choices = results.map((employee) => employee.manager || 'NULL');
          console.log("Managers are: " +choices);
          this.managers = choices; // store the choices array in the object
          resolve(choices);
        }
      });
    });
  }

  // Created method generateEmployeeChoices to give list options of employee names when prompted 
  generateEmployeeChoices() {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT first_name, last_name FROM employee", (err, results) => {
        if (err) {
          reject(err);
        } else {
          const choices = results.map((employee) => `${employee.first_name} ${employee.last_name}`);
          resolve(choices);
        }
      });
    });
  }
  
  
// Created method  getDepartmentIdByName to convert the departmentName from user input into department_id when prompted 
  getDepartmentIdByName(departmentName) {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT id FROM department WHERE name=?", [departmentName], (err, results) => {
        if (err) reject(err);
        else {
          const departmentId = results[0].id;
          resolve(departmentId);
        }
      });
    });
  }


  // Created method  getRoleIdByName to convert the roleName from user input into role_id when prompted 
  getRoleIdByName(roleName) {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT id FROM role WHERE title=?", [roleName], (err, results) => {
        if (err) reject(err);
        else {
          const roleId = results[0].id;
          resolve(roleId);
        }
      });
    });
  }

  
}

module.exports = Database;
