'use client';

import { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { register } from '@/lib/features/auth/authSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowRight, Eye, EyeOff } from 'lucide-react';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const { userInfo, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userInfo) {
            router.push(redirect);
        }
    }, [userInfo, redirect, router]);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            setMessage(null);
            dispatch(register({ name, email, password }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg p-8 md:p-12"
        >
            {/* Branding & Header */}
            <div className="mb-10 text-center md:text-left">
                <Link href="/" className="inline-block mb-6">
                    <div className="flex items-center space-x-2 group">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
                            <UserPlus className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-zinc-900">
                            Babu<span className="text-primary italic">-Moshai</span>
                        </span>
                    </div>
                </Link>
                <h2 className="text-4xl font-black text-zinc-900 tracking-tighter mb-2">
                    Create <span className="text-primary italic">Account</span>
                </h2>
                <p className="text-zinc-500 font-medium">Join us for a premium shopping experience.</p>
            </div>

            {/* Notifications */}
            {(message || error) && (
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-2"
                >
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                    {message || error}
                </motion.div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">
                {/* Full Name */}
                <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-1.5 block">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-1.5 block">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                {/* Password Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-1.5 block">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-10 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-sm"
                                placeholder="••••••••"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-1.5 block">Confirm</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={loading}
                    className="w-full bg-zinc-900 hover:bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-zinc-200 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px] mt-4"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>Create Account</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </motion.button>

                <p className="text-center text-zinc-500 text-sm font-medium pt-4">
                    Already part of the club? {' '}
                    <Link href={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary font-bold hover:text-zinc-900 transition-colors border-b-2 border-primary/20 hover:border-primary pb-0.5">
                        Sign In
                    </Link>
                </p>
            </form>
        </motion.div>
    );
}

export default function RegisterPage() {
    return (
        <main className="min-h-screen w-full flex bg-white overflow-hidden">
            <div className="hidden lg:block relative w-1/2 h-screen overflow-hidden">
                <Image
                    src="https://i.ibb.co.com/GfRhN82x/babu-moshai-logo.png"
                    alt="Babu Moshai Fashion"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[1px]" />
                <div className="absolute top-12 left-12">
                    <Link href="/" className="text-white text-xl font-black tracking-[0.3em] uppercase">
                        Babu Moshai
                    </Link>
                </div>
                <div className="absolute bottom-20 left-12 text-white max-w-md">
                    <h1 className="text-5xl font-black tracking-tighter leading-[1.1] mb-6">
                        Join the <br /> 
                        <span className="text-primary">Style Revolution.</span>
                    </h1>
                    <p className="text-zinc-200 font-medium text-lg mb-8 opacity-80">
                        Crafting timeless elegance for the little trendsetters.
                    </p>
                    <div className="flex gap-2">
                        <div className="w-12 h-1.5 bg-primary rounded-full" />
                        <div className="w-4 h-1.5 bg-white/30 rounded-full" />
                        <div className="w-4 h-1.5 bg-white/30 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Right : Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative bg-white">
               
                <div className="absolute top-10 right-10 hidden lg:block">
                    <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
                        Join Babu Moshai • Est. 2026
                    </p>
                </div>

                <Suspense fallback={<div className="font-black text-primary animate-pulse tracking-widest uppercase text-xs">Loading Elegance...</div>}>
                    <RegisterForm />
                </Suspense>
            </div>
        </main>
    );
}