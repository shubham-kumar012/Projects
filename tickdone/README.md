# ✅ TickDone – A Simple To-Do App

TickDone is a minimal yet powerful to-do list app where you can add tasks, mark them as complete, edit them, or remove them when you’re done or even try the app instantly as a guest -- all securely stored in the cloud.

It’s built using **Node.js**, **Express**, **MongoDB (Atlas)**, **EJS**, **Bootstrap**, and **Passport.js** for authentication and follows **RESTful principles**.

--- 
# 🔴Live Demo
- 🔗 [View Live Project](https://tickdone-a0it.onrender.com/)

---

# Features

- Register and log in securely
- Try the app instantly without signup using guest login
- Add new tasks
- Edit existing tasks
- Mark tasks as complete / incomplete
- Delete tasks
- Stores tasks in a cloud database (MongoDB Atlas)
- Persistent Login (Sessions + Passport.js)

---

# Tech Stack

- **Frontend**: EJS templating + Bootstrap
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (via Mongoose)
- **Auth**: Passport.js (Local Strategy), express-session
- **Other**: Method Override (for PUT, PATCH, DELETE in forms)
---

# How to run locally

1. Clone this repository:
```bash
git clone https://github.com/shubham-kumar012/Projects.git
cd Projects/tickdone
```
2. Install dependencies
```bash
npm install 
```
3. Setup enviroment variable
- create a file `.env` inside the `tickdone` directory

- Fill the following inside `.env` file:
```bash
PORT=3000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todoapp?retryWrites=true&w=majority
```
- **Note:** Don't forget to replace your MongoDB Atlas **username** and **password**.

4. Start the Server
```bash
node index.js
``` 
or if you have **nodemon** installed:
```bash
npx nodemon index.js
```

# Routes
Method | Route | Purpose
-----  | ------ | -----
GET    | / | Redirect to login or tasks page
GET    | /register | Show user registration page
POST   | /register | Register a new user
GET    | /login | Show user login page
POST   | /login | Authenticate user
POST   | /guest-login | Instant guest session
GET    | /tasks | Show all routes
GET    | /tasks/add | Show form to add a task
POST   | /tasks/add | Save a new task
GET    | /tasks/:id/edit | Show edit form
PUT    | /tasks/:id/edit | Update a task
DELETE | /tasks/:id | Delete a task
PATCH  | /tasks/:id/complete | Toggle complete
ALL    | * | Redirect invalid route to `/`
--- 

## Author🙋‍♂️
**Name:**  Shubham Kumar

**Email:** shubhampal7083@gmail.com

**Github:** [shubham-kumar012](https://github.com/shubham-kumar012)

**LinkedIn:** [Shubham Kumar](https://linkedin.com/in/shubham-kumar-111041267)

