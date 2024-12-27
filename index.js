var express = require("express");
const app = express();
// const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const TodoModel = require("./Models/Todo");

// app.use(cors());
app.use(express.json());

const DBUSER = process.env.DBUSER
const PASS = process.env.PASS

mongoose.connect(`mongodb+srv://${DBUSER}:${PASS}@cluster0.qjxhv.mongodb.net/todoapp1?retryWrites=true&w=majority&appName=Cluster0`)

//////////////////////////
// app.use(express.static("client/build"));
app.use(express.static(__dirname + '/client/build'));
/////////////////////////

app.put("/:id", function (req, res) {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: !req.body.done })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/:id", function (req, res) {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/get/", function (req, res) {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/", function (req, res) {
  console.log("Get Request");
  res.sendFile(__dirname + "/client/build/" + "index.html");
});

app.post("/",  (req, res) => {
  console.log("Post Request");
  console.log(req.body);
   TodoModel.create({
    task: req.body.task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

let server = app.listen(8080, function () {
  console.log("Server Running");
});
