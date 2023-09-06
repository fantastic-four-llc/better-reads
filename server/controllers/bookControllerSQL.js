const db = require('../models/sqlModels')

const bookControllerSQL = {};

//add book to database

bookControllerSQL.addBook = async (req, res, next) => {
    console.log(req.body)
    const { title, author, genre } = req.body;
    console.log({title, author, genre})
    const values = [title, author, genre];
    const query = `INSERT INTO books (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING book_id, title, author, genre;`;
    try {
        const result = await db.query(query);
        res.locals.newBook = result;
        console.log(res.locals)
        return next();
    }
    catch(err){
        console.log('err: ', err);
        return next(err);
    };
}


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