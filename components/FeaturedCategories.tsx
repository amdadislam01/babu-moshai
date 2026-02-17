'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const categories = [
    { id: 1, name: 'Apparel', image: 'https://blucheez.fashion/cdn/shop/articles/Tangail_outlet_815206fd-7144-4edc-b0e0-b8bc08d2f175.webp?v=1745856156&width=1000', link: '/shop?category=apparel', desc: 'Premium Fashion' },
    { id: 2, name: 'Footwear', image: 'https://www.elegantsteps.com/cdn/shop/files/ES_Footwear_480x480@2x.png?v=1757182062', link: '/shop?category=footwear', desc: 'Elegant Steps' },
    { id: 3, name: 'Accessories', image: 'https://hauteliving.com/wp-content/uploads/2017/11/23511336_10155317172513068_1451237521110962452_o.jpg', link: '/shop?category=accessories', desc: 'Refined Details' },
    { id: 4, name: 'Grooming', image: 'https://greengentco.co.uk/cdn/shop/files/BergamotandMandarinBeardCareSet-IA-Pic1.jpg?v=1766223613&width=416', link: '/shop?category=grooming', desc: "Gentleman's Care" },
];

export default function FeaturedCategories() {
    return (
        <section className="py-24 bg-zinc-50/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl"
                    >
                        <div className="flex items-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>Categories</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter">
                            Featured <span className="text-primary italic">Collections</span>
                        </h2>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/shop" className="group flex items-center gap-3 text-zinc-900 font-bold hover:text-primary transition-colors">
                            <span className="border-b-2 border-primary pb-1">Browse All Categories</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.7, ease: "circOut" }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <Link href={category.link} className="block relative h-[500px] w-full overflow-hidden rounded-[2.5rem] bg-zinc-100">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                               
                                <div className="absolute top-6 left-6">
                                    <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                                        {category.desc}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <div className="relative overflow-hidden">
                                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {category.name}
                                        </h3>
                                        
    
                                        <div className="w-12 h-1 bg-primary group-hover:w-full transition-all duration-500 rounded-full" />
                                        
                                        <div className="mt-6 flex items-center gap-2 text-white/0 group-hover:text-white/100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            <span className="text-xs font-bold uppercase tracking-widest">Shop Now</span>
                                            <ArrowRight className="w-4 h-4" />
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