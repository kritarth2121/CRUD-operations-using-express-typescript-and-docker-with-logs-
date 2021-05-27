"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    user: "postgres",
    password: "trakinvest",
    database: "invest",
    host: "localhost",
    port: 5432
});
//# sourceMappingURL=db.js.map