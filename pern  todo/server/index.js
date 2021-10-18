const express  = require('express');
const cors = require('cors');
const pool = require("./db");
//initializing express function into the variable
const app = express();

//middleware

app.use(cors());
app.use(express.json());

//routes//


//create todo


app.post("/todos",async(req,res)=>{
    try {
        const { discription } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[discription]);
        res.json(newTodo.rows);
    } catch (error) {
        console.error(error.message);
    }
})


//get all todo
app.get("/todos",async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//get a todo

app.get("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const singleTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(singleTodo.rows[0])
        // if i write res.json(singleTodo.rows) it returns an array 
    } catch (error) {
        console.log(error.message);
    }
})

//update a todo

app.put("/todos/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {discription} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[discription, id]);
        res.json('todo updated');
    } catch (error) {
        console.log(error.message);        
    }
})


// delete a todo


app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json('todo deleted');
    } catch (error) {
        console.log(error.message);
    }
})


// creating the server
const port = 5000;
app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
});