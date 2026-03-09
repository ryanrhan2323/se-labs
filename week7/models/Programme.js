const db = require("./db");

class Programme {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAll() {
        const rows = await db.query("SELECT * FROM programmes");
        return rows.map(row => new Programme(row.id, row.name));
    }
}

module.exports = Programme;