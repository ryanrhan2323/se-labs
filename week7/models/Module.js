const db = require("./db");

class ModuleItem {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    static async getAll() {
        const rows = await db.query("SELECT * FROM modules");
        return rows.map(row => new ModuleItem(row.code, row.name));
    }
}

module.exports = ModuleItem;