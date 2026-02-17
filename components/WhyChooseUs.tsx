'use client';

import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Arif Ahmed",
        role: "Father of two",
        content: "Babu Moshai-er kaporer quality sotti-i premium. Amar cheler jonno suit niyechilam, fitting ekdom perfect chhilo!",
        rating: 5,
        location: "Dhaka"
    },
    {
        id: 2,
        name: "Sultana Razia",
        role: "Happy Mother",
        content: "I was worried about the delivery time, but it reached Chittagong within 2 days. Highly recommended for kids' fashion!",
        rating: 5,
        location: "Chittagong"
    },
    {
        id: 3,
        name: "Tanvir Hossain",
        role: "Professional Stylist",
        content: "The designs are very contemporary. It's hard to find such elegant traditional wear for boys elsewhere in BD.",
        rating: 4,
        location: "Sylhet"
    },
    {
        id: 4,
        name: "Farhana Karim",
        role: "Mother",
        content: "Girls' collection gulo khub-i sweet. Fabric gulo soft, tai bacchar kono uncomfortable feel hoy na.",
        rating: 5,
        location: "Dhaka"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-zinc-50/50 relative overflow-hidden">
            {/* Background Decorative Text */}
            <div className="absolute top-10 left-10 text-[15rem] font-black text-zinc-200/20 select-none pointer-events-none tracking-tighter">
                Reviews
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Customer Stories</span>
                        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mt-4 tracking-tighter">
                            The Babu <span className="text-primary italic">Diaries</span>
                        </h2>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-orange-100"
                    >
                        <div className="flex -space-x-3">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-orange-100" />
                            ))}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-zinc-900">4.9/5 Rating</p>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">From 2k+ Parents</p>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-[2rem] border border-orange-100/50 relative group hover:shadow-2xl hover:shadow-orange-200/30 transition-all duration-500"
                        >
                            <Quote className="absolute top-6 right-8 w-10 h-10 text-orange-50 group-hover:text-orange-100 transition-colors" />
                            
                            <div className="flex items-center gap-1 mb-6 text-accent">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-zinc-200'}`} />
                                ))}
                            </div>

                            <p className="text-zinc-600 text-sm leading-relaxed mb-8 font-medium italic">
                                {review.content}
                            </p>

                            <div className="flex items-center gap-4 border-t border-zinc-50 pt-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-primary font-bold text-xl">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h4 className="font-bold text-zinc-900 text-sm">{review.name}</h4>
                                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                                    </div>
                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
                                        {review.role} • {review.location}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badges */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                >
                    <p className="text-zinc-400 font-bold tracking-widest text-xs uppercase italic">As Featured In:</p>
                    <div className="font-black text-2xl text-zinc-400">VOGUE</div>
                    <div className="font-black text-2xl text-zinc-400">GQ</div>
                    <div className="font-black text-2xl text-zinc-400">KIDS FASHION</div>
                </motion.div>
            </div>
        </section>
    );
}