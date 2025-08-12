const express = require('express');
const router = express.Router();

// In-memory user storage for demonstration purposes
const users = [];

// User Sign Up Route
router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (users.find(user => user.email === email)) {
        return res.status(409).json({ message: 'User already exists.' });
    }
    users.push({ email, password });
    res.status(201).json({ message: 'User registered successfully.' });
});

// User Sign In Route
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }
    res.status(200).json({ message: 'Sign in successful.' });
});

module.exports = router;