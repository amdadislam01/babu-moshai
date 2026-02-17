'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';
import { saveShippingAddress, savePaymentMethod, clearCart } from '@/lib/features/cart/cartSlice';
import api from '@/lib/api';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const [address, setAddress] = useState(cart.shippingAddress.address || '');
    const [city, setCity] = useState(cart.shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(cart.shippingAddress.postalCode || '');
    const [country, setCountry] = useState(cart.shippingAddress.country || '');
    const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod || 'bKash');
    const [loading, setLoading] = useState(false);

    // Calculate prices
    const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 5000 ? 0 : 100;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInfo) {
            router.push('/login?redirect=checkout');
            return;
        }

        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        dispatch(savePaymentMethod(paymentMethod));

        setLoading(true);
        try {
            const orderData = {
                orderItems: cart.cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const { data } = await api.post('/orders', orderData);
            dispatch(clearCart());
            router.push(`/order/${data._id}`);
        } catch (error) {
            console.error('Order creation failed:', error);
            alert('Order creation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.cartItems.length === 0) {
        router.push('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold font-serif text-primary mb-8 text-center">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Shipping Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Method</h2>
                                <div className="space-y-2">
                                    {['bKash', 'Nagad', 'SSLCommerz', 'Cash on Delivery'].map((method) => (
                                        <div key={method} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={method}
                                                name="paymentMethod"
                                                value={method}
                                                checked={paymentMethod === method}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            />
                                            <label htmlFor={method} className="ml-2 block text-sm text-gray-700 font-medium">
                                                {method}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                className="w-full mt-6 bg-accent text-primary font-bold py-3 rounded-lg shadow-md hover:bg-yellow-400 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </motion.button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Items</span>
                                <span>৳ {itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span>৳ {shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span>৳ {taxPrice}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span>৳ {totalPrice}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 text-gray-700">Items in Cart:</h3>
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {cart.cartItems.map((item) => (
                                    <li key={item.product} className="flex justify-between text-sm">
                                        <span className="truncate w-3/4">{item.name} (x{item.quantity})</span>
                                        <span className="font-medium">৳ {item.price * item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
