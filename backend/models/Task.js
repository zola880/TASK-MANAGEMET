const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },   
  dueDate: { type: Date },
  attachment: {
    filename: String,
    originalName: String,
    path: String,
    mimetype: String,
    size: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);