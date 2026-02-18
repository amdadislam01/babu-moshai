'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RefreshCw, Star, Heart, Award } from 'lucide-react';

const features = [
    {
        icon: <Truck className="w-8 h-8" />,
        title: "Free Shipping",
        description: "Enjoy free home delivery across the country on orders over ৳2000.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Secure Payment",
        description: "Your payment security is our top priority with multi-layer encryption.",
    },
    {
        icon: <RefreshCw className="w-8 h-8" />,
        title: "Easy Returns",
        description: "Not satisfied? Return your product within 7 days with our hassle-free policy.",
    },
    {
        icon: <Star className="w-8 h-8" />,
        title: "Premium Quality",
        description: "Crafted with the finest fabrics and meticulous stitching for ultimate comfort.",
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Customer Support",
        description: "Our dedicated team is here to assist you 24/7 for a seamless shopping experience.",
    },
    {
        icon: <Award className="w-8 h-8" />,
        title: "Exclusive Design",
        description: "Every piece is uniquely designed to keep your little ones ahead in fashion.",
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")` }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                    >
                        Our Values
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black mb-6 leading-tight"
                    >
                        Why <span className="gradient-text italic">Choose Us?</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-foreground/60 text-lg font-medium"
                    >
                        We don&apos;t just sell clothes; we build trust through quality craftsmanship 
                        and exceptional service for your lifestyle.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="card-premium p-8 group bg-primary/10 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-inner">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-foreground/60 leading-relaxed group-hover:text-foreground/80 transition-colors">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Trust Badge */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 glass p-8 rounded-[2.5rem] flex flex-wrap justify-around items-center gap-8 border-primary/10"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-primary">10k+</span>
                        <span className="text-sm font-bold uppercase tracking-tighter text-foreground/70">Happy <br/> Customers</span>
                    </div>
                    <div className="w-px h-12 bg-primary/20 hidden md:block" />
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-primary">100%</span>
                        <span className="text-sm font-bold uppercase tracking-tighter text-foreground/70">Original <br/> Products</span>
                    </div>
                    <div className="w-px h-12 bg-primary/20 hidden md:block" />
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-primary">24/7</span>
                        <span className="text-sm font-bold uppercase tracking-tighter text-foreground/70">Dedicated <br/> Support</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}