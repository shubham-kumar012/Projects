const express = require("express");
const router = express.Router();
const User = require('../models/user.js');
const Task = require("../models/tasks.js");
const passport = require('passport');
const bcrypt = require('bcrypt');


router.get("/register", (req, res) => {
    res.render("auth/register");
})

router.post("/register", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    try {
        const existing = await User.findOne({ email });
        if(existing) {
            res.status(400).send("User already exists!");
        }
        const newUser = new User({firstName, lastName, email, password});
        await newUser.save();
        console.log("registered user: ", newUser.email);
        res.redirect("/login");
    }catch(err) {
        console.log(err);
        res.status(500).send("error in register!");
    }
})

router.get("/login", (req, res) => {
    res.render("auth/login");
})


const localAuthMiddleware = passport.authenticate('local', { successRedirect: '/tasks', failureRedirect: '/login'});

router.post("/login", localAuthMiddleware);

// Guest Login Route
router.post("/guest-login", async (req, res) => {
    try {
        const guestUser = await User.findOne({ email: "guest@gmail.com"});

        if(!guestUser) {
            const hashed = await bcrypt.hash("guest-password", 10);
            const guestUser = new User({
                firstName: "guest",
                lastName: "user",
                email: "guest@gmail.com",
                password: hashed
            });
            await guestUser.save();
            console.log("Guest User Created!");
        }

        // deleting the guest user previous data
        await Task.deleteMany({user: guestUser._id});

        // Manually req login from passport.js
        req.login(guestUser, (err, done) => {
            if(err) return done(err);
            return res.redirect("/tasks");
        })
    }
    catch(err) {
        console.log("User login error: ", err);
        res.status(500).send("Something went wrong!")
    }

})

module.exports = router;