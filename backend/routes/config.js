import express from 'express';
import mongoose from 'mongoose';
import { SiteConfigModel, LocalConfigStore, defaultSiteConfig } from '../models/SiteConfig.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

const isMongoActive = () => mongoose.connection.readyState === 1;

// GET /api/config - Public: Get current hero & site configuration for frontend
router.get('/', async (req, res) => {
  try {
    if (isMongoActive()) {
      let config = await SiteConfigModel.findOne();
      if (!config) {
        config = await SiteConfigModel.create(defaultSiteConfig);
      }
      return res.json({ success: true, data: config, source: 'mongodb' });
    } else {
      const config = LocalConfigStore.get();
      return res.json({ success: true, data: config, source: 'local_storage' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/config - Admin only: Update hero image, headline, phone, stats, etc.
router.put('/', protectAdmin, async (req, res) => {
  try {
    const updates = req.body;
    let savedData;

    if (isMongoActive()) {
      let config = await SiteConfigModel.findOne();
      if (!config) {
        config = await SiteConfigModel.create({ ...defaultSiteConfig, ...updates });
      } else {
        Object.assign(config, updates);
        await config.save();
      }
      savedData = config;
    } else {
      savedData = LocalConfigStore.update(updates);
    }

    return res.json({
      success: true,
      message: 'Website configuration updated successfully! Changes are now live on the frontend.',
      data: savedData
    });
  } catch (error) {
    console.error('Config update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
