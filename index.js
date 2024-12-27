var express = require("express");
const app = express();
// const cors = require("cors");
const mongoose = require("mongoose");
const TodoModel = require("./Models/Todo");

// app.use(cors());
app.use(express.json());


// mongoose.connect("mongodb://127.0.0.1:27017/mydb3");

mongoose.connect("mongodb+srv://nairx:KgHbSM9v0g078Fbi@cluster0.qjxhv.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0/todoapp1")



//////////////////////////
app.use(express.static("client/build"));
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
