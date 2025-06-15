import prisma from '../utils/prisma';
import { Request, Response } from 'express';

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
    const { name, price } = req.body;
    const newItem = await prisma.menuItem.create({
      data: { name, price }
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create menu item' });
  }
};
