const db = require('../config/firebase');

// Controller for creating a user
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const userRef = await db.collection('users').add(userData);
    res.status(201).json({ id: userRef.id, ...userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for fetching all users
const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for fetching a user by ID
const getUserById = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.params.id);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a user
const updateUser = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.params.id);
    await userRef.update(req.body);
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for deleting a user
const deleteUser = async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.params.id);
    await userRef.delete();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
