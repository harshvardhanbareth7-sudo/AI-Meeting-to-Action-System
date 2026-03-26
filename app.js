const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler.middleware');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ service: 'meeting-to-action-backend', status: 'ok' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

module.exports = { app };

