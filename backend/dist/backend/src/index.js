"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
let todos = [
    { id: 1, title: 'Découvrir NG ZORRO', done: false },
    { id: 2, title: 'Brancher le front', done: false }
];
app.get('/api/todos', (_req, res) => res.json(todos));
app.post('/api/todos', (req, res) => {
    const nextId = Math.max(0, ...todos.map(t => t.id)) + 1;
    const todo = { id: nextId, title: String(req.body?.title ?? ''), done: false };
    todos.push(todo);
    res.status(201).json(todo);
});
app.patch('/api/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = todos.findIndex(t => t.id === id);
    if (idx < 0)
        return res.sendStatus(404);
    todos[idx] = { ...todos[idx], ...req.body };
    res.json(todos[idx]);
});
app.delete('/api/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.sendStatus(204);
});
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
