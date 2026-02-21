'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminGuard from '../AdminGuard';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <AdminGuard>
            <div className="flex min-h-screen bg-zinc-50 font-sans selection:bg-primary/10 selection:text-primary relative">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block">
                    <AdminSidebar />
                </div>

                {/* Mobile Sidebar */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-[110] lg:hidden"
                            />
                            <motion.div
                                initial={{ x: -300 }}
                                animate={{ x: 0 }}
                                exit={{ x: -300 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 left-0 z-[120] lg:hidden"
                            >
                                <AdminSidebar />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <main className="flex-1 flex flex-col min-w-0">
                    {/* Mobile Header */}
                    <header className="lg:hidden h-20 bg-white border-b border-zinc-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-[100]">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                                <span className="text-sm font-bold">B</span>
                            </div>
                            <span className="font-bold tracking-tight text-zinc-900">Admin</span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 bg-zinc-50 rounded-xl text-zinc-500"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </header>

                    <div className="p-6 md:p-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </main>
            </div>
        </AdminGuard>
    );
}
