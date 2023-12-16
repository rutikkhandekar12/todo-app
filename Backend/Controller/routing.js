// let currentEmail;
// const signup = async (req, res) => {
//   try {
//     const { email, password } = req.body; // distructuring username and password
//     currentEmail = email;
//     // Hash the password before storing it in the database
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     //creating new on object
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });
  
//     //saving in mongoDB collection
//     await newUser.save();
//     //sending response to frontend
//     res.status(200).json({ message: 'Signup successful!' });
//   } catch (error) {
//     console.log(error);
//   }
  
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     currentEmail = email;
//     // Find the user by username
//     const user = await user.findOne({ email });
    
//     // Check if the user exists and the password is correct
//     if (user && await bcrypt.compare(password, user.password)) {
//       res.status(200).json({ message: 'Login successful!'});
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.log(error);
//   }
   
// };

// const taskform = async (req, res) => {
//   const {task, desc, time, dayOfMonth, priority, stage} = req.body;
//   const email = currentEmail;
//   // creating new task object
//   const newTask = new task({ 
//     email,
//     task,
//     description: desc,
//     time,
//     date: dayOfMonth, 
//     priority,
//     stage
//   });

//   // saving in MongoDB collection
//   await newTask.save();

//   // sending response to frontend 
//   res.status(200).json({ message: `Task added successfully!`});
// };

// const tasks = async (req, res) => {
//   try {
//     const email  = currentEmail;
//     const tasks = await tasks.find({email}); // Fetch tasks for the specific user
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: 'Email issue Server Error' });
//   }
// };

// const deleteTask = async function(req, res) { 

//   const id = req.params.id;

//   try {
//     let deletedtask = await tasks.findOneAndDelete({_id: id});
//     res.status(204).json(deletedtask); // No content on successful deletion
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }

// }

// const updateTask = async (req, res) => {
//   try {
//     const id  = req.params.id;
//     const updatedTask = await tasks.findByIdAndUpdate(
//       { _id: id },
//       { $set: req.body }, // Use req.body to update fields based on the incoming JSON data
//       { new: true } // Return the updated document
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     res.json(updatedTask);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



// module.exports = {signup, login, tasks, taskform, deleteTask, updateTask};