import {Pool} from 'pg';

export default new Pool({
    user:"postgres",
    password:"trakinvest",
    database:"invest",
    host : "localhost",
    port:5432
});
