// const db = require('../models/sqlModels')
const dbActions = require('../sql/dbActions');

const bookControllerSQL = {};

//add book to database

bookControllerSQL.addBook = async (req, res, next) => {
    console.log('entered addBook controller');
    // console.log(req.body)
    const { title, author, genre } = req.body;
    console.log({title, author, genre})
    try {
        const result = await dbActions.addBook(title, author, genre);
        res.locals.newBook = result;
        console.log(res.locals.newBook);
        return next();
    }
    catch(err){
        console.log('err: ', err);
        return next(err);
    }
}

bookControllerSQL.updateBook = async (req, res, next) => {}

bookControllerSQL.getBooks = async (req, res, next) => {}

bookControllerSQL.getBook = async (req, res, next) => {}

bookControllerSQL.deleteBook = async (req, res, next) => {}


// book table:
    // book id (serial) [primary key]
    // title
    // author
    // genre

// const query = `INSERT INTO lifts (lift, weight, reps, rpe, date, userid) 
// VALUES ($1, $2, $3, $4, $5, $6) 
// RETURNING id, lift, weight, reps, rpe, date`
// const values = [var1, var2, var3, var4, var5, var6]
// const result = await pool.query(
//     query,
//     values
//   );

//STRETCH - edit book
//STRETCH - delete book

module.exports = bookControllerSQL;