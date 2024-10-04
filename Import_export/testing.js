


//  this file is not required ... go to personRoutes & menuitemsRoutes.. its same 


const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


// POST method for person
router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const response = new Person(data);
    const savedPerson = await response.save(); 
    console.log('Data saved successfully');
    res.status(201).json(savedPerson); // Respond with status 201 (Created) and the saved person
  } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' }); // Generic error response
  }
});




//  this file is not required ... go to personRoutes & menuitemsRoutes.. its same 

// GET method for fetching all persons
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET method for fetching person by worktype (chef, waiter, manager)
router.get('/:worktype', async (req, res) => {
  try {
    const idealWork = req.params.worktype;
    if (idealWork === 'chef' || idealWork === 'waiter' || idealWork === 'manager') {
      const response = await Person.find({ work: idealWork });
      console.log('Response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    console.error('Error fetching person by worktype:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;




//testing .js

