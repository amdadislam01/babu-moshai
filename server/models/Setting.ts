import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    siteName: { type: String, required: true, default: 'Babu-Moshai' },
    siteEmail: { type: String, required: true, default: 'contact@babumoshai.com' },
    sitePhone: { type: String, required: true, default: '+880123456789' },
    siteAddress: { type: String, required: true, default: 'Dhaka, Bangladesh' },
    socialLinks: {
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
        instagram: { type: String, default: '' },
        linkedin: { type: String, default: '' },
    },
    shippingFee: { type: Number, required: true, default: 60 },
    taxRate: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export const Setting = mongoose.model('Setting', settingSchema);
