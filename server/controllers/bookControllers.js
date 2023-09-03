const Book = require('../models/bookModels');
const path = require('path');

const bookController = {};

// bookController.console = (req, res, next) => {
//     console.log('entered request')
//     return next();
// }

bookController.addBook = async (req, res, next) => {
    try {
        console.log('hi');
        const { title, author, genre, summary, review } = req.body;
        console.log(title, author, genre, summary, review);
        const newBook = await Book.create({
            title,
            author,
            genre,
            summary,
            review
        });
        console.log(newBook);
        res.locals.newBook = newBook;
        return next();
    }
    catch (err) {
        const error = {
            log: 'Error in createBook controller',
            status: 500,
            message: { err: 'Unable to add book. Try again later.' },
        }
        return next(error);
    }
};

module.exports = bookController;