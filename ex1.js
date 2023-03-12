const mongoose = require('mongoose');
const express = require('express');
const app = express();

const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);

mongoose
  .connect('mongodb://127.0.0.1:27017/vidly')
  .then(() => console.log('Connected to MongoDB....'))
  .catch((err) => console.log('Could not connect to MongoDB', err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
