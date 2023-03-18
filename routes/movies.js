const express = require('express');
const router = express.Router();

const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genres');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send('Invalid movie');
  }
  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRental: req.body.dailyRental,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
  });
  await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRental: req.body.dailyRental,
    },
    { new: true }
  );

  if (!movie) {
    return res.status(400).send('The movie with the qiven id was not found');
  }
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.genreId);
  if (!movie) {
    res.status(400).send('The movie with the qiven id was not found');
    return;
  }

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.genreId);
  if (!movie) {
    res.status(400).send('The movie with the qiven id was not found');
    return;
  }
  res.send(movie);
});

module.exports = router;
