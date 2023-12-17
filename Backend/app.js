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


<<<<<<< HEAD
app.use(login); // app.use() is use to mount middleware , login is middleware. it executes one by one
app.use(signup);
app.use(taskForm);
app.use(tasks);
app.use(updateTask);
app.use(deleteTask);
=======
  // ------------------------------------------Delete-functionality--------------------------------------

    // Delete user
    app.get('/deleteTask/:id', async function(req, res) { 

      const id = req.params.id;

      try {
        let deletedtask = await Task.findOneAndDelete({_id: id});
        res.status(204).json(deletedtask); // No content on successful deletion
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
    });


//---------------------------edit-sections--------------------------------------------------------

app.put('/updateTask/:id', async (req, res) => {
  try {
    const id  = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }, // Use req.body to update fields based on the incoming JSON data
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

>>>>>>> 98bf541 (Work)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
