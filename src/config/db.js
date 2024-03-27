require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
    createTablesIfNotExist();
  }
});

function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function createTablesIfNotExist() {
  const createEmployeeTableQuery = `
  CREATE TABLE IF NOT EXISTS Employee (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_name VARCHAR(255) NOT NULL,
    emp_mail VARCHAR(255) UNIQUE,
    emp_designation VARCHAR(100),
    emp_joining_date DATE
  );
`;

  executeQuery(createEmployeeTableQuery)
    .then(() => {
      console.log("Tables created (if not exists)");
    })
    .catch((error) => {
      console.error("Error creating tables:", error);
    });
}

module.exports = { connection, executeQuery };
