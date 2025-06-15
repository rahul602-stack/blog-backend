import express from 'express';
import { getAllDeliveries, updateDeliveryStatus } from '../controllers/deliveryController';

const router = express.Router();

router.get('/', getAllDeliveries);
router.put('/:deliveryId/status', updateDeliveryStatus);

export default router;
