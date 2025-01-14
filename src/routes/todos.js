const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Get all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find().sort({ timestamp: -1 });
    res.json(todos);
});

// Add a new todo
router.post('/', async (req, res) => {
    const newTodo = new Todo({
        task: req.body.task,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
});

// Update a todo (toggle completion)
router.patch('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('Todo not found');

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).send('Todo not found');

    res.status(204).send();
});

module.exports = router;
