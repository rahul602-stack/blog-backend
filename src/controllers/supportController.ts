import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { handleError } from '../utils/errorHandler';

// Create Support Ticket
export const createSupportTicket = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const newTicket = await prisma.supportTicket.create({
      data: { title, description, status: 'OPEN' }
    });

    res.status(201).json(newTicket);
  } catch (error) {
    handleError(error, res);
  }
};

// Optional: Get all tickets
export const getAllSupportTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await prisma.supportTicket.findMany();
    res.json(tickets);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const ticketId = parseInt(req.params.ticketId);
    const { status } = req.body;
    const updatedTicket = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status }
    });
    res.json(updatedTicket);
  } catch (error) {
    handleError(error, res);
  }
};