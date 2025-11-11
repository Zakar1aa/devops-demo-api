const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let items = [];

router.get('/', (req, res) => {
  res.json(items);
});

router.post('/', (req, res) => {
  const { name, qty } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const item = { id: uuidv4(), name, qty: qty || 1, createdAt: new Date().toISOString() };
  items.push(item);
  res.status(201).json(item);
});

router.get('/:id', (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
});

router.delete('/:id', (req, res) => {
  const before = items.length;
  items = items.filter(i => i.id !== req.params.id);
  if (before === items.length) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});

// Reset (for tests)
if (process.env.NODE_ENV === 'test') {
  router.post('/__reset', (req, res) => {
    items = [];
    res.status(204).send();
  });
}

module.exports = router;
