import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-orange-50/50 text-gray-700 pt-10 pb-10 border-t border-orange-200/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="relative w-12 h-12 overflow-hidden rounded-2xl border-2 border-orange-200 group-hover:border-primary transition-all duration-500 shadow-sm group-hover:shadow-orange-200 group-hover:shadow-lg">
                                <Image
                                    src="https://i.ibb.co.com/XdDxtWw/Gemini-Generated-Image-qrukn3qrukn3qruk.png"
                                    alt="Babu Moshai"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-zinc-900 tracking-tight leading-none">
                                    Babu<span className="text-primary italic">-Moshai</span>
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-orange-600 font-semibold">Premium Elegance</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
                            Redefining masculine elegance with premium fashion for the modern gentleman. Experience the art of dressing well with our curated collections.
                        </p>
                        <div className="flex space-x-3 pt-2">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-primary hover:text-white transition-all duration-300 text-primary border border-orange-100"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:pl-8">
                        <h4 className="text-zinc-900 font-extrabold mb-7 text-sm uppercase tracking-widest">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Shop All', 'About Us', 'Contact', 'FAQs'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="group flex items-center text-gray-600 hover:text-primary transition-all w-fit">
                                        <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                            <ArrowRight className="w-3 h-3 text-primary mr-2" />
                                        </span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="text-zinc-900 font-extrabold mb-7 text-sm uppercase tracking-widest">Customer Care</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Shipping Info', 'Returns & Exchange', 'Size Guide', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="group flex items-center text-gray-600 hover:text-primary transition-all w-fit">
                                        <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                            <ArrowRight className="w-3 h-3 text-primary mr-2" />
                                        </span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-zinc-900 font-extrabold mb-7 text-sm uppercase tracking-widest">Get in Touch</h4>
                        <ul className="space-y-5 text-sm">
                            <li className="flex items-start gap-4 group">
                                <div className="p-2.5 bg-orange-100/50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-tighter">Email Support</span>
                                    <a href="mailto:support@babumoshai.com" className="font-semibold text-zinc-800 hover:text-primary transition-colors">
                                        support@babumoshai.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="p-2.5 bg-orange-100/50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-tighter">Phone Line</span>
                                    <a href="tel:+8801234567890" className="font-semibold text-zinc-800 hover:text-primary transition-colors">
                                        +880 1234 567890
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="p-2.5 bg-orange-100/50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-tighter">Our Flagship Store</span>
                                    <p className="font-semibold text-zinc-800">Gulshan-1, Dhaka, BD</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-orange-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <p className="text-gray-500 font-medium">
                        © {currentYear} <span className="text-primary font-bold">Babu-Moshai</span>. Crafted for Excellence.
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="flex gap-6 font-semibold text-gray-500">
                            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        </div>
                        {/* Payment Methods (Optional but looks professional) */}
                        <div className="hidden sm:flex items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                             <div className="h-6 w-10 bg-zinc-200 rounded" />
                             <div className="h-6 w-10 bg-zinc-200 rounded" />
                             <div className="h-6 w-10 bg-zinc-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}