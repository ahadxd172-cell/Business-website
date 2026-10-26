import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminModel, LocalAdminStore } from '../models/Admin.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

const isMongoActive = () => mongoose.connection.readyState === 1;

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'sunvolt_super_secret_jwt_key_2026_solar_energy_enterprise';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

// POST /api/auth/login - Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    let admin = null;
    let isPasswordCorrect = false;

    if (isMongoActive()) {
      admin = await AdminModel.findOne({ email: cleanEmail });
      if (admin) {
        isPasswordCorrect = await admin.comparePassword(password);
      }
    }

    // Fallback if Mongo has not finished connecting or user was stored locally
    if (!admin) {
      const localAdmin = LocalAdminStore.get();
      if (localAdmin && localAdmin.email === cleanEmail) {
        isPasswordCorrect = await bcrypt.compare(password, localAdmin.password);
        if (isPasswordCorrect) {
          admin = localAdmin;
        }
      }
    }

    if (!admin || !isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Access denied.'
      });
    }

    const token = generateToken({
      id: admin._id || 'admin_id',
      email: admin.email,
      name: admin.name || 'Sunvolt Super Admin',
      role: admin.role || 'admin'
    });

    return res.json({
      success: true,
      message: 'Login successful! Welcome to Sunvolt Admin Portal.',
      token,
      admin: {
        id: admin._id || 'admin_id',
        email: admin.email,
        name: admin.name || 'Sunvolt Super Admin',
        role: admin.role || 'admin'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me - Verify current admin session
router.get('/me', protectAdmin, async (req, res) => {
  try {
    if (isMongoActive()) {
      const admin = await AdminModel.findById(req.admin.id).select('-password');
      if (admin) {
        return res.json({ success: true, admin });
      }
    }
    return res.json({ success: true, admin: req.admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/auth/update-credentials - Change email, name, or password
router.put('/update-credentials', protectAdmin, async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;

    let adminDoc = null;
    if (isMongoActive()) {
      adminDoc = await AdminModel.findOne({ email: req.admin.email });
    }

    if (adminDoc && newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Please enter your current password to set a new password.'
        });
      }
      const match = await adminDoc.comparePassword(currentPassword);
      if (!match) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect.'
        });
      }
      const salt = await bcrypt.genSalt(10);
      adminDoc.password = await bcrypt.hash(newPassword, salt);
    }

    if (adminDoc) {
      if (name) adminDoc.name = name;
      if (email) adminDoc.email = email.toLowerCase().trim();
      await adminDoc.save();
    }

    // Also update local fallback store
    const localAdmin = LocalAdminStore.get() || {};
    if (name) localAdmin.name = name;
    if (email) localAdmin.email = email.toLowerCase().trim();
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      localAdmin.password = await bcrypt.hash(newPassword, salt);
    }
    LocalAdminStore.save(localAdmin);

    res.json({
      success: true,
      message: 'Admin credentials updated successfully!',
      admin: {
        email: email || req.admin.email,
        name: name || req.admin.name
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
