import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { handleError } from '../utils/errorHandler';

export const getSalesReport = async (_req: Request, res: Response) => {
  try {
    const totalSales = await prisma.order.aggregate({
      _sum: { total: true },
      _count: { id: true }
    });

    res.json({
      totalRevenue: totalSales._sum.total || 0,
      totalOrders: totalSales._count.id
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getInventoryReport = async (_req: Request, res: Response) => {
  try {
    const inventoryCount = await prisma.inventory.count();
    res.json({
      totalInventoryItems: inventoryCount
    });
  } catch (error) {
    handleError(error, res);
  }
};
