const express = require('express');
const User = require('../models/User'); // Ensure this path is correct

const router = express.Router();

// Get All Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a New User
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error); // Log the error
    res.status(400).json({ error: 'Failed to create user', details: error.message });
  }
});

// Update a User
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      user.username = username;
      user.email = email;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error); // Log the error
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a User
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error); // Log the error
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;