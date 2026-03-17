const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { username, phoneNumber, password, status } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username or phone number already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      phoneNumber,
      password: hashedPassword,
      status: status || 'active'
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        status: newUser.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};