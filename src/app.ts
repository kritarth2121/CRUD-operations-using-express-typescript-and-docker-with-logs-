import express from 'express';
import {Product} from './product';
import pool from './db';
import cors from 'cors';
import file from 'fs';
import {publishToQueue} from './services/MQService';


//import swaggerjsdoc from 'swagger-jsdoc';
//import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
const app=express()
const port=3000;

app.use(cors());
app.use(express.json());


app.post('/msg',async(req, res)=>{
  let { queueName, payload } = req.body;
  await publishToQueue(queueName, payload);
  res.statusCode = 200;
  const data = {"message-sent":true};
  res.json(data);
});


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











const fs =file;

app.post("/employee", async (req, res) => {
  try {
    const { name,email,description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO employee (name,email,description) VALUES($1,$2,$3) RETURNING *",
      [name,email,description]
    );
    let data=new Date() +  JSON.stringify(newTodo.rows[0]) +' inserted successfully using Post'+   '\n';
fs.appendFileSync('logs.txt',data)
    res.json(newTodo.rows[0]);
  } catch (err) {
    let data=new Date() +  err.message+   '\n';
    fs.appendFileSync('logs.txt',data)
    console.error(err.message);
  }
});

app.get("/employee", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM employee ORDER BY name");
      res.json(allTodos.rows);
      let data=new Date() +  ' GET Request'+   '\n';
  fs.appendFileSync('logs.txt',data)
    } catch (err) {
      let data=new Date() +  err.message+   '\n';
    fs.appendFileSync('logs.txt',data)
      console.error(err.message);
    }
  });


  app.get("/employee/id/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM employee WHERE id = $1", [
        id
      ]);
      let data=new Date() + " "+String(id) + 'was fetched!'+   '\n';
      fs.appendFileSync('logs.txt',data)
  
      res.json(todo.rows[0]);
    } catch (err) {
      let data=new Date() +  err.message+   '\n';
    fs.appendFileSync('logs.txt',data)
      console.error(err.message);
    }
  });
  
  app.get("/employee/name/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const todo = await pool.query("SELECT * FROM employee WHERE name = $1", [
        name
      ]);
      let data=new Date() + " "+String(name) + 'was fetched!'+   '\n';
      fs.appendFileSync('logs.txt',data)
  
      res.json(todo.rows[0]);
    } catch (err) {
      let data=new Date() +  err.message+   '\n';
    fs.appendFileSync('logs.txt',data)
      console.error(err.message);
    }
  });

  app.get("/employee/email/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const todo = await pool.query("SELECT * FROM employee WHERE email = $1", [
        email
      ]);
      let data=new Date() + " "+String(email) + 'was fetched!'+   '\n';
      fs.appendFileSync('logs.txt',data)
  
      res.json(todo.rows[0]);
    } catch (err) {
      let data=new Date() +  err.message+   '\n';
    fs.appendFileSync('logs.txt',data)
      console.error(err.message);
    }
  });
  app.get("/employee/description/:description", async (req, res) => {
    try {
      const { description } = req.params;
      const todo = await pool.query("SELECT * FROM employee WHERE description = $1", [
        description
      ]);
      let data=new Date() + " "+String(description) + 'was fetched!'+   '\n';
      fs.appendFileSync('logs.txt',data)
  
      res.json(todo.rows[0]);
    } catch (err) {
      let data=new Date() +  err.message+   '\n';
    fs.appendFileSync('logs.txt',data)
      console.error(err.message);
    }
  });
  //update a todo
  
  app.put("/employee/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE employee SET description = $1 WHERE id = $2",
        [description, id]
      );
      let data=new Date() + " " +String(id) + 'was updated with '+description+   '\n';
  fs.appendFileSync('logs.txt',data)
  console.log(id,description);
  
      res.json(updateTodo);
    } catch (err) {
      let data=new Date() +  err.message+   '\n';
    fs.appendFileSync('logs.txt',data)
      console.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/employee/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM employee WHERE id = $1", [
        id
      ]);
      let data=new Date() + " "+ String(id) + 'was deleted!'+   '\n';
  fs.appendFileSync('logs.txt',data)
      res.json("That id was deleted!");
    } catch (err) {
      let data=new Date() +  err.message+   '\n';
    fs.appendFileSync('logs.txt',data)
      console.log(err.message);
    }
  });

app.listen(port,() =>{
  let data=new Date() + 'Server is running on 3000'+   '\n';
  fs.appendFileSync('logs.txt',data)
return console.log( 'server is running on 3000'); 
})