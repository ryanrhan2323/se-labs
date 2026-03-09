const db = require("./db");

class Student {
    constructor(id, name, age, course) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.course = course;
    }

    static async getAll() {
        const rows = await db.query("SELECT * FROM students");
        return rows.map(row => new Student(row.id, row.name, row.age, row.course));
    }

    static async getById(id) {
        const rows = await db.query("SELECT * FROM students WHERE id = ?", [id]);

        if (rows.length === 0) {
            return null;
        }

        const row = rows[0];
        return new Student(row.id, row.name, row.age, row.course);
    }
}

module.exports = Student;