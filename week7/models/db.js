const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2km677wk12D.",
    database: "university"
});

async function query(sql, params = []) {
    const [rows] = await pool.execute(sql, params);
    return rows;
}

module.exports = { query };
