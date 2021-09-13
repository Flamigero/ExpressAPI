const express = require('express');
require('dotenv').config();
const cors = require('cors');

// Create express server
const app = express()

// CORS
app.use(cors())

// Public directory
app.use(express.static('public'))

// Read and parse body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.PORT}`);
});