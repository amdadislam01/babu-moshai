import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
    user?: any;
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;
    const authReq = req as AuthRequest;

    if (
        authReq.headers.authorization &&
        authReq.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = authReq.headers.authorization.split(' ')[1];

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');

            authReq.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    if (authReq.user && authReq.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };
