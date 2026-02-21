'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import {
    Save,
    Globe,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Truck,
    Percent,
    Loader2
} from 'lucide-react';

interface Settings {
    siteName: string;
    siteEmail: string;
    sitePhone: string;
    siteAddress: string;
    socialLinks: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
    };
    shippingFee: number;
    taxRate: number;
}

export default function AdminSettings() {
    const [settings, setSettings] = useState<Settings>({
        siteName: '',
        siteEmail: '',
        sitePhone: '',
        siteAddress: '',
        socialLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: '',
        },
        shippingFee: 0,
        taxRate: 0,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/settings');
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            await api.post('/settings', settings);
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update settings.' });
            console.error('Error updating settings:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleSocialChange = (platform: keyof Settings['socialLinks'], value: string) => {
        setSettings(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="h-full flex items-center justify-center p-20">
                    <div className="w-12 h-12 border-4 border-zinc-100 border-t-primary rounded-full animate-spin"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="flex flex-col space-y-8 max-w-5xl">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">Settings</h1>
                        <p className="text-zinc-500 font-medium tracking-tight">Configure your online presence and site behavior.</p>
                    </div>
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`px-6 py-3 rounded-2xl text-sm font-bold shadow-xl ${message.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                                }`}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Settings */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                        <div className="flex items-center space-x-3 mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-zinc-900 tracking-tight">General Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Site Name</label>
                                <div className="relative group">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={settings.siteName}
                                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Site Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        value={settings.siteEmail}
                                        onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Contact Phone</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={settings.sitePhone}
                                        onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Business Address</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={settings.siteAddress}
                                        onChange={(e) => setSettings({ ...settings, siteAddress: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Shipping & Tax */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-black text-zinc-900 tracking-tight">Commerce</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Shipping Fee (৳)</label>
                                    <div className="relative group">
                                        <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="number"
                                            value={settings.shippingFee}
                                            onChange={(e) => setSettings({ ...settings, shippingFee: Number(e.target.value) })}
                                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Tax Rate (%)</label>
                                    <div className="relative group">
                                        <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="number"
                                            value={settings.taxRate}
                                            onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Instagram className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-black text-zinc-900 tracking-tight">Social Networks</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Facebook</label>
                                        <div className="relative group">
                                            <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                value={settings.socialLinks.facebook}
                                                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                                                placeholder="https://..."
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Twitter</label>
                                        <div className="relative group">
                                            <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                value={settings.socialLinks.twitter}
                                                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                                                placeholder="https://..."
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">Instagram</label>
                                        <div className="relative group">
                                            <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                value={settings.socialLinks.instagram}
                                                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                                                placeholder="https://..."
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">LinkedIn</label>
                                        <div className="relative group">
                                            <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                value={settings.socialLinks.linkedin}
                                                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                                                placeholder="https://..."
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end p-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center space-x-3 px-10 py-5 bg-zinc-900 text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-zinc-900/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {saving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Save className="w-5 h-5" />
                            )}
                            <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
