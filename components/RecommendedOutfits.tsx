'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';

const outfits = [
    { id: 1, name: 'The Classic Gentleman', price: 15000, image: 'https://placehold.co/500x700/002366/FFD700?text=Gentleman+Set', rating: 4.8, trend: 'Hot' },
    { id: 2, name: 'Urban Nomad', price: 8500, image: 'https://placehold.co/500x700/36454F/FFFFFF?text=Urban+Nomad', rating: 4.6, trend: 'New' },
    { id: 3, name: 'Royal Groom', price: 25000, image: 'https://placehold.co/500x700/D4AF37/002366?text=Royal+Groom', rating: 4.9, trend: 'Trending' },
];

export default function RecommendedOutfits() {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        <span className="gradient-text">Babu-Style Collections</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Complete looks curated by our style experts
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {outfits.map((outfit, index) => (
                        <motion.div
                            key={outfit.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="card-premium overflow-hidden relative">
                                {/* Trend Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                        <TrendingUp className="w-3 h-3" />
                                        {outfit.trend}
                                    </span>
                                </div>

                                <div className="relative h-[500px] w-full overflow-hidden">
                                    <Image
                                        src={outfit.image}
                                        alt={outfit.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="p-6 bg-white">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(outfit.rating)
                                                        ? 'fill-accent text-accent'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-600 ml-1">({outfit.rating})</span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                                        {outfit.name}
                                    </h3>

                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Starting from</p>
                                            <p className="text-2xl font-bold text-gray-900">৳ {outfit.price.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/shop?outfit=${outfit.id}`}
                                        className="block w-full text-center btn-primary py-3 text-sm"
                                    >
                                        Shop the Look
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
