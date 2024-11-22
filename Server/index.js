const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

require("./../DB/Connection");

// Routes
const laptopRoutes = require('./../Routes/Laptop');

app.get('/', (req, res) => {
    res.send('Welcome to the Alpha API');
});

// Use Routes
app.use('/laptops', laptopRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


