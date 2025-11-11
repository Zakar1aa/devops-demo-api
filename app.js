const express = require('express');
const bodyParser = require('body-parser');
const itemsRouter = require('./routes/items');

const app = express();
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'DevOps Demo API', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/items', itemsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
