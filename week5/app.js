const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2km677wk12D.",
    database: "university"
});

connection.connect((err) => {
    if (err) {
        console.log("Connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
    res.send(`
        <h1>University Database</h1>
        <ul>
            <li><a href="/students">Students</a></li>
            <li><a href="/students/json">Students JSON</a></li>
            <li><a href="/programmes">Programmes</a></li>
            <li><a href="/programmes/json">Programmes JSON</a></li>
            <li><a href="/modules">Modules</a></li>
            <li><a href="/modules/json">Modules JSON</a></li>
        </ul>
    `);
});

app.get("/students/json", (req, res) => {
    connection.query("SELECT * FROM students", (err, results) => {
        if (err) {
            res.send("Database error");
            return;
        }
        res.json(results);
    });
});

app.get("/students", (req, res) => {
    connection.query("SELECT * FROM students", (err, results) => {

        if (err) {
            res.send("Database error");
            return;
        }

        let html = `
        <h1>Students</h1>
        <table border="1" cellpadding="8">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
        </tr>
        `;

        results.forEach((student) => {
            html += `
            <tr>
                <td>${student.id}</td>
                <td>
                    <a href="/student/${student.id}">
                        ${student.name}
                    </a>
                </td>
                <td>${student.age}</td>
                <td>${student.course}</td>
            </tr>
            `;
        });

        html += `
        </table>
        <p><a href="/">Home</a></p>
        `;

        res.send(html);
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

            const student = results[0];

            res.send(`
                <h1>${student.name}</h1>
                <p>Age: ${student.age}</p>
                <p>Course: ${student.course}</p>
                <p><a href="/students">Back</a></p>
            `);
        }
    );
});

app.get("/programmes/json", (req, res) => {
    connection.query("SELECT * FROM programmes", (err, results) => {
        if (err) {
            res.send("Database error");
            return;
        }
        res.json(results);
    });
});

app.get("/programmes", (req, res) => {
    connection.query("SELECT * FROM programmes", (err, results) => {

        if (err) {
            res.send("Database error");
            return;
        }

        let html = `
        <h1>Programmes</h1>
        <table border="1" cellpadding="8">
        <tr>
            <th>ID</th>
            <th>Name</th>
        </tr>
        `;

        results.forEach((programme) => {
            html += `
            <tr>
                <td>${programme.id}</td>
                <td>${programme.name}</td>
            </tr>
            `;
        });

        html += `
        </table>
        <p><a href="/">Home</a></p>
        `;

        res.send(html);
    });
});

app.get("/modules/json", (req, res) => {
    connection.query("SELECT * FROM modules", (err, results) => {
        if (err) {
            res.send("Database error");
            return;
        }
        res.json(results);
    });
});

app.get("/modules", (req, res) => {

    connection.query("SELECT * FROM modules", (err, results) => {

        if (err) {
            res.send("Database error");
            return;
        }

        let html = `
        <h1>Modules</h1>
        <table border="1" cellpadding="8">
        <tr>
            <th>Code</th>
            <th>Name</th>
        </tr>
        `;

        results.forEach((module) => {
            html += `
            <tr>
                <td>${module.code}</td>
                <td>${module.name}</td>
            </tr>
            `;
        });

        html += `
        </table>
        <p><a href="/">Home</a></p>
        `;

        res.send(html);
    });
});

app.listen(port, () => {
    console.log("Server running on http://localhost:3000");
});