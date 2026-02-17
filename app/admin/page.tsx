'use client';

import AdminGuard from '@/components/AdminGuard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 7000 },
];

export default function AdminDashboard() {
    return (
        <AdminGuard>
            <div className="min-h-screen bg-gray-100 flex">
                {/* Sidebar (Simplified) */}
                <aside className="w-64 bg-primary text-white hidden md:block">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold font-serif text-accent">Admin Panel</h2>
                    </div>
                    <nav className="mt-6">
                        <a href="/admin" className="block py-2.5 px-4 bg-secondary text-accent">Dashboard</a>
                        <a href="/admin/products" className="block py-2.5 px-4 hover:bg-secondary transition-colors">Products</a>
                        <a href="/admin/orders" className="block py-2.5 px-4 hover:bg-secondary transition-colors">Orders</a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-500 font-medium">Total Sales</h3>
                            <p className="text-3xl font-bold text-primary">৳ 125,000</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-500 font-medium">New Orders</h3>
                            <p className="text-3xl font-bold text-primary">45</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h3 className="text-gray-500 font-medium">Total Products</h3>
                            <p className="text-3xl font-bold text-primary">120</p>
                        </motion.div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Sales Analytics</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="sales" stroke="#002366" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </main>
            </div>
        </AdminGuard>
    );
}
