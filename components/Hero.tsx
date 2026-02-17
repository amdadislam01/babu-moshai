'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: 'https://www.countryboylifestyle.com/UserPanel/userPanel/Uploads/1765869568293_Slider_large_MIL.jpg',
        title: 'Modern Masculine Elegance',
        subtitle: 'Experience the pinnacle of premium tailoring and traditional finesse.',
        cta: 'Shop Collection',
        link: '/shop',
        accent: 'from-orange-500 to-red-600'
    },
    {
        id: 2,
        image: 'https://www.countryboylifestyle.com/UserPanel/userPanel/Uploads/639024563453807665mensShopping_large_MIL.jpg',
        title: 'The Art of Casual Style',
        subtitle: 'Refined comfort meet contemporary design in our new seasonal arrivals.',
        cta: 'View Casuals',
        link: '/shop?category=casual',
        accent: 'from-blue-500 to-indigo-600'
    },
    {
        id: 3,
        image: 'https://www.countryboylifestyle.com/UserPanel/userPanel/Uploads/1765869641741_Slider_large_MIL.jpg',
        title: 'Festive Grandeur 2024',
        subtitle: 'Celebrate your special moments with outfits that command attention.',
        cta: 'Explore Festive',
        link: '/shop?category=festive',
        accent: 'from-yellow-400 to-orange-600'
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (!isHovered) {
            const timer = setInterval(nextSlide, 5000);
            return () => clearInterval(timer);
        }
    }, [nextSlide, isHovered]);

    return (
        <section 
            className="relative h-[80vh] md:h-[92vh] w-full overflow-hidden bg-zinc-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Parallax Background Image */}
                    <motion.div 
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="relative h-full w-full"
                    >
                        <Image
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            fill
                            className="object-cover object-center lg:object-[center_30%]"
                            priority
                            quality={100}
                        />
                    </motion.div>

                    {/* Sophisticated Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-start">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="max-w-2xl"
                        >
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="inline-block py-1 px-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6"
                            >
                                New Season Arrival
                            </motion.span>
                            
                            <motion.h1 
                                className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tighter"
                            >
                                {slides[currentSlide].title.split(' ').map((word, i) => (
                                    <span key={i} className={i === 1 ? "text-primary italic" : ""}>{word} </span>
                                ))}
                            </motion.h1>

                            <motion.p 
                                className="text-lg md:text-xl text-zinc-300 mb-10 max-w-lg font-medium leading-relaxed"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>

                            <motion.div className="flex flex-wrap gap-4">
                                <Link
                                    href={slides[currentSlide].link}
                                    className="group relative px-10 py-5 bg-primary text-white font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/25"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center gap-2">
                                        {slides[currentSlide].cta}
                                        <ShoppingBag className="w-5 h-5" />
                                    </span>
                                </Link>

                                <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                                    Learn More
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Premium Controls */}
            <div className="absolute bottom-10 right-6 lg:right-12 flex items-center gap-4 z-20">
                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-xl hover:bg-white/10 text-white transition-all active:scale-90"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="h-6 w-[1px] bg-white/20" />
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-xl hover:bg-white/10 text-white transition-all active:scale-90"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-10 left-6 lg:left-12 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className="group relative h-1.5 transition-all duration-500"
                        style={{ width: index === currentSlide ? '60px' : '30px' }}
                    >
                        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                            index === currentSlide ? 'bg-primary' : 'bg-white/30 group-hover:bg-white/50'
                        }`} />
                    </button>
                ))}
            </div>

            {/* Side Branding */}
            <div className="hidden lg:block absolute left-12 top-1/2 -rotate-90 origin-left -translate-y-1/2">
                <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-white/30">
                    Est. 2024 • Premium Gentleman Wear
                </p>
            </div>
        </section>
    );
}