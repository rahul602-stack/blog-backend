import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { handleError } from '../utils/errorHandler';

export const getAllInventory = async (_req: Request, res: Response) => {
  try {
    const inventory = await prisma.inventory.findMany();
    res.json(inventory);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedInventory = await prisma.inventory.update({
      where: { id: parseInt(id) },
      data: { quantity }
    });

    res.json(updatedInventory);
  } catch (error) {
    handleError(error, res);
  }
};
