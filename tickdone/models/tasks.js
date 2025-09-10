// db schema is defined here

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    addedTime: {
        type: Date,
        required: true
    }
});

let Task = new mongoose.model("Task", taskSchema);

module.exports = Task;

