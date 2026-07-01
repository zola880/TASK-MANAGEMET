const crypto = require('crypto');
const User = require('../models/User');
const Team = require('../models/Team');
const generateToken = require('../utils/generateToken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    let role = 'member';
    let teamId = null;

    // If a secret key is provided, try to join that team
    if (secretKey) {
      const team = await Team.findOne({ secretKey });
      if (!team) {
        return res.status(400).json({ message: 'Invalid team secret key' });
      }
      teamId = team._id;
      role = 'member';
    } else {
      // No secret key → create a new team and become admin
      const newTeam = await Team.create({
        name: `${name}'s Team`,
        admin: null,  // will be set after user creation
        secretKey: crypto.randomBytes(4).toString('hex').toUpperCase(),  // e.g. "A3F2C1B0"
        members: []
      });
      teamId = newTeam._id;
      role = 'admin';
    }

    const user = await User.create({ name, email, password, role, team: teamId });

    // If user is admin, update the team with the admin ID
    if (role === 'admin') {
      await Team.findByIdAndUpdate(teamId, {
        admin: user._id,
        $push: { members: user._id }
      });
    } else {
      // Add member to the team
      await Team.findByIdAndUpdate(teamId, {
        $push: { members: user._id }
      });
    }

    const populatedUser = await User.findById(user._id).populate('team', 'name');

    res.status(201).json({
      _id: populatedUser._id,
      name: populatedUser.name,
      email: populatedUser.email,
      role: populatedUser.role,
      team: populatedUser.team,
      token: generateToken(populatedUser._id, populatedUser.role)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('team', 'name');
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};