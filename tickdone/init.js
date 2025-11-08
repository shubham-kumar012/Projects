// This file only initialize the database and put some demon data in the database

const mongoose = require("mongoose");
// const Task = require("./models/tasks.js");
const User = require("./models/user.js");
require('dotenv').config();

const dbUrl = process.env.MONGODB_URL;

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


// let allTasks = [
//     {taskName: "Running", addedTime: new Date()}, 
//     {taskName: "Eating", addedTime: new Date()}, 
//     {taskName: "Study", addedTime: new Date()}
// ];

// Task.insertMany(allTasks).then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// })

let userData = {
    username: "testuser",
    email: "test@gmail.com",
    password: "12345"
}

User.insertOne(userData).then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log("error is here: "+err);
})

