'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';
import api from '@/lib/api';
import ProductGallery from '@/components/ProductGallery';
import SizeGuide from '@/components/SizeGuide';
import RecommendedOutfits from '@/components/RecommendedOutfits'; // Reusing for "Complete the Look"
import { motion } from 'framer-motion';
// import { loadStripe } from '@stripe/stripe-js'; // Placeholder for future
import { ShoppingBag, Ruler, Check } from 'lucide-react';

export default function ProductPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [size, setSize] = useState('');
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSize(data.sizes[0]);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                product: product._id,
                name: product.name,
                image: product.images[0],
                price: product.price,
                countInStock: product.stock,
                quantity: 1,
                size,
            }));
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Gallery */}
                    <ProductGallery images={product.images && product.images.length > 0 ? product.images : ['https://placehold.co/600x600?text=No+Image']} />

                    {/* Info */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-500 mb-6">{product.category} | {product.subCategory}</p>

                        <div className="text-3xl font-bold text-gray-900 mb-6">৳ {product.price}</div>

                        <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-800">Select Size</span>
                                    <button
                                        onClick={() => setShowSizeGuide(true)}
                                        className="flex items-center text-accent hover:text-primary transition-colors text-sm font-medium"
                                    >
                                        <Ruler className="w-4 h-4 mr-1" /> Size Guide
                                    </button>
                                </div>
                                <div className="flex gap-3">
                                    {product.sizes.map((s: string) => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium transition-all ${size === s
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-300 text-gray-700 hover:border-primary'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <motion.button
                                onClick={handleAddToCart}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-1 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors ${added ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-opacity-90'
                                    }`}
                                disabled={product.stock === 0}
                            >
                                {added ? (
                                    <>
                                        <Check className="w-5 h-5" /> Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" /> {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                    </>
                                )}
                            </motion.button>
                        </div>

                        {/* Meta */}
                        <div className="border-t pt-6 space-y-2 text-sm text-gray-500">
                            <p><span className="font-semibold text-gray-700">Fabric:</span> {product.fabric || 'Premium Blend'}</p>
                            <p><span className="font-semibold text-gray-700">Occasion:</span> {product.occasion || 'Versatile'}</p>
                        </div>
                    </div>
                </div>

                {/* Complete The Look */}
                <div className="border-t border-gray-200">
                    <RecommendedOutfits />
                </div>
            </div>

            <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
        </div>
    );
}
