const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { logger } = require('../utils/logger');
const { validationResult } = require('express-validator');
const { sendVerificationEmail } = require('../services/emailService');

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, dateOfBirth } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
    });

    // Generate verification token
    const verificationToken = generateToken({ id: user.id }, '1d');
    
    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    // Generate JWT
    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification.',
      user: user.toJSON(),
      token,
    });

  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    await user.update({ lastLoginAt: new Date() });

    // Generate JWT
    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      message: 'Login successful',
      user: user.toJSON(),
      token,
    });

  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = async (req, res) => {
  // Client-side token removal
  res.json({ message: 'Logout successful' });
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = verifyToken(token);
    
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ isVerified: true });
    
    res.json({ message: 'Email verified successfully' });

  } catch (error) {
    logger.error('Email verification error:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decoded = verifyToken(refreshToken);
    
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newToken = generateToken({ id: user.id, email: user.email });
    
    res.json({ token: newToken });

  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateToken({ id: user.id }, '1h');
    await sendPasswordResetEmail(user.email, resetToken);
    
    res.json({ message: 'Password reset email sent' });

  } catch (error) {
    logger.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = verifyToken(token);
    
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ password: newPassword });
    
    res.json({ message: 'Password reset successfully' });

  } catch (error) {
    logger.error('Reset password error:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};