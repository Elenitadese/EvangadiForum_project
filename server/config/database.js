const mysql2 = require("mysql2");

const dbconnect = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

dbconnect.getConnection(function (err, connection) {
  console.log("database connected");
});
const registration = `
CREATE TABLE IF NOT EXISTS registration (
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);
`;

const profile = `
CREATE TABLE IF NOT EXISTS profile (
    user_profile_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE
);
`;

const question = `
CREATE TABLE IF NOT EXISTS question (
    question_id INT AUTO_INCREMENT,
    question_title VARCHAR(255) NOT NULL,
    question_description TEXT NOT NULL,
    tags VARCHAR(255),
    post_id INT NOT NULL,
    user_id INT,
    PRIMARY KEY (question_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE
);
`;

const answer = `
CREATE TABLE IF NOT EXISTS answer (
    answer_id INT AUTO_INCREMENT,
    answer_block TEXT NOT NULL,
    user_id INT,
    question_id INT NOT NULL,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE
);
`;
dbconnect.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registration table created");
});

dbconnect.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile table created");
});

dbconnect.query(question, (err, results) => {
  if (err) throw err;
  console.log("question table created");
});

dbconnect.query(answer, (err, results) => {
  if (err) throw err;
  console.log("answer table created");
});

// module.exports = dbconnect.promise();