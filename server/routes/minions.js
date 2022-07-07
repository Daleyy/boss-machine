const minionsRouter = require('express').Router()

module.exports = minionsRouter

// Import "database" functionality
const { 
    addToDatabase, // Returns new instance
    getAllFromDatabase, // Returns array of model name
    getFromDatabaseById, // Returns the instance with valid id or null for an invalid id.
    updateInstanceInDatabase, // Returns updated instance or null
    deleteFromDatabasebyId, // Returns true if the delete occurs properly and false if the element is not found
  } = require('../db');

minionsArray = getAllFromDatabase('minions')

// Finds minion instance by ID and assigns to req.minion
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.status(404).send();
    }
  });

// Return all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(minionsArray);
})

// Create new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion);
})

// Find minion by ID
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})

// Update minion
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body)
    res.status(201).send(`ID ${updatedMinion.id} successfully updated.`)
})

// Delete minion
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId)
    if (deleteMinion) {
        res.send('Deletion successful')
    }
    res.status(404).send('Cannot find that minion.')
})