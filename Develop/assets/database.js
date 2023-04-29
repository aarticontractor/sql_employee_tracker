const mysql = require('mysql2');

class Database {
  constructor() {
    console.log("Constructor was run");
    this.db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysql1234@',
      database: 'company_db'
    });
  }

  runQuery(queryString) {
    this.db.query(queryString, function(err, results) {
      if (err) throw err;
      console.log(results);
      // console.log(fields);
    });
  }
}

module.exports = Database;
