import express from 'express';
import { getMenuItems, createMenuItem } from '../controllers/menuItemController';


const router = express.Router();

router.get('/', getMenuItems);
router.post('/', createMenuItem);

export default router;
