const express = require('express');
const app = express();
const csv = require('csvtojson');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const College = require('./college');
const bodyParser = require('body-parser');
app.use(cors());

mongoose.connect('mongodb+srv://myAtlasDBUser:gJjlIxGqpR26avE5@cluster0.7i2ldxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Database has been connected');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.get('/', (req, res) => {
    res.send('Response from server');
});

app.get('/csvData', (req, res) => {
    console.log('Received request for /csvData');
    const csvFilePath = 'engineering colleges in India.csv';
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            College.insertMany(jsonObj)
                .then(() => {
                    console.log('Data inserted successfully');
                    res.status(200).json(jsonObj);
                })
                .catch(err => {
                    console.error('Error inserting data:', err);
                    res.status(500).send('Error inserting data');
                });
        })
        .catch(err => {
            console.error('Error reading CSV file:', err);
            res.status(500).send('Error reading CSV file');
        });
});

app.get('/colleges', async (req, res) => {
    console.log('Received request for /colleges');
    try {
        const colleges = await College.find({}, {
            'College Name': 1,
            'Campus Size': 1,
            'Total Student Enrollments': 1,
            'Total Faculty': 1,
            'Established Year': 1,
            'Rating': 1,
            'University': 1,
            'Courses': 1,
            'Facilities': 1,
            'City': 1,
            'State': 1,
            'Country': 1,
            'College Type': 1,
            'Average Fees': 1,
        });
        console.log('Colleges data:', colleges);
        res.status(200).json(colleges);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});
let users = []; // Temporary storage (use a database in production)

app.use(bodyParser.json());

// Sign Up
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ email, password });
    res.status(201).json({ message: 'User registered successfully' });
});

// Sign In
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Sign in successful' });
});

app.listen(3800, () => console.log('Server running on port 3800'));
