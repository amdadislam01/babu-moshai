'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, Menu, X, Search, Home, Grid, LogIn, Sparkles, Tag } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/shop', label: 'Shop', icon: ShoppingBag },
        { href: '/new-arrivals', label: 'New Arrivals', icon: Sparkles }, 
        { href: '/offers', label: 'Offers', icon: Tag },               
        { href: '/categories', label: 'Categories', icon: Grid },
    ];

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-500 ${
                // Ekhane black bg shoriye glass effect default kora hoyeche
                scrolled
                ? 'glass border-b border-orange-200/50 py-3 shadow-md'
                : 'bg-white/80 backdrop-blur-md border-b border-orange-100/30 py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative w-11 h-11 overflow-hidden rounded-xl bg-orange-100 flex items-center justify-center group-hover:scale-105 transition-all duration-300 border border-orange-200/50">
                            <Image
                                src="https://i.ibb.co.com/XdDxtWw/Gemini-Generated-Image-qrukn3qrukn3qruk.png"
                                alt="Babu Moshai"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-zinc-900">
                            <span className="text-primary">Babu</span>
                            <span className="text-accent italic">-Moshai</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center">
                        <div className="flex items-center space-x-1 p-1.5 rounded-full bg-orange-100/50">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                            isActive 
                                                ? 'text-primary bg-white shadow-sm' 
                                                : 'text-orange-900/70 hover:text-primary hover:bg-white/40'
                                        }`}
                                    >
                                        <link.icon className={`w-4 h-4 ${isActive ? 'text-accent' : ''}`} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-1 sm:space-x-3">
                        <button className="p-2.5 rounded-full transition-all hover:bg-orange-100 text-orange-900">
                            <Search className="h-5 w-5" />
                        </button>

                        <Link href="/cart" className="group relative p-2.5">
                            <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110 text-primary" />
                            {cartItems.length > 0 && (
                                <span className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center ring-2 ring-white">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <div className="h-6 w-[1px] mx-2 hidden sm:block bg-orange-200" />

                        <Link
                            href={userInfo ? '/profile' : '/login'}
                            className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 bg-primary text-white hover:bg-secondary shadow-md shadow-primary/20"
                        >
                            {userInfo ? (
                                <span className="max-w-[100px] truncate">{userInfo.name}</span>
                            ) : (
                                <>
                                    <LogIn className="h-4 w-4" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-xl transition-colors text-primary hover:bg-orange-100"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute w-full bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-2xl overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50 group transition-all"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2.5 bg-orange-100/50 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <link.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-orange-950">{link.label}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-orange-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                            <div className="pt-4 mt-2">
                                <Link
                                    href={userInfo ? '/profile' : '/login'}
                                    className="bg-primary text-white flex items-center justify-center space-x-2 w-full py-4 rounded-2xl font-bold shadow-lg shadow-primary/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <User className="w-5 h-5" />
                                    <span>{userInfo ? 'My Account' : 'Sign In Now'}</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );
}