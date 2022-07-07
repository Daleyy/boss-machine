const ideasRouter = require('express').Router()
module.exports = ideasRouter

const { 
    addToDatabase, // Returns new instance
    getAllFromDatabase, // Returns array of model name
    getFromDatabaseById, // Returns the instance with valid id or null for an invalid id.
    updateInstanceInDatabase, // Returns updated instance or null
    deleteFromDatabasebyId, // Returns true if the delete occurs properly and false if the element is not found
  } = require('../db');

// Finds idea instance by ID and assigns to req.idea
ideasRouter.param('ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId)
    if(idea){
        req.idea = idea;
        next();
    } else {
        res.status(404).send()
    }
})

// Return all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
})

// Create new idea
ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea);
})

// Find idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea)
})

// Update idea
ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body)
    res.send(updatedIdea)
})

// Delete idea
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleteIdea = deleteFromDatabasebyId('ideas', req.params.ideaId)
    if (deleteIdea){
        res.status(204).send()
    }
})