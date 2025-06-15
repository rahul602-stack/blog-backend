import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { handleError } from '../utils/errorHandler';
import { OrderStatus } from '@prisma/client';

// Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, type, items } = req.body;
    let total = 0;

    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId }
      });

      if (!menuItem) {
        res.status(400).json({ message: `Menu item ${item.menuItemId} not found` });
        return;
      }

      total += menuItem.price * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        customerId: customerId || null,
        type: type || 'DINE_IN',
        total,
        status: OrderStatus.PENDING
      }
    });

    await prisma.delivery.create({
      data: { orderId: order.id }
    });

    await prisma.orderItem.createMany({
      data: items.map((item: any) => ({
        orderId: order.id,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price
      }))
    });

    res.status(201).json(order);
  } catch (error) {
    handleError(error, res);
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status }
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    handleError(error, res);
  }
};

// Kitchen orders
export const getKitchenOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { status: { in: [OrderStatus.PENDING, OrderStatus.PREPARING] } },
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: 'asc' }
    });

    res.status(200).json(orders);
  } catch (error) {
    handleError(error, res);
  }
};

// Customer orders
export const getOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.customerId);
    const orders = await prisma.order.findMany({
      where: { customerId },
      include: { items: { include: { menuItem: true } }, delivery: true },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(orders);
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: { include: { menuItem: true } },
        delivery: true,
        customer: { select: { username: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    handleError(error, res);
  }
};
