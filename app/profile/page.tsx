'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/lib/store';
import { logout } from '@/lib/features/auth/authSlice';
import api from '@/lib/api';
import Link from 'next/link';

export default function ProfilePage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        } else {
            const fetchOrders = async () => {
                try {
                    const { data } = await api.get('/orders/myorders');
                    setOrders(data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [userInfo, router]);

    const logoutHandler = () => {
        dispatch(logout());
        router.push('/');
    };

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold font-serif text-primary">My Profile</h1>
                    <button
                        onClick={logoutHandler}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* User Info */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">User Details</h2>
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {userInfo.name}</p>
                                <p><strong>Email:</strong> {userInfo.email}</p>
                                <p className="capitalize"><strong>Role:</strong> {userInfo.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Type Errors with Orders */}
                    <div className="md:col-span-2">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">My Orders</h2>
                            {loading ? (
                                <div>Loading...</div>
                            ) : orders.length === 0 ? (
                                <div>No orders found.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {orders.map((order) => (
                                                <tr key={order._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id.substring(0, 10)}...</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳ {order.totalPrice}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {order.isPaid ? (
                                                            <span className="text-green-600 font-bold">Paid</span>
                                                        ) : (
                                                            <span className="text-red-600 font-bold">Not Paid</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {order.isDelivered ? (
                                                            <span className="text-green-600 font-bold">Delivered</span>
                                                        ) : (
                                                            <span className="text-red-600 font-bold">Pending</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
