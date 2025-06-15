import express from 'express';
import { getPendingOrdersForCashier } from '../controllers/cashierController';

const router = express.Router();

router.get('/orders', getPendingOrdersForCashier);

export default router;
