const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', todoSchema, 'todoDb');
