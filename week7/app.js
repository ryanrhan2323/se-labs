const express = require("express");
const Student = require("./models/Student");
const Programme = require("./models/Programme");
const ModuleItem = require("./models/Module");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/students", async (req, res) => {
    try {
        const students = await Student.getAll();
        res.render("students", { students });
    } catch (err) {
        console.log(err);
        res.send("Database error");
    }
});

app.get("/student/:id", async (req, res) => {
    try {
        const student = await Student.getById(req.params.id);

        if (!student) {
            res.send("Student not found");
            return;
        }

        res.render("student", { student });
    } catch (err) {
        console.log(err);
        res.send("Database error");
    }
});

app.get("/programmes", async (req, res) => {
    try {
        const programmes = await Programme.getAll();
        res.render("programmes", { programmes });
    } catch (err) {
        console.log(err);
        res.send("Database error");
    }
});

app.get("/modules", async (req, res) => {
    try {
        const modules = await ModuleItem.getAll();
        res.render("modules", { modules });
    } catch (err) {
        console.log(err);
        res.send("Database error");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});