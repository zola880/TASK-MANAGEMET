const express = require('express');
const { createTask, updateTask, getTasks, getTasksByUser, getTaskById } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', protect, authorize('admin'), upload.single('attachment'), createTask);
router.put('/:id', protect, upload.single('attachment'), updateTask);
router.get('/', protect, getTasks);
router.get('/user/:userId', protect, authorize('admin'), getTasksByUser);
router.get('/:id', protect, getTaskById);

module.exports = router;