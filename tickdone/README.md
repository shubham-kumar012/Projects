# ✅ TickDone – A Simple To-Do App

TickDone is a minimal yet powerful to-do list app where you can add tasks, mark them as complete, edit them, or remove them when you’re done.

It’s built using **Node.js**, **Express**, **MongoDB (Atlas)**, **EJS**, and **Bootstrap**, and follows **RESTful principles**.

--- 
# 🔴Live Demo
- 🔗 [View Live Project](https://tickdone-a0it.onrender.com/)

---

# Features

- Add new tasks
- Edit existing tasks
- Mark tasks as complete / incomplete
- Delete tasks
- Stores tasks in a cloud database (MongoDB Atlas)

---

# Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: EJS templating + Bootstrap
- **Database**: MongoDB Atlas (via Mongoose)
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
GET    | /tasks | show all routes
GET    | /tasks/add | show form to add a task
POST   | /tasks/add | save a new task
GET    | /tasks/:id/edit | show edit form
PUT    | /tasks/:id/edit | update a task
DELETE | /tasks/:id | delete a task
PATCH  | /tasks/:id/complete | toggle complete

--- 

## Author🙋‍♂️
**Name:**  Shubham Kumar

**Email:** shubhampal7083@gmail.com

**Github:** [shubham-kumar012](https://github.com/shubham-kumar012)

**LinkedIn:** [Shubham Kumar](https://linkedin.com/in/shubham-kumar-111041267)

