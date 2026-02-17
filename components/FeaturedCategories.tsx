'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
    { id: 1, name: 'Apparel', image: 'https://placehold.co/400x600/002366/FFFFFF?text=Apparel', link: '/shop?category=apparel', desc: 'Premium Fashion' },
    { id: 2, name: 'Footwear', image: 'https://placehold.co/400x600/36454F/FFFFFF?text=Footwear', link: '/shop?category=footwear', desc: 'Elegant Steps' },
    { id: 3, name: 'Accessories', image: 'https://placehold.co/400x600/D4AF37/002366?text=Accessories', link: '/shop?category=accessories', desc: 'Refined Details' },
    { id: 4, name: 'Grooming', image: 'https://placehold.co/400x600/708090/FFFFFF?text=Grooming', link: '/shop?category=grooming', desc: 'Gentleman\'s Care' },
];

export default function FeaturedCategories() {
    return (
        <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        <span className="gradient-text">Featured Collections</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Curated selections for the modern gentleman
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl shadow-xl"
                        >
                            <Link href={category.link} className="block">
                                <div className="relative h-[450px] w-full overflow-hidden">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                                        <p className="text-accent text-sm font-medium mb-1 tracking-wider uppercase">
                                            {category.desc}
                                        </p>
                                        <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center text-white group-hover:text-accent transition-colors duration-300">
                                            <span className="text-sm font-medium mr-2">Explore</span>
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
