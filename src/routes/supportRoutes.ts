import express from 'express';
import { createSupportTicket, getAllSupportTickets, updateTicketStatus } from '../controllers/supportController';

const router = express.Router();

router.post('/', createSupportTicket);
router.get('/', getAllSupportTickets);
router.patch('/:ticketId/status', updateTicketStatus);

export default router;
