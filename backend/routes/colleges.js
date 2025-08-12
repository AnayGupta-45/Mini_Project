const express = require('express');
const router = express.Router();
const College = require('../models/College');

// Get all colleges
router.get('/', async (req, res) => {
    try {
        const colleges = await College.find({});
        res.status(200).json(colleges);
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).send('Error fetching data.');
    }
});

module.exports = router;