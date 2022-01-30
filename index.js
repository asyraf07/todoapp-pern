const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const port = 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes //

// Create
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get All
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ORDER BY id");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Get
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE id=$2",
      [description, id]
    );

    res.json("Todo updated");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id=$1", [id]);

    res.json(`Todo with id ${id} was deleted!`);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server has started at http://localhost:${port}/`);
});
