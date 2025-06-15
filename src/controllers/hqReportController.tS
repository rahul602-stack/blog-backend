import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { handleError } from '../utils/errorHandler';

export const getHQSalesReport = async (_req: Request, res: Response) => {
  try {
    // Replace this with your actual logic to retrieve branches if you have multiple branches
    const branches = ['Main Branch', 'Branch A', 'Branch B'];

    // Mockup: Generate fake sales per branch (for now)
    const salesData = await Promise.all(
      branches.map(async (branch) => {
        // Get orders (you can add filters for branches if needed)
        const orders = await prisma.order.findMany({
          where: {
            status: {
              in: ['SERVED'], // Only count served orders
            },
          },
          select: {
            total: true,
          },
        });

        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        return {
          branch,
          totalOrders,
          totalRevenue,
        };
      })
    );

    res.json(salesData);
  } catch (error) {
    handleError(error, res);
  }
};
