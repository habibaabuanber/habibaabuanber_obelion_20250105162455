const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { firstName, familyName, email, phoneNumber, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({
      firstName,
      familyName,
      email,
      phoneNumber,
      password
    });

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await User.validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a token (mock implementation)
    const token = 'mockToken'; // Replace with actual token generation logic

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Implement password reset logic (e.g., send email)
    // This is a mock implementation
    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, familyName, phoneNumber } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.firstName = firstName;
    user.familyName = familyName;
    user.phoneNumber = phoneNumber;
    await user.save();

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
