'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`relative w-20 h-20 border-2 rounded-md overflow-hidden transition-colors ${selectedImage === img ? 'border-primary' : 'border-gray-200'
                            }`}
                    >
                        <Image src={img} alt={`Thumbnail ${index}`} fill className="object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden bg-gray-100">
                <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={selectedImage}
                        alt="Product Image"
                        fill
                        className="object-contain md:object-cover"
                        priority
                    />
                </motion.div>
            </div>
        </div>
    );
}
