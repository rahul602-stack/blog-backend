import express from 'express';
import { getAllInventory, updateInventory } from '../controllers/inventoryController';

const router = express.Router();

router.get('/', getAllInventory);
router.put('/', updateInventory);

export default router;
