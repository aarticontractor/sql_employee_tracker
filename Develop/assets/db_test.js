const Database = require('./database');

const db_obj = new Database();

let my_query = "SELECT * FROM department;"
db_obj.runQuery(my_query);
