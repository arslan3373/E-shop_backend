import express from 'express';
import {
  getCategories,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getCategories).post(protect, admin, createCategory);
router.get('/all', protect, admin, getAllCategories);
router.route('/:id').get(getCategoryById).put(protect, admin, updateCategory).delete(protect, admin, deleteCategory);

export default router;
