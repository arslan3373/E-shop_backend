import express from 'express';
import { getAllUsers, deleteUser, updateUserRole, getDashboardStats } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, admin);

router.get('/stats', getDashboardStats);
router.route('/users').get(getAllUsers);
router.route('/users/:id').delete(deleteUser).put(updateUserRole);

export default router;
