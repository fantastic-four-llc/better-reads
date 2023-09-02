const Book = require('../models/bookModels');

const bookController = {};

bookController.createBook = async (req, res, next) => {
    try {
        const newBook = await Book.create();
    }
    catch (err) {
        const error = {
            log: 'Error in createBook controller',
            status: 500,
            message: { err: 'An error occurred. RIP.' },
        }
        return next(error);
    }
};