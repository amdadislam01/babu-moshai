'use client';

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '@/lib/store';
import { removeFromCart, addToCart } from '@/lib/features/cart/cartSlice';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleQuantityChange = (item: any, qty: number) => {
        dispatch(addToCart({ ...item, quantity: qty }));
    };

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="bg-gray-100 rounded-full p-8 inline-block mb-6">
                        <ShoppingBag className="w-24 h-24 text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
                    <Link
                        href="/shop"
                        className="inline-block btn-accent px-8 py-3 text-base"
                    >
                        <span className="flex items-center gap-2">
                            Continue Shopping
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold font-serif mb-2"
                >
                    <span className="gradient-text">Shopping Cart</span>
                </motion.h1>
                <p className="text-gray-600 mb-8">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="w-full lg:w-3/4 space-y-4">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.product}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="card-premium p-6 flex flex-col md:flex-row items-center gap-6"
                                >
                                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <Link href={`/product/${item.product}`} className="text-xl font-bold text-gray-800 hover:text-primary transition-colors block mb-2">
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-500 mb-1">Size: <span className="font-semibold text-gray-700">{item.size}</span></p>
                                        <p className="text-2xl font-bold text-primary mt-2">৳ {item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                                            <button
                                                onClick={() => item.quantity > 1 && handleQuantityChange(item, item.quantity - 1)}
                                                className="text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                className="text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
                                                disabled={item.quantity >= (item.countInStock || 5)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleRemove(item.product)}
                                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="w-full lg:w-1/4">
                        <div className="card-premium p-8 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif border-b pb-4">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                    <span className="font-semibold text-gray-900">৳ {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-semibold">Free</span>
                                </div>
                            </div>
                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between items-center text-2xl font-bold">
                                    <span>Total</span>
                                    <span className="gradient-text">৳ {subtotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full text-center btn-accent py-4 text-base mb-3"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Proceed to Checkout
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>

                            <Link
                                href="/shop"
                                className="block w-full text-center border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary py-4 rounded-full font-semibold transition-all"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
