const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const Task = require("./models/tasks.js");
const methodOverride = require("method-override");
const bcrypt = require('bcrypt');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");

// Setup .env file
const dotenv = require("dotenv");
dotenv.config({path: path.join(__dirname, ".env") });

// routes
const taskRoutes = require("./routes/tasks.js");
const authRoutes = require("./routes/auth.js");

// Views Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
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


// Session Setup
app.use(session({
    secret: "loyalPetDog",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 600000}
}))


// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Authentication logic here
passport.use(new LocalStrategy({usernameField: "email"}, async (email, password, done) => {
    try {
        const user = await User.findOne({email: email});
        
        if(!user) {
            return done(null, false, {message: "Invalid Credentials!"});
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch) {
            return done(null, user);
        } else {
            console.log("password doesn't match")
            return done(null, false, {message: "Incorrect Password!"});
        }
        
    }catch(err) {
        return done(err);
    }
}))


passport.serializeUser((user, done) => {
    if(user) {
        return done(null, user.id);
    }
    return done(null, false);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if(user) {
        return done(null, user);
    }
    return done(null, false);
})


// Authentication middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    return res.redirect('/login');
}

app.use("/", authRoutes);
app.use("/tasks",isLoggedIn, taskRoutes);


// Index route
app.get("/", (req, res) => {
    if(req.isAuthenticated()) {
        res.redirect("/tasks");
    } else {
        res.redirect("/login");
    }
});

// handle unknows routes
app.use((req, res) => {
    if(req.isAuthenticated && req.isAuthenticated()) {
        return res.redirect('/tasks');
    }

    res.redirect('/login');
})


const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`server are listening to port ${port}`);
});

