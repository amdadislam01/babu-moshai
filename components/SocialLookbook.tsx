'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, ShoppingBag } from 'lucide-react';

const galleryImages = [
    {
        id: 1,
        url: 'https://i.pinimg.com/736x/18/9f/93/189f932ea48a092c8654700ba95bb0b1.jpg',
        span: 'md:col-span-2 md:row-span-2',
        title: 'New Arrivals 2026'
    },
    {
        id: 2,
        url: 'https://img.drz.lazcdn.com/static/bd/p/759baa2c3a43575943b605575ac8f910.jpg_720x720q80.jpg',
        span: 'col-span-1 row-span-1',
        title: 'Boys Casual Collection'
    },
    {
        id: 3,
        url: 'https://www.rajeshkidswear.com/VendorAssets/1031/StoreImages/extralarge/14926790WINE.jpg',
        span: 'col-span-1 row-span-1',
        title: 'Girls Party Wear'
    },
    {
        id: 4,
        url: 'https://www.shutterstock.com/image-photo/teen-boy-trying-on-black-600nw-2667676577.jpg',
        span: 'md:col-span-2 md:row-span-1',
        title: 'Trendy Boys Fashion'
    }
];

export default function SocialLookbook() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">
                            <Instagram className="w-4 h-4" />
                            <span>#BabuMoshaiStyle</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter">
                            Our Little <span className="text-primary italic">Community</span>
                        </h2>
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-zinc-500 max-w-sm font-medium"
                    >
                        Join thousands of parents sharing their Babu Moshai moments. Tag us to get featured!
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative group overflow-hidden rounded-[2rem] ${image.span}`}
                        >
                            <Image
                                src={image.url}
                                alt={image.title}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            
                            {/* Hover  */}
                            <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                <Link 
                                    href="/shop" 
                                    className="bg-white text-zinc-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary hover:text-white"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Shop Look</span>
                                </Link>
                            </div>
                            
                            
                            <div className="absolute bottom-4 left-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                <p className="text-white font-bold text-sm tracking-widest uppercase">
                                    {image.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        className="inline-flex items-center gap-3 text-zinc-900 font-black text-lg hover:text-primary transition-colors group"
                    >
                        <span>Follow us @babumoshai_bd</span>
                        <div className="w-10 h-10 rounded-full border-2 border-orange-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

// Arrow helper (Jodi upore import na thake)
function ArrowRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}