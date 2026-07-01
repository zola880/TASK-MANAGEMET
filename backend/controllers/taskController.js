const Task = require('../models/Task');

// @desc    Create task (Admin)
// @route   POST /api/tasks
// @access  Private/Admin
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo, dueDate } = req.body;
    const taskData = {
      title,
      description,
      priority,
      status,
      assignedTo,
      dueDate,
      team: req.user.team._id   // 👈 team scoping
    };

    if (req.file) {
      taskData.attachment = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size
      };
    }

    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task (Admin full update, Member can update status + attachment)
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Ensure task belongs to the user's team
    if (task.team.toString() !== req.user.team._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role === 'admin') {
      const { title, description, priority, status, assignedTo, dueDate } = req.body;
      if (title) task.title = title;
      if (description) task.description = description;
      if (priority) task.priority = priority;
      if (status) task.status = status;
      if (assignedTo) task.assignedTo = assignedTo;
      if (dueDate) task.dueDate = dueDate;

      if (req.file) {
        task.attachment = {
          filename: req.file.filename,
          originalName: req.file.originalname,
          path: req.file.path,
          mimetype: req.file.mimetype,
          size: req.file.size
        };
      }
    } else {
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this task' });
      }
      const { status } = req.body;
      if (status) task.status = status;

      if (req.file) {
        task.attachment = {
          filename: req.file.filename,
          originalName: req.file.originalname,
          path: req.file.path,
          mimetype: req.file.mimetype,
          size: req.file.size
        };
      }
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks (Admin sees all in team, member sees only assigned in team)
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    let filter = { team: req.user.team._id };
    if (req.user.role !== 'admin') {
      filter.assignedTo = req.user._id;
    }
    const tasks = await Task.find(filter).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get tasks by assigned user (Admin, within team)
// @route   GET /api/tasks/user/:userId
// @access  Private/Admin
exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.params.userId,
      team: req.user.team._id
    }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Ensure task belongs to the user's team
    if (task.team.toString() !== req.user.team._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role !== 'admin' && task.assignedTo._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this task' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete task (Admin only)
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Ensure task belongs to the user's team
    if (task.team.toString() !== req.user.team._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete tasks' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};