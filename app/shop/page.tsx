'use client';

import { useState } from 'react';
import ProductFilter from '@/components/ProductFilter';
import ProductGrid from '@/components/ProductGrid';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function ShopPage() {
    const [filters, setFilters] = useState({
        keyword: '',
        category: '',
        size: '',
        fabric: '',
        occasion: '',
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">
                        <span className="gradient-text">Discover Excellence</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent" />
                        Premium collection curated for the discerning gentleman
                        <Sparkles className="w-5 h-5 text-accent" />
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full lg:w-64 flex-shrink-0"
                    >
                        <ProductFilter filters={filters} setFilters={setFilters} />
                    </motion.aside>

                    {/* Product Grid */}
                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex-1"
                    >
                        <ProductGrid filters={filters} />
                    </motion.main>
                </div>
            </div>
        </div>
    );
}
