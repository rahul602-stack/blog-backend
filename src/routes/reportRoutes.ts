import express from 'express';
import { getSalesReport, getInventoryReport } from '../controllers/reportController';

const router = express.Router();

router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);

export default router;
