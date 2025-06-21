// menuItemController.ts
import { Request, Response } from 'express';
import prisma from '../utils/prisma'; // ✅ Make sure this path is correct

export const getMenuItems = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.menuItem.findMany();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body; // ✅ body is available when using express.json() middleware
    const newItem = await prisma.menuItem.create({
      data: { name, price: parseFloat(price) }, // ✅ Ensure price is a number
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create menu item' });
  }
};
