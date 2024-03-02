// Route was created to pair with ClockIn and ClockOut functioning on FE.
// Is unused becuase the group decided against using the feature, as
// the time needed for implenation exceeded time constraint of assignment.

const express = require('express')
const router = express.Router()

// POST route for clock-in
router.post('/clock-in', async (req, res) => {
    try {
        // Perform clock-in logic here
        // Save clock-in timestamp in the database
        res.status(200).json({ message: 'Clock in successful' })
    } 
    catch (error) {
        console.error('Clock in error:', error)
        res.status(500).json({ message: 'Clock in failed' })
    }
})

// POST route for clock-out
router.post('/clock-out', async (req, res) => {
    try {
        // Perform clock-out logic here
        // Calculate time worked and save in the database
        res.status(200).json({ message: 'Clock out successful' })
    } 
    catch (error) {
        console.error('Clock out error:', error);
        res.status(500).json({ message: 'Clock out failed' })
    }
})

module.exports = router