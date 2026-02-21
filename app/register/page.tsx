'use client';

import { useEffect, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form'; // Added
import { signIn } from 'next-auth/react';
import { register as registerUser } from '@/lib/features/auth/authSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowRight, Eye, EyeOff } from 'lucide-react';

// interface
interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [regError, setRegError] = useState<string | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const { userInfo, loading: reduxLoading, error: reduxError } = useSelector((state: RootState) => state.auth);

    // useForm hook 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterFormData>();


    const onSubmit = async (data: RegisterFormData) => {
        const { name, email, password } = data;
        setIsRegistering(true);
        setRegError(null);
        try {
            // First register via Redux action (which calls backend)
            const resultAction = await dispatch(registerUser({ name, email, password }));

            if (registerUser.fulfilled.match(resultAction)) {
                // If registration successful, sign in with NextAuth
                const signInResult = await signIn('credentials', {
                    redirect: false,
                    email,
                    password,
                });

                if (signInResult?.error) {
                    setRegError("Registration successful, but sign-in failed. Please login manually.");
                } else {
                    router.push(redirect);
                }
            } else if (registerUser.rejected.match(resultAction)) {
                setRegError(resultAction.payload as string || "Registration failed");
            }
        } catch (err: any) {
            setRegError("An unexpected error occurred");
        } finally {
            setIsRegistering(false);
        }
    };

    const password = watch('password');

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg p-8 md:p-12"
        >
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

            {/* Error Notifications */}
            {(regError || reduxError || Object.keys(errors).length > 0) && (
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex flex-col gap-1"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                        <span>{regError || reduxError || "Please fix the errors below"}</span>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-1.5 block">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                            placeholder="John Doe"
                        />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.name.message as string}</p>}
                </div>

                {/* Email */}
                <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-1.5 block">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                            })}
                            type="email"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                            placeholder="john@example.com"
                        />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.email.message as string}</p>}
                </div>

                {/* Password Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-1.5 block">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                {...register('password', {
                                    required: 'Required',
                                    minLength: { value: 6, message: 'Min 6 chars' }
                                })}
                                type={showPassword ? "text" : "password"}
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
                        {errors.password && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.password.message as string}</p>}
                    </div>

                    <div className="group">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1 mb-1.5 block">Confirm</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                {...register('confirmPassword', {
                                    required: 'Required',
                                    validate: (value) => value === password || 'No match'
                                })}
                                type="password"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.confirmPassword.message as string}</p>}
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isRegistering || reduxLoading}
                    type="submit"
                    className="w-full bg-zinc-900 hover:bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-zinc-200 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px] mt-4"
                >
                    {isRegistering || reduxLoading ? (
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