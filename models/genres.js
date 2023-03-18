const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

// const Genre = mongoose.model(
//   'Genre',
//   new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//       minlength: 5,
//       maxlength: 50,
//     },
//   })
// );

function validateGenre(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(user, { abortEarly: false });
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
