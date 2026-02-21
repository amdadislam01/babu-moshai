'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/lib/api';
import {
    Users as UsersIcon,
    Search,
    Shield,
    ShieldAlert,
    Trash2,
    Mail,
    Loader2,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleRole = async (user: any) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        if (window.confirm(`Are you sure you want to change ${user.name}'s role to ${newRole}?`)) {
            try {
                await api.put(`/users/${user._id}`, { role: newRole });
                setUsers(users.map((u) => u._id === user._id ? { ...u, role: newRole } : u));
            } catch (error) {
                console.error('Error updating role:', error);
                alert('Failed to update role');
            }
        }
    };

    const deleteUser = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/users/${id}`);
                setUsers(users.filter((u) => u._id !== id));
            } catch (error: any) {
                console.error('Error deleting user:', error);
                alert(error.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="flex flex-col space-y-8">
                <header>
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">User Management</h1>
                    <p className="text-zinc-500 font-medium">Manage access controls and user roles.</p>
                </header>

                {/* Search */}
                <div className="relative group max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm"
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-50">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">User</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Contact</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Role</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Fetching Users...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-zinc-400 font-medium">No users found.</td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="group hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 font-black text-lg shadow-sm">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-zinc-900 tracking-tight leading-tight mb-0.5">{user.name}</div>
                                                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ID: {user._id.substring(0, 8)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-zinc-600 font-medium">
                                                    <Mail className="w-4 h-4 text-zinc-300" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${user.role === 'admin'
                                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                        : 'bg-zinc-100 text-zinc-500'
                                                    }`}>
                                                    {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <UsersIcon className="w-3 h-3" />}
                                                    {user.role}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => toggleRole(user)}
                                                        title={user.role === 'admin' ? 'Revoke Admin' : 'Grant Admin'}
                                                        className={`p-2.5 rounded-xl border transition-all shadow-sm ${user.role === 'admin'
                                                                ? 'bg-white border-zinc-200 text-zinc-600 hover:text-red-500 hover:border-red-200'
                                                                : 'bg-white border-zinc-200 text-zinc-600 hover:text-primary hover:border-primary'
                                                            }`}
                                                    >
                                                        {user.role === 'admin' ? <ShieldAlert className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteUser(user._id)}
                                                        title="Delete User"
                                                        className="p-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-600 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
