'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white rounded-lg p-6 max-w-lg w-full m-4 relative shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <h3 className="text-2xl font-bold text-primary mb-4 font-serif text-center">Size Guide</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-700">
                                <thead className="bg-muted text-primary uppercase font-bold">
                                    <tr>
                                        <th className="px-4 py-2">Size</th>
                                        <th className="px-4 py-2">Chest (in)</th>
                                        <th className="px-4 py-2">Length (in)</th>
                                        <th className="px-4 py-2">Shoulder (in)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-4 py-2 font-bold">S</td>
                                        <td className="px-4 py-2">38</td>
                                        <td className="px-4 py-2">28</td>
                                        <td className="px-4 py-2">17</td>
                                    </tr>
                                    <tr className="border-b bg-gray-50">
                                        <td className="px-4 py-2 font-bold">M</td>
                                        <td className="px-4 py-2">40</td>
                                        <td className="px-4 py-2">29</td>
                                        <td className="px-4 py-2">18</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-4 py-2 font-bold">L</td>
                                        <td className="px-4 py-2">42</td>
                                        <td className="px-4 py-2">30</td>
                                        <td className="px-4 py-2">19</td>
                                    </tr>
                                    <tr className="border-b bg-gray-50">
                                        <td className="px-4 py-2 font-bold">XL</td>
                                        <td className="px-4 py-2">44</td>
                                        <td className="px-4 py-2">31</td>
                                        <td className="px-4 py-2">20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-xs text-gray-500 text-center">
                            Measurements may vary by style. Please contact support for specific inquiries.
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
