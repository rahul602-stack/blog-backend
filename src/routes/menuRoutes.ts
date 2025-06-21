import express from 'express';
import { getMenuItems, createMenuItem } from '../controllers/menuItemController';
import prisma from '../utils/prisma'; // ✅ This was missing

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', createMenuItem);

// ✅ DELETE menu item by ID
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.menuItem.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

export default router;
