const mysql = require("mysql2");
const { host, user, password, database } = require("./config");

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("MySQL connected ✅");
});

module.exports = connection;