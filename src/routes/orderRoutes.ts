import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  createOrder,
  updateOrderStatus,
  getKitchenOrders,
  getOrdersByCustomer
} from '../controllers/orderController';

const router = express.Router();

router.post('/', asyncHandler(createOrder));
router.put('/:orderId/status', asyncHandler(updateOrderStatus));
router.get('/kitchen', asyncHandler(getKitchenOrders));
router.get('/customer/:customerId', asyncHandler(getOrdersByCustomer));

export default router;
