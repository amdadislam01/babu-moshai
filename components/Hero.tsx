'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';

interface Slide {
    id: number;
    image: string;
    tag: string;
    title: string;
    subtitle: string;
    cta: string;
    link: string;
}

const slides: Slide[] = [
    {
        id: 1,
        image: 'https://i.ibb.co.com/zVYPCvCp/banner-1.png',
        tag: 'New Collection',
        title: 'Modern Masculine Elegance',
        subtitle: 'Experience the pinnacle of premium tailoring and traditional finesse.',
        cta: 'Shop Collection',
        link: '/shop',
    },
    {
        id: 2,
        image: 'https://i.ibb.co.com/QvbW6Xrc/banner-2.png',
        tag: 'Casual Trend',
        title: 'The Art of Casual Style',
        subtitle: 'Refined comfort meet contemporary design in our new seasonal arrivals.',
        cta: 'View Casuals',
        link: '/shop?category=casual',
    },
    {
        id: 3,
        image: 'https://i.ibb.co.com/jnxfVcf/banner-3.png',
        tag: 'Festive 2026',
        title: 'Festive Grandeur Redefined',
        subtitle: 'Celebrate your special moments with outfits that command attention.',
        cta: 'Explore Festive',
        link: '/shop?category=festive',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setProgress(0);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setProgress(0);
    };

    
    useEffect(() => {
        const intervalTime = 50; 
        const duration = 5000; 
        
        autoPlayRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + (intervalTime / duration) * 100;
            });
        }, intervalTime);

        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [nextSlide, currentSlide]);

    return (
        <section className="relative h-[85vh] md:h-screen w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0"
                >
                    <motion.div 
                        initial={{ scale: 1.2, filter: 'blur(10px)' }}
                        animate={{ scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative h-full w-full"
                    >
                        <Image
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            fill
                            className="object-cover object-center scale-105"
                            priority
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    </motion.div>

                    <div className="absolute inset-0 z-20 flex items-center">
                        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                            <div className="max-w-3xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="w-12 h-[1px] bg-primary"></span>
                                        <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs md:text-sm">
                                            {slides[currentSlide].tag}
                                        </span>
                                    </div>

                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1] tracking-tighter">
                                        {slides[currentSlide].title.split(' ').map((word, i) => (
                                            <span key={i} className="inline-block overflow-hidden mr-3">
                                                <motion.span
                                                    initial={{ y: "100%" }}
                                                    animate={{ y: 0 }}
                                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "circOut" }}
                                                    className={`inline-block ${i % 2 !== 0 ? 'text-primary italic' : ''}`}
                                                >
                                                    {word}
                                                </motion.span>
                                            </span>
                                        ))}
                                    </h1>

                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="text-lg md:text-xl text-zinc-300 mb-12 max-w-lg leading-relaxed font-light"
                                    >
                                        {slides[currentSlide].subtitle}
                                    </motion.p>

                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.4 }}
                                        className="flex flex-wrap gap-5"
                                    >
                                        <Link
                                            href={slides[currentSlide].link}
                                            className="btn-primary flex items-center gap-3 px-12 py-5 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all shadow-2xl shadow-primary/40 group"
                                        >
                                            {slides[currentSlide].cta}
                                            <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        </Link>
                                        
                                        <button className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2 group">
                                            Lookbook
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-8">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => { setCurrentSlide(index); setProgress(0); }}
                        className="relative h-12 w-1 group flex items-center justify-center"
                    >
                        <div className="absolute h-full w-[2px] bg-white/20 rounded-full overflow-hidden">
                            {index === currentSlide && (
                                <motion.div 
                                    className="w-full bg-primary origin-top"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${progress}%` }}
                                />
                            )}
                        </div>
                        <span className={`absolute right-6 text-[10px] font-black transition-all ${index === currentSlide ? 'text-primary opacity-100 translate-x-0' : 'text-white opacity-0 translate-x-4 group-hover:opacity-50'}`}>
                            0{index + 1}
                        </span>
                    </button>
                ))}
            </div>

            <div className="absolute bottom-10 left-6 lg:left-12 z-30 flex items-center gap-6">
                <div className="flex gap-2">
                    <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all active:scale-90">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all active:scale-90">
                        <ChevronRight size={20} />
                    </button>
                </div>
                
                <div className="md:hidden h-[2px] w-32 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-primary"
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="absolute top-1/2 right-20 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
        </section>
    );
}