'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: 'https://static.vecteezy.com/system/resources/thumbnails/065/954/625/small/kids-fashion-sale-banner-featuring-a-smiling-boy-in-trendy-sunglasses-and-stylish-outfit-perfect-for-promoting-affordable-children-s-clothing-photo.jpeg',
        title: 'Defining Masculine Elegance',
        subtitle: 'Discover our premium collection of suits and traditional wear.',
        cta: 'Shop Now',
        link: '/shop',
    },
    {
        id: 2,
        image: 'https://img.freepik.com/premium-photo/fashion-set-young-boy_641503-261406.jpg?semt=ais_hybrid&w=740&q=80',
        title: 'Refined Casuals',
        subtitle: 'Upgrade your everyday style with our curated casuals.',
        cta: 'View Collection',
        link: '/shop?category=casual',
    },
    {
        id: 3,
        image: 'https://img.freepik.com/premium-photo/discover-unique-kids-fashion-styles-with-cheerful-winter-wear-perfect-upcoming-season-sale_447653-45323.jpg?semt=ais_hybrid&w=740&q=80',
        title: 'Festive Grandeur',
        subtitle: 'Shine bright this season with our exclusive festive range.',
        cta: 'Explore',
        link: '/shop?category=festive',
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-cover"
                        priority={true}
                    />
                    {/* Warm gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-600/40 to-transparent" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            className="max-w-5xl"
                        >
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-5xl md:text-7xl lg:text-9xl font-bold font-serif mb-8 leading-tight drop-shadow-lg"
                            >
                                <span className="bg-gradient-to-r from-white via-orange-50 to-yellow-100 bg-clip-text text-transparent">
                                    {slides[currentSlide].title}
                                </span>
                            </motion.h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100px" }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="h-1 bg-yellow-400 mx-auto mb-8 shadow-lg"
                            />

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-3xl mx-auto font-light tracking-wide text-gray-200 drop-shadow-lg"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <Link
                                    href={slides[currentSlide].link}
                                    className="btn-accent px-12 py-4 text-lg font-bold inline-flex items-center gap-2 group relative overflow-hidden"
                                >
                                    <span>{slides[currentSlide].cta}</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-all duration-300 group z-10"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-all duration-300 group z-10"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center space-x-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                            ? 'bg-accent w-12 h-3'
                            : 'bg-white/40 w-3 h-3 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
