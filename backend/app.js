const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
connectDB(); // Connect to MongoDB

const userRoutes = require('./routes/userRoutes'); // Import user routes




app.use("/users", userRoutes); // Use user routes for /users endpoint
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies 
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;