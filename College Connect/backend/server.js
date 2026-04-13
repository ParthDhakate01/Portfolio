import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 3000;
import cors from "cors";
import bodyParser from "body-parser";
import { Todo } from "./models/Todo.js";
import { Event } from "./models/Event.js";
let conn = await mongoose.connect("mongodb://localhost:27017/EventManager");

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});
app.put("/update/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });
    await Todo.updateOne(
      { id: req.params.id },
      { $set: { IsCompleted: !todo.IsCompleted } },
    );
    res.send("Todo updated");
  } catch (err) {
    console.log(err);
  }
});
app.post("/add", async (req, res) => {
  try {
    await Todo.insertOne(req.body);
    res.send("Todo added");
  } catch (err) {
    console.log(err);
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ id: req.params.id });
    res.send("Todo deleted");
  } catch (err) {
    console.log(err);
  }
});

app.post("/addEvent", async (req, res) => {
  try {
    await Event.insertOne(req.body);
    // console.log(req.body);
    res.json(req.body);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/deleteEvent/:id", async (req, res) => {
  try {
    await Event.deleteOne({ id: req.body });
    // console.log(res.body);
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
