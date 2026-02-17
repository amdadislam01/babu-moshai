'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Plus } from 'lucide-react';

const outfits = [
    { 
        id: 1, 
        name: 'Little Prince Suit', 
        price: 4500, 
        image: 'https://bd-live-21.slatic.net/kf/S2375d931fb1b4170a1114204eb71a4cfd.jpg', 
        rating: 4.8, 
        trend: 'Premium' 
    },
    { 
        id: 2, 
        name: 'Cool Kid Denim Set', 
        price: 3200, 
        image: 'https://img.drz.lazcdn.com/static/bd/p/e7dff55807f06aa0bec79bd60c5e747f.jpg_720x720q80.jpg', 
        rating: 4.6, 
        trend: 'Bestseller' 
    },
    { 
        id: 3, 
        name: 'Sweet Floral Party Wear', 
        price: 3800, 
        image: 'https://amrshop.com.bd/public/uploads/all/m6DBGfLw52sV0lH9sjcR4cvRtCfDnSrkG2ooUhKH.jpg', 
        rating: 4.9, 
        trend: 'New Arrival' 
    },
];

export default function RecommendedOutfits() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
    
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-50/50 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-left"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter mb-4">
                            Shop The <span className="text-primary italic">Look</span>
                        </h2>
                        <p className="text-zinc-500 text-lg max-w-lg font-medium">
                            Expertly curated outfits to make your little ones stand out in any occasion.
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/shop" className="px-8 py-3 rounded-full border-2 border-orange-100 font-bold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                            View All Styles
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {outfits.map((outfit, index) => (
                        <motion.div
                            key={outfit.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative rounded-[2.5rem] bg-white border border-orange-100/50 p-4 shadow-sm group-hover:shadow-2xl group-hover:shadow-orange-200/40 transition-all duration-500">
                                
                 
                                <div className="relative h-[480px] w-full overflow-hidden rounded-[2rem] mb-6">
                                    <Image
                                        src={outfit.image}
                                        alt={outfit.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                                    />
                                    
                                    {/* Trend Badge */}
                                    <div className="absolute top-5 left-5 z-10">
                                        <span className="bg-white/90 backdrop-blur-md text-zinc-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                            {outfit.trend}
                                        </span>
                                    </div>

                                    {/* Hover  */}
                                    <div className="absolute top-5 right-5 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                        <button className="p-3 bg-white rounded-full shadow-lg text-zinc-900 hover:bg-primary hover:text-white transition-colors">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 bg-white rounded-full shadow-lg text-zinc-900 hover:bg-primary hover:text-white transition-colors">
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>

                               
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Content  */}
                                <div className="px-2 pb-2">
                                    <div className="flex items-center gap-1 mb-3">
                                        <div className="flex text-accent">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-current' : ''}`} />
                                            ))}
                                        </div>
                                        <span className="text-[12px] font-bold text-zinc-400">({outfit.rating})</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
                                        {outfit.name}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Starting Price</p>
                                            <p className="text-3xl font-black text-zinc-900">৳{outfit.price.toLocaleString()}</p>
                                        </div>
                                        
                                        <Link
                                            href={`/shop?outfit=${outfit.id}`}
                                            className="h-14 w-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                                        >
                                            <Plus className="w-6 h-6" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}