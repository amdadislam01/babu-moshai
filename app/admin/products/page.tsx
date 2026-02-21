'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/lib/api';
import axios from 'axios';
import {
    Plus,
    Edit2,
    Trash2,
    Search,
    Filter,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Package,
    X,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/products?pageNumber=1');
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setIsUploading(true);
        try {
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

            // Use plain axios instead of api instance to avoid CORS issues with Authorization header
            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            const imageUrl = data.data.url;
            setEditingProduct((prev: any) => ({
                ...prev,
                image: imageUrl,
                images: [...(prev.images || []), imageUrl]
            }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please check your ImgBB API key in .env');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (urlToRemove: string) => {
        setEditingProduct((prev: any) => ({
            ...prev,
            images: prev.images.filter((url: string) => url !== urlToRemove),
            // Update main image if the removed one was it
            image: prev.image === urlToRemove ? (prev.images.length > 1 ? prev.images[0] : '') : prev.image
        }));
    };

    const handleCreate = () => {
        setEditingProduct({
            name: '',
            price: 0,
            image: '',
            images: [],
            category: '',
            subCategory: '',
            sizes: [],
            colors: [],
            stock: 0,
            description: '',
            fabric: '',
            occasion: '',
        });
        setIsModalOpen(true);
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter((p) => p._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingProduct._id) {
                await api.put(`/products/${editingProduct._id}`, editingProduct);
            } else {
                await api.post('/products', editingProduct);
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">Products</h1>
                        <p className="text-zinc-500 font-medium">Manage your inventory and product listings.</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="bg-primary text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Product</span>
                    </button>
                </header>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-white border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm"
                        />
                    </div>
                    <button className="px-6 py-4 bg-white border border-zinc-100 rounded-2xl text-zinc-600 font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all shadow-sm">
                        <Filter className="w-5 h-5" />
                        <span>Filters</span>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-50">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Product</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Category</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Price</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Stock</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Loading Inventory...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-zinc-400 font-medium">No products found.</td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product._id} className="group hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-200 shadow-sm relative shrink-0">
                                                        {product.images?.[0] ? (
                                                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                                <ImageIcon className="w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-zinc-900 tracking-tight leading-tight mb-0.5">{product.name}</div>
                                                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product._id.substring(0, 8)}...</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                    {product.category || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-black text-zinc-900 tracking-tight">৳ {product.price.toLocaleString()}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`flex items-center gap-2 font-bold text-sm ${product.stock > 10 ? 'text-zinc-600' : 'text-orange-500'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-zinc-300' : 'bg-orange-500 animate-pulse'}`} />
                                                    {product.stock} in stock
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="p-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-600 hover:text-primary hover:border-primary transition-all shadow-sm"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
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

            {/* Product Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <header className="p-8 border-b border-zinc-100 flex items-center justify-between shrink-0">
                                <div>
                                    <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                                        {editingProduct?._id ? 'Edit Product' : 'New Product'}
                                    </h2>
                                    <p className="text-sm text-zinc-400 font-medium">Add details for your listing</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-3 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-zinc-900 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </header>

                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Product Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={editingProduct?.name || ''}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 text-zinc-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                            placeholder="e.g. Classic White Shirt"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Price (৳)</label>
                                        <input
                                            type="number"
                                            required
                                            value={editingProduct?.price || ''}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 text-zinc-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Category</label>
                                        <input
                                            type="text"
                                            required
                                            value={editingProduct?.category || ''}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 text-zinc-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                            placeholder="e.g. Menswear"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Stock Amount</label>
                                        <input
                                            type="number"
                                            required
                                            value={editingProduct?.stock || ''}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 text-zinc-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Product Images</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {/* Upload Button */}
                                        <label className="aspect-square rounded-3xl border-2 border-dashed border-zinc-100 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-50 hover:border-primary/20 transition-all group overflow-hidden relative">
                                            {isUploading ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                                    <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">Uploading...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                                        <Plus className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest group-hover:text-primary transition-colors">Add Media</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                                </>
                                            )}
                                        </label>

                                        {/* Image Previews */}
                                        <AnimatePresence>
                                            {editingProduct?.images?.map((url: string, index: number) => (
                                                <motion.div
                                                    key={url}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="aspect-square rounded-3xl bg-zinc-100 border border-zinc-200 overflow-hidden relative group"
                                                >
                                                    <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(url)}
                                                        className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Description</label>
                                    <textarea
                                        rows={4}
                                        value={editingProduct?.description || ''}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                        className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 text-zinc-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none"
                                        placeholder="Describe your product..."
                                    />
                                </div>
                            </form>

                            <footer className="p-8 border-t border-zinc-100 shrink-0 flex items-center justify-end gap-4 bg-zinc-50/50">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-4 rounded-2xl text-zinc-400 font-bold hover:text-zinc-900 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSaving}
                                    className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2"
                                >
                                    {isSaving && <Loader2 className="w-5 h-5 animate-spin" />}
                                    {editingProduct?._id ? 'Save Changes' : 'Create Product'}
                                </button>
                            </footer>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
