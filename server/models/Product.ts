import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String }, // e.g., 'Formal', 'Casual'
    images: [{ type: String, required: true }],
    sizes: [{ type: String }], // e.g., ['S', 'M', 'L', 'XL']
    colors: [{ type: String }],
    stock: { type: Number, default: 0 },
    fabric: { type: String },
    occasion: { type: String },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
