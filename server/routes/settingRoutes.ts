import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Setting } from '../models/Setting';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
router.get('/', asyncHandler(async (req: Request, res: Response) => {
    let settings = await Setting.findOne();

    // If no settings exist, create default
    if (!settings) {
        settings = await Setting.create({});
    }

    res.json(settings);
}));

// @desc    Update site settings
// @route   POST /api/settings
// @access  Private/Admin
router.post('/', protect, admin, asyncHandler(async (req: Request, res: Response) => {
    let settings = await Setting.findOne();

    if (settings) {
        // Update existing settings
        settings.siteName = req.body.siteName || settings.siteName;
        settings.siteEmail = req.body.siteEmail || settings.siteEmail;
        settings.sitePhone = req.body.sitePhone || settings.sitePhone;
        settings.siteAddress = req.body.siteAddress || settings.siteAddress;
        settings.socialLinks = req.body.socialLinks || settings.socialLinks;
        settings.shippingFee = req.body.shippingFee !== undefined ? req.body.shippingFee : settings.shippingFee;
        settings.taxRate = req.body.taxRate !== undefined ? req.body.taxRate : settings.taxRate;

        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } else {
        // Create new settings
        const newSettings = new Setting(req.body);
        const createdSettings = await newSettings.save();
        res.status(201).json(createdSettings);
    }
}));

export default router;
