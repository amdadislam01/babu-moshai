'use client';

import { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import api from '@/lib/api';
import { Plus, Edit, Trash } from 'lucide-react';

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products?pageNumber=1'); // Fetch first page for now
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const createHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await api.post('/products', {
                    name: 'Sample Product',
                    price: 0,
                    image: '/images/sample.jpg', // Placeholder
                    images: ['/images/sample.jpg'],
                    colors: [],
                    sizes: [],
                    brand: 'Babu-Moshai',
                    category: 'Sample Category',
                    countInStock: 0,
                    numReviews: 0,
                    description: 'Sample description',
                    fabric: 'Cotton',
                    occasion: 'Casual',
                    subCategory: 'Shirt',
                });
                // Refresh products
                const { data } = await api.get('/products');
                setProducts(data.products);
            } catch (error) {
                console.error('Error creating product:', error);
            }
        }
    };

    const deleteHandler = async (id: string) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter((p) => p._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <AdminGuard>
            <div className="min-h-screen bg-gray-100 flex">
                <aside className="w-64 bg-primary text-white hidden md:block">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold font-serif text-accent">Admin Panel</h2>
                    </div>
                    <nav className="mt-6">
                        <a href="/admin" className="block py-2.5 px-4 hover:bg-secondary transition-colors">Dashboard</a>
                        <a href="/admin/products" className="block py-2.5 px-4 bg-secondary text-accent">Products</a>
                        <a href="/admin/orders" className="block py-2.5 px-4 hover:bg-secondary transition-colors">Orders</a>
                    </nav>
                </aside>

                <main className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                        <button
                            onClick={createHandler}
                            className="bg-accent text-primary px-4 py-2 rounded flex items-center gap-2 font-bold hover:bg-yellow-500 transition-colors"
                        >
                            <Plus className="w-5 h-5" /> Create Product
                        </button>
                    </div>

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product._id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">৳ {product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Babu-Moshai</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => deleteHandler(product._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </AdminGuard>
    );
}
