'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    Truck,
    AlertCircle,
    Eye,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface OrderItem {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
}

interface Order {
    _id: string;
    user: {
        _id: string;
        name: string;
    };
    orderItems: OrderItem[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    createdAt: string;
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeliver = async (id: string) => {
        if (window.confirm('Mark this order as delivered?')) {
            try {
                await api.put(`/orders/${id}/deliver`);
                fetchOrders();
            } catch (error) {
                console.error('Error updating order:', error);
            }
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user.name.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === 'all') return matchesSearch;
        if (filterStatus === 'delivered') return matchesSearch && order.isDelivered;
        if (filterStatus === 'pending') return matchesSearch && !order.isDelivered;
        if (filterStatus === 'paid') return matchesSearch && order.isPaid;

        return matchesSearch;
    });

    const getStatusIcon = (order: Order) => {
        if (order.isDelivered) return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
        if (order.isPaid) return <Clock className="w-4 h-4 text-blue-500" />;
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
    };

    const getStatusBadge = (order: Order) => {
        if (order.isDelivered) {
            return (
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Delivered</span>
                </div>
            );
        }
        if (order.isPaid) {
            return (
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    <span>Paid</span>
                </div>
            );
        }
        return (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                <AlertCircle className="w-3 h-3" />
                <span>Pending</span>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="flex flex-col space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">Orders</h1>
                        <p className="text-zinc-500 font-medium tracking-tight">Manage and track customer purchases.</p>
                    </div>
                </header>

                <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                    <div className="p-8 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-zinc-50/50">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by ID or customer name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="flex items-center space-x-3 bg-white p-1.5 rounded-2xl border border-zinc-200 w-fit shadow-sm">
                            {['all', 'pending', 'paid', 'delivered'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === status
                                            ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20'
                                            : 'text-zinc-400 hover:text-zinc-600'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        {loading ? (
                            <div className="h-full flex items-center justify-center p-20">
                                <div className="w-12 h-12 border-4 border-zinc-100 border-t-primary rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white">
                                        <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Order</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Customer</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Total</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Date</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    <AnimatePresence mode='popLayout'>
                                        {filteredOrders.map((order, index) => (
                                            <motion.tr
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: index * 0.05 }}
                                                key={order._id}
                                                className="group hover:bg-zinc-50/50 transition-colors"
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-zinc-900 text-sm">#{order._id.slice(-6).toUpperCase()}</span>
                                                        <span className="text-zinc-400 text-[10px] font-medium uppercase tracking-tight">{order.paymentMethod}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold text-xs uppercase">
                                                            {order.user.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-zinc-900 text-sm">{order.user.name}</span>
                                                            <span className="text-zinc-400 text-xs font-medium truncate max-w-[150px]">{order.shippingAddress.city}, {order.shippingAddress.country}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-zinc-900">৳ {order.totalPrice.toLocaleString()}</span>
                                                        <span className="text-zinc-400 text-[10px] font-medium uppercase tracking-tight">{order.orderItems.length} Items</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {getStatusBadge(order)}
                                                </td>
                                                <td className="px-8 py-6 text-zinc-500 text-sm font-medium">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        {!order.isDelivered && (
                                                            <button
                                                                onClick={() => handleDeliver(order._id)}
                                                                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                                            >
                                                                <Truck className="w-4 h-4" />
                                                                <span>Deliver</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="p-8 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/30">
                        <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                            Showing {filteredOrders.length} of {orders.length} orders
                        </span>
                        <div className="flex items-center space-x-2 text-zinc-500">
                            <button className="p-2 hover:bg-white rounded-xl border border-zinc-200 shadow-sm disabled:opacity-50" disabled>
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-sm font-black px-4">1</span>
                            <button className="p-2 hover:bg-white rounded-xl border border-zinc-200 shadow-sm disabled:opacity-50" disabled>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
