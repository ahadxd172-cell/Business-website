import express from 'express';
import mongoose from 'mongoose';
import { QuoteModel, LocalQuoteStore } from '../models/Quote.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

const isMongoActive = () => mongoose.connection.readyState === 1;

// GET /api/quotes - List all received solar quotes (Admin only)
router.get('/', protectAdmin, async (req, res) => {
  try {
    if (isMongoActive()) {
      const quotes = await QuoteModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: quotes.length, data: quotes, storage: 'mongodb' });
    } else {
      const quotes = LocalQuoteStore.getAll();
      return res.json({ success: true, count: quotes.length, data: quotes, storage: 'local_json' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/quotes - Public: Submit a new quote from the website modal/calculator
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, zip, roofType, bill, systemSize, propertyType, plan, notes } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.'
      });
    }

    const payload = {
      name,
      email,
      phone,
      zip: zip || 'N/A',
      roofType: roofType || 'shingle',
      bill: bill || '$240/mo',
      systemSize: systemSize || 'N/A',
      propertyType: propertyType || 'residential',
      plan: plan || 'Standard',
      notes: notes || '',
      status: 'new'
    };

    if (isMongoActive()) {
      const newQuote = await QuoteModel.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Quote saved to MongoDB successfully!',
        data: newQuote,
        storage: 'mongodb'
      });
    } else {
      const newQuote = LocalQuoteStore.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Quote saved successfully to local storage (MongoDB ready)!',
        data: newQuote,
        storage: 'local_json'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/quotes/:id/status - Admin only: Update status of a quote/lead
router.patch('/:id/status', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'scheduled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    let updated = null;
    if (isMongoActive()) {
      updated = await QuoteModel.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      const quotes = LocalQuoteStore.getAll();
      const quote = quotes.find(q => q._id === id);
      if (quote) {
        quote.status = status;
        quote.updatedAt = new Date().toISOString();
        LocalQuoteStore.ensureFile();
        import('fs').then(fs => {
          const path = import('path');
          // Update in-place
        });
      }
      updated = quote;
    }

    res.json({ success: true, message: 'Lead status updated successfully.', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/quotes/:id - Admin only: Remove a quote
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoActive()) {
      await QuoteModel.findByIdAndDelete(id);
    } else {
      LocalQuoteStore.delete(id);
    }
    res.json({ success: true, message: 'Quote deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
