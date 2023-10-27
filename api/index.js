const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const { connection } = require("./postgresql");
const User = require("./models/User");
const List = require("./models/List");
const Task = require("./models/Task");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

connection();

// registering user
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      id: uuidv4(),
      name,
      email,
      password,
    });

    res.json(newUser);
  } catch (e) {
    res.status(422).json(e);
  }
});

// login user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ where: { email: email } });

  if (userData) {
    if (userData.password !== password) {
      console.log(userData);
      res.status(422).json("Error in login");
    } else {
      // Here, you can set a cookie with the user data for the next 10 days
      const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds

      res.cookie("user", JSON.stringify(userData), {
        maxAge: tenDaysInMilliseconds,
        httpOnly: false,
      });

      res.json("Login successful");
    }
  } else {
    res.json("User not found");
  }
});

// check profile
app.get("/api/profile", async (req, res) => {
  if (req.cookies) {
    const userData = JSON.parse(req.cookies?.user);
    console.log(userData);
    res.json(userData);
  } else {
    res.json(null);
  }
});

// get all list of the user
app.get("/api/getLists/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allLists = await List.findAll({ where: { userId: id } });

    res.json(allLists);
  } catch (e) {
    res.status(422).json(e);
  }
});

// add list to user
app.post("/api/addList", async (req, res) => {
  const { userId, name } = req.body;

  try {
    const newList = await List.create({
      id: uuidv4(),
      name,
      userId,
    });

    res.json(newList);
  } catch (e) {
    res.status(422).json(e);
  }
});

// get task of a list
app.get("/api/getTasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const allTasks = await Task.findAll({ where: { listId: id } });

    res.json(allTasks);
  } catch (e) {
    res.status(422).json(e);
  }
});

// add task to a list
app.post("/api/addTask", async (req, res) => {
  const { listId, desc } = req.body;

  try {
    const newTask = await Task.create({
      id: uuidv4(),
      desc,
      listId,
    });

    res.json(newTask);
  } catch (e) {
    res.status(422).json(e);
  }
});

// delete a task
app.delete("/api/deleteTask/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Task.destroy({ where: { id: id } });

    if (response) {
      res.json("Task deleted successfully");
    } else {
      res.status(404).json("Task not found");
    }
  } catch (e) {
    res.status(500).json("Server error");
  }
});

// update listId of task
app.put("/api/updateParentList", async (req, res) => {
  const { listId, taskId } = req.body;

  try {
    const response = await Task.update(
      { listId: listId },
      {
        where: {
          id: taskId,
        },
      }
    );
    res.json(response);
  } catch (e) {
    res.status(500).json("Server error");
  }
});

app.listen(8000, () => {
  console.log("Listening to port 8000");
});
