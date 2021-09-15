const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./db')

// Create express server
const app = express()

// Database
dbConnection();

// CORS
app.use(cors())

// Public directory
app.use(express.static('public'))

// Read and parse body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Listen
app.listen(process.env.SERVER_PORT || 8080, () => {
    console.log(`Server is running is ${process.env.SERVER_PORT || 8080}`);
});