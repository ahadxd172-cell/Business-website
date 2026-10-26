import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_FILE = path.join(__dirname, '..', 'data', 'config.json');

export const defaultSiteConfig = {
  announcement: "☀️ 2026 Solar Incentive: Claim up to 30% Federal Clean Energy Rebates on residential & commercial installations.",
  announcementLink: "Check Eligibility →",
  heroTitle: "Smart Solar Solutions for",
  heroTitleItalic: "Homes & Businesses",
  heroDescription: "Sunvolt delivers solar installation and energy solutions for homes and businesses. Easy setup, lasting results.",
  heroImage: "https://images.unsplash.com/photo-1508873696983-2df570464756?auto=format&fit=crop&w=2000&q=85",
  rating: "5.0",
  reviewsCount: "100+ Reviews",
  phone: "(800) 555-VOLT",
  email: "hello@sunvolt-energy.com",
  address: "1200 Solar Way, Suite 400, Austin, TX 78701",
  statYears: "15+",
  statInstalls: "12,500+",
  statCleanEnergy: "500M+ kWh",
  ctaHeadline: "Ready to Power Your Home With Clean Solar Energy?",
  ctaSubhead: "Join over 12,500 property owners saving up to $1,800/yr on electric utility bills."
};

const siteConfigSchema = new mongoose.Schema(
  {
    announcement: { type: String, default: defaultSiteConfig.announcement },
    announcementLink: { type: String, default: defaultSiteConfig.announcementLink },
    heroTitle: { type: String, default: defaultSiteConfig.heroTitle },
    heroTitleItalic: { type: String, default: defaultSiteConfig.heroTitleItalic },
    heroDescription: { type: String, default: defaultSiteConfig.heroDescription },
    heroImage: { type: String, default: defaultSiteConfig.heroImage },
    rating: { type: String, default: defaultSiteConfig.rating },
    reviewsCount: { type: String, default: defaultSiteConfig.reviewsCount },
    phone: { type: String, default: defaultSiteConfig.phone },
    email: { type: String, default: defaultSiteConfig.email },
    address: { type: String, default: defaultSiteConfig.address },
    statYears: { type: String, default: defaultSiteConfig.statYears },
    statInstalls: { type: String, default: defaultSiteConfig.statInstalls },
    statCleanEnergy: { type: String, default: defaultSiteConfig.statCleanEnergy },
    ctaHeadline: { type: String, default: defaultSiteConfig.ctaHeadline },
    ctaSubhead: { type: String, default: defaultSiteConfig.ctaSubhead }
  },
  { timestamps: true }
);

export const SiteConfigModel = mongoose.models.SiteConfig || mongoose.model('SiteConfig', siteConfigSchema);

export const LocalConfigStore = {
  ensureFile() {
    const dir = path.dirname(CONFIG_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(CONFIG_FILE)) {
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultSiteConfig, null, 2), 'utf8');
    }
  },
  get() {
    this.ensureFile();
    try {
      const data = fs.readFileSync(CONFIG_FILE, 'utf8');
      return { ...defaultSiteConfig, ...JSON.parse(data || '{}') };
    } catch {
      return defaultSiteConfig;
    }
  },
  update(newConfig) {
    this.ensureFile();
    const current = this.get();
    const updated = { ...current, ...newConfig, updatedAt: new Date().toISOString() };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  }
};
