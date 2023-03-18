const mongoose = require('mongoose');
const express = require('express');
const app = express();

// const Fawn = require('fawn');
// Fawn.init(mongoose);

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

mongoose
  .connect('mongodb://127.0.0.1:27017/vidly')
  .then(() => console.log('Connected to MongoDB....'))
  .catch((err) => console.log('Could not connect to MongoDB', err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
