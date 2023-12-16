// ------------------------------------------Task-Database--------------------------------------
const express = require('express'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
app.use(express.json());
app.use(cors()); // allow to diffent logins to use resources
const login = require("./routes/login")
const signup = require("./routes/signup");
const taskForm = require("./routes/taskForm");
const tasks = require("./routes/tasks");
const updateTask = require("./routes/updateTask");
const deleteTask = require("./routes/deleteTask");

mongoose.connect('mongodb://localhost:27017/Users', {useUnifiedTopology: true} );


app.use(login); // app.use() is use to mount middleware , login is middleware. it executes one by one
app.use(signup);
app.use(taskForm);
app.use(tasks);
app.use(updateTask);
app.use(deleteTask);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
