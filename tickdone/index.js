const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const Task = require("./models/tasks.js");
const methodOverride = require("method-override");
const dotenv = require("dotenv");

dotenv.config({path: path.join(__dirname, ".env") });

// setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public", "css")));
app.use(express.static(path.join(__dirname, "public", "js")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));

// const mongoDB_URL = "mongodb://127.0.0.1:27017/todoapp";
const dbUrl = process.env.MONGODB_URL;

// Setup mongo server
main()
    .then((res) => {
        console.log("connection successful!");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(dbUrl);
}


// --- Index Route (show all task) ---
app.get("/", (req, res) => {
    res.redirect("/tasks");
});

app.get("/tasks", async (req, res) => {
    let tasks = await Task.find();
    res.render("index", {tasks});
});

// --- New Route (Add new task) ---
// Step: 1
app.get("/tasks/add", (req, res) => {
    res.render("addTask");
})
// Step: 2
app.post("/tasks/add", (req, res) => {
    let {taskName} = req.body;

    let newTask = new Task({
        taskName: taskName,
        addedTime: new Date()
    })

    newTask
        .save()
        .then((res) => {
            console.log("new task added!");
        })
        .catch((err) => {
            console.log(err);
        })

    res.status(200).json({message : "Task Added Successfully!"});
})

// --- Edit Route ---
// Step: 1 (edit page)
app.get("/tasks/:id/edit", async (req, res) => {
    let {id} = req.params;
    let task = await Task.findById(id);
    res.render("editTask.ejs", {task});
})
// Step: 2 (edit in DB)
app.put("/tasks/:id/edit", async (req, res) => {
    try {
        let {id} = req.params;
        let {taskName} = req.body;
        
        await Task.findByIdAndUpdate(id, {taskName: taskName});
    
        res.redirect("/tasks");
    } catch(err) {
        res.status(500).send(err.message);
    }
})

// --- Destroy Route ---
app.delete("/tasks/:id", async (req, res) => {
    let {id} = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/tasks");
})

// --- Complete Button ---
app.patch("/tasks/:id/complete", async (req, res) => {
    try {
        let {id} = req.params;
        const task = await Task.findById(id);
        if(!task) res.status(404).send("Task not found!");

        let isComplete = !task.completed;
    
        await Task.findByIdAndUpdate(id, {completed: isComplete});

        res.redirect("/tasks");
    }catch(err) {
        res.status(500).send(err.message);
    }
})


const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`server are listening to port ${port}`);
});

