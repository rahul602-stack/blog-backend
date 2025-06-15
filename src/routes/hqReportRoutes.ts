import express from 'express';
import { getHQSalesReport } from '../controllers/hqReportController';

const router = express.Router();

router.get('/sales', getHQSalesReport);

export default router;
