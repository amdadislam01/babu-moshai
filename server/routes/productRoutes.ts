import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../models/Product';
import { protect, admin, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// @desc    Fetch all products with filtering
// @route   GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword as string,
                $options: 'i',
            },
        }
        : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const fabric = req.query.fabric ? { fabric: req.query.fabric } : {};
    const occasion = req.query.occasion ? { occasion: req.query.occasion } : {};

    // Size filter handled slightly differently if array
    const sizes = req.query.size ? { sizes: { $in: [req.query.size] } } : {};

    // Combine all filters
    const filter: any = { ...keyword, ...category, ...fabric, ...occasion, ...sizes };

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
}));

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
}));

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, asyncHandler(async (req: Request, res: Response) => {
    const {
        name, price, description, images, category, subCategory, sizes, colors, stock, fabric, occasion
    } = req.body;

    const product = new Product({
        name,
        price,
        description,
        images,
        category,
        subCategory,
        sizes,
        colors,
        stock,
        fabric,
        occasion
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
}));

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, asyncHandler(async (req: Request, res: Response) => {
    const {
        name, price, description, images, category, subCategory, sizes, colors, stock, fabric, occasion
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.images = images || product.images;
        product.category = category || product.category;
        product.subCategory = subCategory || product.subCategory;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.stock = stock || product.stock;
        product.fabric = fabric || product.fabric;
        product.occasion = occasion || product.occasion;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
}));

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
}));

export default router;
