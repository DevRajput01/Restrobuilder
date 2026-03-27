import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Helper to create Token
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};

// Middleware to protect routes
export const authenticate = (req: any, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    return next(); // Explicitly return next()
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' }); // Added return here
  }
};