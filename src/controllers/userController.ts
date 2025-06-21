import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { Role } from '@prisma/client'; // ✅ ACTUALLY USE THIS ENUM!


export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('❌ Failed to fetch users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.id);
  const { role } = req.body;

  if (!role || !Object.values(Role).includes(role)) {
    res.status(400).json({ message: 'Invalid role specified' });
    return;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
};


