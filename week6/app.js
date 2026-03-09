console.log("WEEK6 START");
const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2km677wk12D.",
    database: "university"
});

connection.connect((err) => {
    if (err) {
        console.log("Connection failed:", err.message);
        return;
    }
    console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/students", (req, res) => {
    connection.query("SELECT * FROM students", (err, results) => {
        if (err) {
            res.send("Database error");
            return;
        }

        res.render("students", { students: results });
    });
});

app.get("/student/:id", (req, res) => {
    const studentId = req.params.id;

    connection.query(
        "SELECT * FROM students WHERE id = ?",
        [studentId],
        (err, results) => {
            if (err) {
                res.send("Database error");
                return;
            }

            if (results.length === 0) {
                res.send("Student not found");
                return;
            }

            res.render("student", { student: results[0] });
        }
    );
});

app.get("/programmes", (req, res) => {
    connection.query("SELECT * FROM programmes", (err, results) => {
        if (err) {
            res.send("Database error");
            return;
        }

        res.render("programmes", { programmes: results });
    });
});

app.get("/modules", (req, res) => {
    connection.query("SELECT * FROM modules", (err, results) => {
        if (err) {
            res.send("Database error");
            return;
        }

        res.render("modules", { modules: results });
    });
});

app.listen(port, () => {
    console.log("Server running on http://localhost:3000");
});