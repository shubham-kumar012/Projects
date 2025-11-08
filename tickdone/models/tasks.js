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
    },
    // link the task with the user
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference the User model
        required: true,
    }
});

let Task = new mongoose.model("Task", taskSchema);

module.exports = Task;

