const express = require('express');
const Todo = require('../controller/todo.controller');
const todoRouter = express.Router();

todoRouter.get('/', (req, res) => {
    res.json(Todo.getAll());
});

todoRouter.get('/:id', (req, res) => {
    res.json(Todo.getTask(req.params.id));
});

todoRouter.post('/', (req, res) => {
    res.json(Todo.addTask(req.body.text, req.body.important, req.body.color));
});

todoRouter.put('/:id', (req, res) => {
    res.json(Todo.editTask(req.params.id, req.body.text, req.body.important, req.body.done, req.body.color));
});

todoRouter.delete('/:id', (req, res) => {
    res.json(Todo.removeTask(req.params.id));
});

module.exports = todoRouter