import express from 'express';
import { updateUserRole } from '../controllers/userController';
import { getAllUsers } from '../controllers/userController';


const router = express.Router();

// 🔁 Add this line to allow admin to update user roles
router.patch('/:id/role', updateUserRole);
router.get('/', getAllUsers);

export default router;
