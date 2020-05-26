const express = require('express');
const User = require('../models/user')

const app = express();


// @route    GET pan/pans
// @desc     Get all pans
// @access   Private
app.get('/data', async (req, res) => {
    try {
        const pans = await User.find().sort({ data: -1 });
        res.json(pans)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
});



module.exports = app;
