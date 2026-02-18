'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
    {
        name: "MD Amdad Islam",
        role: "Verified Buyer",
        image: "https://i.ibb.co.com/9md97YZs/gig-profile.png",
        content: "The quality of the traditional set I ordered for my son is outstanding. The fabric is so soft and perfect for kids. Highly recommended!",
        rating: 5
    },
    {
        name: "Md Zahidul Islam",
        role: "Regular Customer",
        image: "https://avatars.githubusercontent.com/u/92626624?v=4",
        content: "Babu-Moshai has become my go-to for festive shopping. Their designs are unique and the delivery was surprisingly fast.",
        rating: 5
    },
    {
        name: "Md Rijoan Maruf",
        role: "Verified Buyer",
        image: "https://avatars.githubusercontent.com/u/78620963?v=4",
        content: "I was worried about the sizing, but their guide was spot on. The fit is perfect and my daughter looks like a little princess!",
        rating: 4
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
       
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Customer Stories
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-zinc-900 mb-6"
                    >
                        Loved by <span className="text-primary italic">Parents</span>
                    </motion.h2>
                    <p className="text-zinc-500 font-medium">
                        Hear from our amazing community about their experience with our premium collection.
                    </p>
                </div>

                {/* Testimonials  */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                        >
                           
                            <div className="absolute top-8 right-8 text-zinc-100 group-hover:text-primary/10 transition-colors duration-500">
                                <Quote size={40} fill="currentColor" />
                            </div>

                            {/* Ratings */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        className={`${i < item.rating ? 'fill-primary text-primary' : 'text-zinc-200'}`} 
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-zinc-600 leading-relaxed mb-8 relative z-10 italic">
                                {item.content}
                            </p>

                            {/* Profile */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                    <Image 
                                        src={item.image} 
                                        alt={item.name} 
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900 leading-none mb-1">{item.name}</h4>
                                    <span className="text-xs text-zinc-400 font-medium">{item.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}