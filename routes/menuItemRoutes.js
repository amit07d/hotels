const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/MenuItem');

// POST method for creating a menu item
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);  // Added new keyword here
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);  // Changed err to error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET method to fetch all menu items
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);  // Changed err to error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET method to fetch taste by taste type (sweet, spicy, sour)
router.get('/:tasteType', async (req, res) => {
  try {
    const idealTaste = req.params.tasteType;
    console.log(`Requested taste type: ${idealTaste}`); // Log taste type request
    
    // Check if the requested taste is valid
    if (['sweet', 'spicy', 'sour'].includes(idealTaste)) {
      const response = await MenuItem.find({ taste: idealTaste }); // Use 'MenuItem' model
      console.log(`Response fetched for taste type: ${idealTaste}`);
      res.status(200).json(response); // Respond with fetched data
    } else {
      res.status(404).json({ error: 'Invalid taste type' }); // Invalid taste type error
    }
  } catch (error) {
    console.error('Error fetching items by taste type:', error);
    res.status(500).json({ error: 'Internal server error' }); // Generic error response
  }
});

// delete menuitem

router.delete('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuItemId);

    if (!response) {
      return res.status(404).json({ error: 'MenuItem not found' });
    }

    console.log('MenuItem deleted successfully');
    return res.status(200).json({ message: 'MenuItem deleted successfully', deletedMenuItem: response });

  } catch (error) {
    console.error('Error deleting MenuItem:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// Updateing the MenuItem details using PUT method
router.put('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updateMenuItem = req.body;

    // Check if the request body is empty
    if (!updateMenuItem || Object.keys(updateMenuItem).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    // Update the menu item using the ID
    const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuItem, {
      new: true, // Return the updated document
      runValidators: true, // Ensure mongoose validation rules are applied
    });

    // If no item was found, return a 404 error
    if (!response) {
      return res.status(404).json({ error: 'MenuItem not found' });
    }
    console.log('MenuItem updated successfully');
    return res.status(200).json(response); // Send back the updated document

  } catch (error) {
    console.error('Error updating MenuItem:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;