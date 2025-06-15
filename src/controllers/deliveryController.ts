import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { handleError } from '../utils/errorHandler';


export const getAllDeliveries = async (_req: Request, res: Response) => {
  try {
    const deliveries = await prisma.delivery.findMany({
      include: {
        order: {
          include: {
            items: { include: { menuItem: true } }
          }
        }
      }
    });
    res.json(deliveries);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateDeliveryStatus = async (req: Request, res: Response) => {
  try {
    const { deliveryId } = req.params;
    const { status } = req.body;

    const updated = await prisma.delivery.update({
      where: { id: Number(deliveryId) },
      data: { status }
    });

    res.json(updated);
  } catch (error) {
    handleError(error, res);
  }
};
