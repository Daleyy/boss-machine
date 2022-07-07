const meetingsRouter = require('express').Router()
module.exports = meetingsRouter

const {
    getAllFromDatabase, // Returns array of model name
    addToDatabase, // Returns new instance
    deleteAllFromDatabase, // Deletes all elements from the specified model
    createMeeting // Generated automatically by the server upon request
} = require('../db');

// Get all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})

// Create new meeting and add it to all meetings
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting()
    addToDatabase('meetings', newMeeting)
    res.status(201).send(newMeeting)
})

// Remove all meetings
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings')
    res.status(204).send()
})