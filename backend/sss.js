const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require ('cors')

const app = express();
const port = 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeedataform', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(bodyParser.json());

// Define the MongoDB schema and model
const employeeSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  email: String,
  gender: String,
  city: String,
  state: String,
  address: String,
  designation: String,
});

const Employee = mongoose.model('Employee', employeeSchema);




app.post('/submit-form', async (req, res) => {
  try {
    console.log('Received form data:', req.body);

    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});
