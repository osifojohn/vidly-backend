const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { genreSchema } = require('./genres');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      trim: true,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
    },
    dailyRental: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRental: Joi.number().required(),
  });

  return schema.validate(movie, { abortEarly: false });
}

exports.Movie = Movie;
exports.validate = validateMovie;
