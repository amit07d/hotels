const express = require('express');
const router = express.Router();
const Person = require('./../models/Person'); // Import the Person model

// POST method to create a person
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

// GET method to fetch all persons
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log(`Data fetched successfully`);
    res.status(200).json(data); // Respond with fetched data
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' }); // Generic error response
  }
});

// GET method to fetch persons by work type (chef, waiter, manager)
router.get('/:worktype', async (req, res) => {
  try {
    const idealWork = req.params.worktype;
    console.log(`Requested work type: ${idealWork}`); // Log work type request
    
    if (['chef', 'waiter', 'manager'].includes(idealWork)) {
      const response = await Person.find({ work: idealWork }); // Use 'Person' model
      console.log(`Response fetched for work type: ${idealWork}`);
      res.status(200).json(response); // Respond with fetched data
    } else {
      res.status(404).json({ error: 'Invalid work type' }); // Invalid work type error
    }
  } catch (error) {
    console.error('Error fetching persons by work type:', error);
    res.status(500).json({ error: 'Internal server error' }); // Generic error response
  }
});

// // Delateing the person details using PUT method

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId)

    if (!response) {
      return res.status(404).json({ error: 'Person not found' })
    }
    console.log('Person deleted succesfully');
    return res.status(200).json({ message: 'Person deleted successfully', deletePerson: response })
    
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
    
  }
});

// Updateing the person details using PUT method
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePerson = req.body;

    if (!updatePerson || Object.keys(updatePerson).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' })
    }

    const response = await Person.findByIdAndUpdate(personId, updatePerson, {
      new: true, // return the updated document
      runValidators: true, // run mongoose validation
    })
    if (!response) {
      return res.status(404).json({ error: 'Person not found' })
    }
    console.log('Person updated successfully');
    res.status(200).json(response)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
