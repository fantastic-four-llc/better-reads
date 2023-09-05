const path = require('path');
const Book = require('../models/bookModels');
const User = require('../models/userModels');

const bookController = {};

// bookController.console = (req, res, next) => {
//     console.log('entered request')
//     return next();
// }

bookController.addBook = async (req, res, next) => {
  try {
    // const {name} = req.params;
    const { username, title, author, genre, summary, review } = req.body;
    console.log(title, author, genre, summary, review);
    const newBook = await Book.create({
      username,
      title,
      author,
      genre,
      summary,
      review,
    });
    // * After logging in should user's username be stored as endpoint =>/dashboard/username
    // const person = await User.findOne({ username: name });
    // person.library.push(newBook);
    res.locals.newBook = newBook;
    return next();
  } catch (err) {
    const error = {
      log: 'Error in createBook controller',
      status: 500,
      message: { err: 'Unable to add book. Try again later.' },
    };
    return next(error);
  }
};

module.exports = bookController;
