'use client';

import { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form'; // Added
import { signIn } from 'next-auth/react';
import { login } from '@/lib/features/auth/authSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { motion } from 'framer-motion';
import { Lock, Mail, LogIn, Eye, EyeOff, ArrowRight } from 'lucide-react';

// Interface for type safety
interface LoginFormData {
    email: string;
    password: string;
}

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const { userInfo, loading: reduxLoading, error: reduxError } = useSelector((state: RootState) => state.auth);

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>();

    useEffect(() => {
        if (userInfo) {
            router.push(redirect);
        }
    }, [userInfo, redirect, router]);

    const onSubmit = async (data: LoginFormData) => {
        setIsLoggingIn(true);
        setAuthError(null);
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                setAuthError("Invalid email or password");
            } else {
                dispatch(login(data));
                router.push(redirect);
            }
        } catch (err: any) {
            setAuthError("An unexpected error occurred");
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg p-8 md:p-16"
        >
            <div className="mb-10 text-center md:text-left">
                <Link href="/" className="inline-block mb-8">
                    <div className="flex items-center space-x-2 group">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
                            <LogIn className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-zinc-900">
                            Babu<span className="text-primary italic">-Moshai</span>
                        </span>
                    </div>
                </Link>
                <h2 className="text-4xl font-black text-zinc-900 tracking-tighter mb-3">
                    Sign <span className="text-primary italic">In</span>
                </h2>
                <p className="text-zinc-500 font-medium">Please enter your details to access your account.</p>
            </div>

            {/* Error Message */}
            {(authError || reduxError || Object.keys(errors).length > 0) && (
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-2"
                >
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    {authError || reduxError || "Invalid input details"}
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-5">
                    {/* Email Field */}
                    <div className="group">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-2 block">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                                })}
                                type="email"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                                placeholder="example@mail.com"
                            />
                        </div>
                        {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="group">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 block">Password</label>
                            <Link href="#" className="text-[11px] font-bold text-primary hover:underline uppercase tracking-widest">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                {...register('password', { required: 'Password is required' })}
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-12 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.password.message}</p>}
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isLoggingIn || reduxLoading}
                    type="submit"
                    className="w-full bg-zinc-900 hover:bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-zinc-200 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                    {isLoggingIn || reduxLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>Sign In</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </motion.button>

                <p className="text-center text-zinc-500 text-sm font-medium pt-4">
                    Don&apos;t have an account? {' '}
                    <Link href="/register" className="text-primary font-bold hover:text-zinc-900 transition-colors border-b-2 border-primary/20 hover:border-primary pb-0.5">
                        Create Account
                    </Link>
                </p>
            </form>
        </motion.div>
    );
}

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full flex bg-white overflow-hidden">
            <div className="hidden lg:block relative w-1/2 h-screen overflow-hidden">
                <Image
                    src="https://i.ibb.co.com/GfRhN82x/babu-moshai-logo.png"
                    alt="Premium Fashion"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[1px]" />
                <div className="absolute bottom-20 left-16 text-white max-w-md">
                    <h1 className="text-5xl font-black tracking-tighter leading-tight mb-4">
                        Defining the <br />
                        <span className="text-primary">Next Generation</span> of Elegance.
                    </h1>
                    <div className="w-20 h-1 bg-primary rounded-full" />
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center relative bg-white">
                <div className="absolute top-10 right-10 hidden lg:block">
                    <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
                        Established 2026 • Premium Wear
                    </p>
                </div>

                <Suspense fallback={<div className="font-black text-primary animate-pulse">Establishing Secure Connection...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}