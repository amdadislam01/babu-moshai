'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, TrendingUp, Star } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    images: string[];
    price: number;
    category: string;
    isFeatured?: boolean;
}

export default function ProductGrid({ filters }: { filters: any }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (filters.keyword) params.append('keyword', filters.keyword);
                if (filters.category) params.append('category', filters.category);
                if (filters.size) params.append('size', filters.size);
                if (filters.fabric) params.append('fabric', filters.fabric);
                if (filters.occasion) params.append('occasion', filters.occasion);

                const { data } = await api.get(`/products?${params.toString()}`);
                setProducts(data.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [filters]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="card-premium animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-t-lg"></div>
                        <div className="p-6 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
            >
                <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No products found</p>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="group"
                >
                    <Link href={`/product/${product._id}`}>
                        <div className="card-premium overflow-hidden relative h-full flex flex-col group-hover:border-accent/30 transition-colors">
                            {product.isFeatured && (
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg backdrop-blur-md bg-opacity-90">
                                        <TrendingUp className="w-3 h-3" />
                                        Featured
                                    </span>
                                </div>
                            )}

                            <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/400x600?text=No+Image'}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                {/* Quick Action Button overlay */}
                                <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <button className="w-full bg-white/95 backdrop-blur-sm text-primary py-3 rounded-lg font-semibold shadow-lg hover:bg-primary hover:text-white transition-all">
                                        Quick View
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 bg-white flex flex-col flex-grow">
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < 4 ? 'fill-accent text-accent' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1 font-medium">(4.0)</span>
                                </div>

                                <h3 className="text-lg font-bold mb-1 text-primary group-hover:text-accent transition-colors line-clamp-1 font-serif">
                                    {product.name}
                                </h3>

                                <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">{product.category}</p>

                                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                                    <p className="text-xl font-bold text-primary">
                                        ৳ {product.price?.toLocaleString()}
                                    </p>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                                        <ShoppingBag className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
