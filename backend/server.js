const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const importData = require('./utils/importData');
const authRoutes = require('./routes/auth');
const collegesRoutes = require('./routes/colleges');

const app = express();
const PORT = 3800;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/CollegePicker-Anay')
    .then(async () => {
        console.log('Database connected successfully.');
        await importData();
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// API Routes
app.use('/auth', authRoutes);
app.use('/colleges', collegesRoutes);

// Root endpoint for testing
app.get('/', (req, res) => {
    res.send('CollegePicker backend is running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));