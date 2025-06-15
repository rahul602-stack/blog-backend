import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { handleError } from '../utils/errorHandler';
import { OrderStatus } from '@prisma/client';

export const getPendingOrdersForCashier = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { status: { not: OrderStatus.SERVED } },
      include: {
        items: { include: { menuItem: true } },
        customer: { select: { username: true } }
      }
    });
    res.json(orders);
  } catch (error) {
    handleError(error, res);
  }
};
