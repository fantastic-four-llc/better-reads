const db = require('./connect');
const bcrypt = require('bcryptjs')
dbActions = {};
//get book?

dbActions.addBook = async (title, author, genre) => {
    const values = [title, author, genre];
    const query = `INSERT INTO books (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING book_id, title, author, genre;`;
    try {
        const result = await db.query(query, values);
        // console.log('response: ', result);
        // console.log('response type: ', typeof result);
        // console.log('response.rows: ', result.rows);
        // console.log('response.rows[0]: ', result.rows[0]);
        return result.rows[0];
    }
    catch(err){
        console.log('err: ', err);
        return err;
    };
}

//update book
// req.body - book id
dbActions.updateBook = async (payload, ...state) => { //Update author, genre, or title
    const values = [...state];
    const query = `UPDATE books (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING book_id, title, author, genre;`;
    try {
        const result = await db.query(query, values);
        // console.log('response: ', result);
        // console.log('response type: ', typeof result);
        // console.log('response.rows: ', result.rows);
        // console.log('response.rows[0]: ', result.rows[0]);
        return result.rows[0];
    }
    catch(err){
        err = 'error caught in updateBook middleware';
        console.log('err: ', err);
        return err;
    };
}

//delete book
dbActions.deleteBook = async (title, author) => {
    const values = [title, author];
    const query = `DELETE books (title, author)
    VALUES ($1, $2)
    RETURNING book_id, title, author;`;
    try {
        const result = await db.query(query, values);
        // console.log('response: ', result);
        // console.log('response type: ', typeof result);
        // console.log('response.rows: ', result.rows);
        // console.log('response.rows[0]: ', result.rows[0]);
        return result.rows[0];
    }
    catch(err){
        err = 'error caught in deleteBook middleware';
        console.log('err: ', err);
        return err;
    };
}
//*profile handling
//add Profile //login functionality? //pass in library or saved books?
dbActions.addProfile = async (username, password) => {
    const values = [username, password];
    const query = `INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING user_id, username, password;`;
    try {
        const result = await db.query(query, values);
        // console.log('response: ', result);
        // console.log('response type: ', typeof result);
        // console.log('response.rows: ', result.rows);
        // console.log('response.rows[0]: ', result.rows[0]);
        return result.rows[0];
    }
    catch(err){
        console.log('err: ', err);
        return err;
    };
}

//search profile
//update profile
//delete profile
//add friend/ follower
//delete friend

//*review handling
//add review
//edit review
//get review
//delete review


dbActions
module.exports = dbActions;