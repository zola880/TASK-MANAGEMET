const express = require('express');
const {
  createTask,
  updateTask,
  getTasks,
  getTasksByUser,
  getTaskById,
  deleteTask          // 👈 import the new function
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', protect, authorize('admin'), upload.single('attachment'), createTask);
router.put('/:id', protect, upload.single('attachment'), updateTask);
router.get('/', protect, getTasks);
router.get('/user/:userId', protect, authorize('admin'), getTasksByUser);
router.get('/:id', protect, getTaskById);


router.delete('/:id', protect, authorize('admin'), deleteTask);

module.exports = router;