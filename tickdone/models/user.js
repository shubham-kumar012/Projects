const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    const person = this;
    if(person.isModified("password")) {
        person.password = await bcrypt.hash(person.password, 10);
    }
    next();
})

let User = new mongoose.model("User", userSchema);

module.exports = User;