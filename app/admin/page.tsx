'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { motion } from 'framer-motion';
import {
    Users as UsersIcon,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const data = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 5000, revenue: 9800 },
    { name: 'Apr', sales: 4500, revenue: 3908 },
    { name: 'May', sales: 6000, revenue: 4800 },
    { name: 'Jun', sales: 7000, revenue: 3800 },
];

const stats = [
    {
        label: 'Total Revenue',
        value: '৳ 125,000',
        icon: DollarSign,
        change: '+12.5%',
        trend: 'up',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50'
    },
    {
        label: 'New Orders',
        value: '45',
        icon: ShoppingBag,
        change: '+8.2%',
        trend: 'up',
        color: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    {
        label: 'Active Users',
        value: '1,240',
        icon: UsersIcon,
        change: '-2.4%',
        trend: 'down',
        color: 'text-orange-600',
        bg: 'bg-orange-50'
    },
];

export default function AdminDashboard() {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <AdminLayout>
            <div className="flex flex-col space-y-8">
                <header>
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">Dashboard</h1>
                    <p className="text-zinc-500 font-medium tracking-tight">Welcome back, Admin. Real-time insights at a glance.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500 group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                </div>
                                <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                    }`}>
                                    <span>{stat.change}</span>
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                </div>
                            </div>
                            <h3 className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em] mb-2">{stat.label}</h3>
                            <p className="text-4xl font-black text-zinc-900 tracking-tight">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                            <div>
                                <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-1">Sales Analytics</h2>
                                <p className="text-sm text-zinc-400 font-medium tracking-tight">Revenue generated over the last 6 months</p>
                            </div>
                            <div className="flex items-center space-x-2 bg-zinc-50 p-1.5 rounded-2xl border border-zinc-100 w-fit">
                                <button className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white shadow-sm border border-zinc-200 text-zinc-900">Weekly</button>
                                <button className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-600 transition-colors">Monthly</button>
                            </div>
                        </div>

                        <div className="h-96 w-full min-h-0">
                            {hasMounted && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#002366" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#002366" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#A1A1AA', fontSize: 12, fontWeight: 700 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#A1A1AA', fontSize: 12, fontWeight: 700 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '1.5rem',
                                                border: 'none',
                                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                                padding: '1.5rem'
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="sales"
                                            stroke="#002366"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorSales)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </AdminLayout>
    );
}
