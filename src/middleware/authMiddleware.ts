import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '@prisma/client';  // this helps with enums

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: Role;
      };
    }
  }
}

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err || !decoded) {
      res.sendStatus(403);
      return;
    }

    req.user = {
      id: decoded.userId,
      role: decoded.role
    };
    next();
  });
};

// ✅ Role-based middleware using Prisma Role enum
export const authorizeRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      res.status(403).json({ 
        message: `Access denied. Required role: ${roles.join(', ')}`
      });
      return;
    }
    next();
  };
};
