import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ADMIN_FILE = path.join(__dirname, '..', 'data', 'admin.json');

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'Sunvolt Super Admin'
    },
    role: {
      type: String,
      default: 'admin'
    }
  },
  { timestamps: true }
);

// Method to verify password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const AdminModel = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

// Local JSON fallback store
export const LocalAdminStore = {
  ensureFile() {
    const dir = path.dirname(ADMIN_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  },
  get() {
    this.ensureFile();
    if (!fs.existsSync(ADMIN_FILE)) return null;
    try {
      return JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf8'));
    } catch {
      return null;
    }
  },
  save(adminData) {
    this.ensureFile();
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(adminData, null, 2), 'utf8');
  }
};

// Seed default Admin if it doesn't exist
export const seedAdmin = async () => {
  const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@sunvolt.com').toLowerCase().trim();
  const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@Sunvolt2026!';

  try {
    // 1. Try seeding into MongoDB if active
    if (mongoose.connection.readyState === 1) {
      const existing = await AdminModel.findOne({ email: defaultEmail });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);
        await AdminModel.create({
          email: defaultEmail,
          password: hashedPassword,
          name: 'Sunvolt Super Admin',
          role: 'admin'
        });
        console.log(`🔐 Default Admin seeded in MongoDB: ${defaultEmail}`);
      }
    }

    // 2. Also ensure local fallback has hashed credentials
    let localAdmin = LocalAdminStore.get();
    if (!localAdmin || localAdmin.email !== defaultEmail) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);
      LocalAdminStore.save({
        email: defaultEmail,
        password: hashedPassword,
        name: 'Sunvolt Super Admin',
        role: 'admin'
      });
    }
  } catch (error) {
    console.warn(`Admin seed notice: ${error.message}`);
  }
};
