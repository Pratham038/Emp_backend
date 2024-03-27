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
  //const createUsersTableQuery = `
  // CREATE TABLE IF NOT EXISTS users (
  //   user_id INT NOT NULL AUTO_INCREMENT,
  //   user_bio VARCHAR(255) ,
  //   user_email VARCHAR(255) NOT NULL UNIQUE,
  //   user_name VARCHAR(255) NOT NULL UNIQUE,
  //   user_password VARCHAR(255) NOT NULL,
  //   PRIMARY KEY (user_id)
  // )`;
  //   const createAccessTokenQuery = `CREATE TABLE IF NOT EXISTS access_tokens (
  //   id INT NOT NULL AUTO_INCREMENT,
  //   user_id INT,
  //   user_email VARCHAR(255) NOT NULL ,
  //   token VARCHAR(255) UNIQUE NOT NULL,
  //   expiration_time TIMESTAMP,
  //   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //   PRIMARY KEY (id),
  //   FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
  // );`;

  const createEmployeeTableQuery = `
  CREATE TABLE Employee (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_name VARCHAR(255) NOT NULL,
    emp_mail VARCHAR(255) UNIQUE,
    emp_designation VARCHAR(100),
    emp_joining_date DATE
  );
`;

  // executeQuery(createUsersTableQuery)
  // .then(() => executeQuery(createAccessTokenQuery))
  // .then(() => executeQuery(createPostsTableQuery))
  // .then(() => executeQuery(createLikesTableQuery))
  // .then(() => executeQuery(createFollowstable))
  executeQuery(createEmployeeTableQuery)
    .then(() => {
      console.log("Tables created (if not exists)");
    })
    .catch((error) => {
      console.error("Error creating tables:", error);
    });
}

module.exports = { connection, executeQuery };
