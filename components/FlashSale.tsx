'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Timer, ArrowRight, Sparkles } from 'lucide-react';

export default function FlashSale() {
    return (
        <section className="py-24 bg-zinc-50/50 text-foreground overflow-hidden relative">
            
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left  */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-8 bg-primary/10 w-fit px-4 py-2 rounded-full">
                            <Timer className="w-4 h-4 animate-pulse" />
                            <span>Limited Time Offer</span>
                        </div>
                        
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.1]">
                            Season End <br />
                            <span className="gradient-text italic flex items-center gap-4">
                                Flash Sale <Sparkles className="text-accent w-8 h-8 md:w-12 md:h-12" />
                            </span>
                        </h2>
                        
                        <p className="text-foreground/70 text-lg md:text-xl mb-12 max-w-md font-medium leading-relaxed">
                            Grab your favorites at <span className="text-primary font-bold underline decoration-accent/30 underline-offset-4 text-2xl">up to 40% off</span>. Style your little ones with premium elegance.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link href="/shop" className="btn-primary flex items-center justify-center gap-3 group shadow-2xl shadow-primary/30">
                                Shop The Sale
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/new-arrivals" className="px-8 py-4 rounded-full border-2 border-primary/20 font-bold text-sm uppercase tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center">
                                View Lookbook
                            </Link>
                        </div>
                    </motion.div>

                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        
                        <div className="absolute -inset-4 border-2 border-accent/20 rounded-[3.5rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500" />
                        
                        <div className="relative h-[450px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer">
                            <Image 
                                src="https://t4.ftcdn.net/jpg/04/86/53/23/360_F_486532393_IZOMHnhTFf7d88iDT8YCNAhSq6FRjd5u.jpg"
                                alt="Sale Banner"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="glass p-8 rounded-[2rem] border-white/30 flex justify-between items-center">
                                    <div>
                                        <p className="text-primary font-bold tracking-widest text-xs uppercase mb-1">On Traditional Sets</p>
                                        <p className="text-primary font-black text-4xl">SAVE 40%</p>
                                    </div>
                                    <div className="bg-white text-primary p-4 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg">
                                        <span className="font-black text-xl italic">Hurry!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}