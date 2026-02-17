'use client';

import { motion } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ProductFilterProps {
    filters: any;
    setFilters: (filters: any) => void;
}

export default function ProductFilter({ filters, setFilters }: ProductFilterProps) {
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        size: true,
        fabric: true,
        occasion: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const categories = ['Apparel', 'Footwear', 'Accessories'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const fabrics = ['Cotton', 'Linen', 'Silk', 'Wool'];
    const occasions = ['Casual', 'Formal', 'Festive', 'Party'];

    return (
        <div className="card-premium p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-primary">Filters</h3>
            </div>

            {/* Category */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('category')}
                    className="flex items-center justify-between w-full mb-3 font-semibold text-gray-800 hover:text-primary transition-colors"
                >
                    <span>Category</span>
                    {expandedSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <motion.div
                    initial={false}
                    animate={{ height: expandedSections.category ? 'auto' : 0 }}
                    className="overflow-hidden"
                >
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={filters.category === cat}
                                    onChange={() => setFilters({ ...filters, category: cat })}
                                    className="w-4 h-4 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">{cat}</span>
                            </label>
                        ))}
                        <button
                            onClick={() => setFilters({ ...filters, category: '' })}
                            className="text-sm text-accent hover:text-primary font-medium transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Size */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('size')}
                    className="flex items-center justify-between w-full mb-3 font-semibold text-gray-800 hover:text-primary transition-colors"
                >
                    <span>Size</span>
                    {expandedSections.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <motion.div
                    initial={false}
                    animate={{ height: expandedSections.size ? 'auto' : 0 }}
                    className="overflow-hidden"
                >
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setFilters({ ...filters, size: filters.size === size ? '' : size })}
                                className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${filters.size === size
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Fabric */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('fabric')}
                    className="flex items-center justify-between w-full mb-3 font-semibold text-gray-800 hover:text-primary transition-colors"
                >
                    <span>Fabric</span>
                    {expandedSections.fabric ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <motion.div
                    initial={false}
                    animate={{ height: expandedSections.fabric ? 'auto' : 0 }}
                    className="overflow-hidden"
                >
                    <div className="space-y-2">
                        {fabrics.map((fabric) => (
                            <label key={fabric} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.fabric === fabric}
                                    onChange={() => setFilters({ ...filters, fabric: filters.fabric === fabric ? '' : fabric })}
                                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">{fabric}</span>
                            </label>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Occasion */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('occasion')}
                    className="flex items-center justify-between w-full mb-3 font-semibold text-gray-800 hover:text-primary transition-colors"
                >
                    <span>Occasion</span>
                    {expandedSections.occasion ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <motion.div
                    initial={false}
                    animate={{ height: expandedSections.occasion ? 'auto' : 0 }}
                    className="overflow-hidden"
                >
                    <div className="space-y-2">
                        {occasions.map((occasion) => (
                            <label key={occasion} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.occasion === occasion}
                                    onChange={() => setFilters({ ...filters, occasion: filters.occasion === occasion ? '' : occasion })}
                                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">{occasion}</span>
                            </label>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Reset All */}
            <button
                onClick={() => setFilters({ keyword: '', category: '', size: '', fabric: '', occasion: '' })}
                className="w-full btn-accent py-3 text-sm font-bold"
            >
                Reset All Filters
            </button>
        </div>
    );
}
