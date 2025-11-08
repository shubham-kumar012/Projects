const express = require("express");
const router = express.Router();
const Task = require("../models/tasks.js");

// --- Index Route (show all task) ---
router.get("/", async (req, res) => {
    const userId = req.user._id;
    let tasks = await Task.find({user: userId});
    res.render("index", { tasks });
})

// --- New Route (Add new task) ---
// Step: 1
router.get("/add", (req, res) => {
    res.render("addTask");
})
// Step: 2
router.post("/add", async (req, res) => {
    const { taskName } = req.body;

    const newTask = new Task({
        taskName: taskName,
        addedTime: new Date(),
        user: req.user._id
    })

    await newTask.save();
    console.log("new task added!");
    res.status(200).json({ message: "Task Added Successfully!" });
})

// --- Edit Route ---
// Step: 1(edit page)
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render("editTask", { task });
})
// Step: 2(edit in DB)
router.put("/:id/edit", async (req, res) => {
    try {
        const { id } = req.params;
        const { taskName } = req.body;

        await Task.findByIdAndUpdate(id, { taskName: taskName });
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// --- Delete Task ---
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/login");
})

// --- Complete Button ---
router.patch("/:id/complete", async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
        return res.status(500).send("task not found!");
    }
    let isComplete = !task.completed;

    await Task.findByIdAndUpdate(id, { completed: isComplete });
    res.redirect("/tasks");
})

module.exports = router;