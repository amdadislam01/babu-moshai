'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/auth/authSlice';
import { AppDispatch } from '@/lib/store';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Products', icon: ShoppingBag, href: '/admin/products' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Orders', icon: Search, href: '/admin/orders' }, // Placeholder for now
    { name: 'Settings', icon: Settings, href: '/admin/settings' }, // Placeholder for now
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <aside className="w-72 bg-white border-r border-zinc-100 flex flex-col h-screen sticky top-0 overflow-y-auto">
            <div className="p-8">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                        <span className="text-xl font-bold">B</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900">
                        Admin<span className="text-primary">Panel</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 px-4">Menu</div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3.5 rounded-2xl group transition-all duration-300 ${isActive
                                    ? 'bg-primary text-white shadow-xl shadow-primary/20'
                                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-900 transition-colors'}`} />
                                <span className="font-bold text-sm tracking-tight">{item.name}</span>
                            </div>
                            {isActive && (
                                <ChevronRight className="w-4 h-4 text-white/50" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={() => dispatch(logout())}
                    className="w-full flex items-center space-x-3 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300 group"
                >
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                        <LogOut className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
