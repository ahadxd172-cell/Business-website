import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'quotes.json');

// Mongoose Schema for MongoDB
const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    zip: { type: String, required: true },
    roofType: { type: String, default: 'shingle' },
    bill: { type: String, default: '$240/mo' },
    systemSize: { type: String },
    propertyType: { type: String, default: 'residential' },
    plan: { type: String },
    notes: { type: String },
    status: { type: String, enum: ['new', 'contacted', 'scheduled', 'completed'], default: 'new' }
  },
  { timestamps: true }
);

export const QuoteModel = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);

// Fallback Helper when MongoDB is not connected yet
export const LocalQuoteStore = {
  ensureFile() {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  },
  getAll() {
    this.ensureFile();
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data || '[]');
    } catch {
      return [];
    }
  },
  create(quoteData) {
    this.ensureFile();
    const quotes = this.getAll();
    const newQuote = {
      _id: 'local_' + Date.now(),
      ...quoteData,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    quotes.unshift(newQuote);
    fs.writeFileSync(DATA_FILE, JSON.stringify(quotes, null, 2), 'utf8');
    return newQuote;
  },
  delete(id) {
    this.ensureFile();
    const quotes = this.getAll().filter(q => q._id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(quotes, null, 2), 'utf8');
    return true;
  }
};
