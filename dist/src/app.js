"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const MQService_1 = require("./services/MQService");
const app = express_1.default();
const port = 3000;
app.use(cors_1.default());
app.use(express_1.default.json());
app.post('/msg', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { queueName, payload } = req.body;
    yield MQService_1.publishToQueue(queueName, payload);
    res.statusCode = 200;
    const data = { "message-sent": true };
    res.json(data);
}));
// // Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Customer API",
//       description: "Customer API Information",
//       contact: {
//         name: "Amazing Developer"
//       },
//       servers: ["http://localhost:3000"]
//     }
//   },
//   // ['.routes/*.js']
//   apis: ["app.ts"]
// };
//const swaggerDocs = swaggerJsDoc(swaggerOptions);
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const fs = fs_1.default;
app.post("/employee", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, description } = req.body;
        const newTodo = yield db_1.default.query("INSERT INTO employee (name,email,description) VALUES($1,$2,$3) RETURNING *", [name, email, description]);
        let data = new Date() + JSON.stringify(newTodo.rows[0]) + ' inserted successfully using Post' + '\n';
        fs.appendFileSync('logs.txt', data);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        let data = new Date() + err.message + '\n';
        fs.appendFileSync('logs.txt', data);
        console.error(err.message);
    }
}));
app.get("/employee", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield db_1.default.query("SELECT * FROM employee ORDER BY name");
        res.json(allTodos.rows);
        let data = new Date() + ' GET Request' + '\n';
        fs.appendFileSync('logs.txt', data);
    }
    catch (err) {
        let data = new Date() + err.message + '\n';
        fs.appendFileSync('logs.txt', data);
        console.error(err.message);
    }
}));
app.get("/employee/id/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield db_1.default.query("SELECT * FROM employee WHERE id = $1", [
            id
        ]);
        let data = new Date() + " " + String(id) + 'was fetched!' + '\n';
        fs.appendFileSync('logs.txt', data);
        res.json(todo.rows[0]);
    }
    catch (err) {
        let data = new Date() + err.message + '\n';
        fs.appendFileSync('logs.txt', data);
        console.error(err.message);
    }
}));
app.get("/employee/name/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const todo = yield db_1.default.query("SELECT * FROM employee WHERE name = $1", [
            name
        ]);
        let data = new Date() + " " + String(name) + 'was fetched!' + '\n';
        fs.appendFileSync('logs.txt', data);
        res.json(todo.rows[0]);
    }
    catch (err) {
        let data = new Date() + err.message + '\n';
        fs.appendFileSync('logs.txt', data);
        console.error(err.message);
    }
}));
app.get("/employee/email/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const todo = yield db_1.default.query("SELECT * FROM employee WHERE email = $1", [
            email
        ]);
        let data = new Date() + " " + String(email) + 'was fetched!' + '\n';
        fs.appendFileSync('logs.txt', data);
        res.json(todo.rows[0]);
    }
    catch (err) {
        let data = new Date() + err.message + '\n';
        fs.appendFileSync('logs.txt', data);
        console.error(err.message);
    }
}));
app.get("/employee/description/:description", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description } = req.params;
        const todo = yield db_1.default.query("SELECT * FROM employee WHERE description = $1", [
            description
        ]);
        let data = new Date() + " " + String(description) + 'was fetched!' + '\n';
        fs.appendFileSync('logs.txt', data);
        res.json(todo.rows[0]);
    }
    catch (err) {
        let data = new Date() + err.message + '\n';
        fs.appendFileSync('logs.txt', data);
        console.error(err.message);
    }
}));
//update a todo
app.put("/employee/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = yield db_1.default.query("UPDATE employee SET description = $1 WHERE id = $2", [description, id]);
        let data = new Date() + " " + String(id) + 'was updated with ' + description + '\n';
        fs.appendFileSync('logs.txt', data);
        console.log(id, description);
        res.json(updateTodo);
    }
    catch (err) {
        let data = new Date() + err.message + '\n';
        fs.appendFileSync('logs.txt', data);
        console.error(err.message);
    }
}));
//delete a todo
app.delete("/employee/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTodo = yield db_1.default.query("DELETE FROM employee WHERE id = $1", [
            id
        ]);
        let data = new Date() + " " + String(id) + 'was deleted!' + '\n';
        fs.appendFileSync('logs.txt', data);
        res.json("That id was deleted!");
    }
    catch (err) {
        let data = new Date() + err.message + '\n';
        fs.appendFileSync('logs.txt', data);
        console.log(err.message);
    }
}));
app.listen(port, () => {
    let data = new Date() + 'Server is running on 3000' + '\n';
    fs.appendFileSync('logs.txt', data);
    return console.log('server is running on 3000');
});
//# sourceMappingURL=app.js.map