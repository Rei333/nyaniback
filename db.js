const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "nyanimal",
    password: "Sivye7P2Eh&GgY%Z",
    database: "nyanimal"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("MySQL connected ✅");
});

module.exports = connection;