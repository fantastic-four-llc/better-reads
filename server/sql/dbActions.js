const db = require('./connect');
const bcrypt = require('bcryptjs')
dbActions = {};
//get book?

dbActions.addBook = async (title, author, genre) => {
    const values = [title, author, genre];
    const query = `INSERT INTO books (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING book_id, title, author, genre;`;
    const result = await db.query(query, values);
        // console.log('response: ', result);
        // console.log('response type: ', typeof result);
        // console.log('response.rows: ', result.rows);
        // console.log('response.rows[0]: ', result.rows[0]);
    return result.rows[0];
}

dbActions.getBooks = async () => {
    const query = `SELECT * FROM books;`;
    const result = await db.query(query);
    return result.rows;
}

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE some_column = some_value;

// send an object like this: { book_id, title, author, genre }
// UPDATE books
// SET title = $2, author = $3, genre = $4
// WHERE book_id = $1


//update book
// req.body - book id
dbActions.updateBook = async (book_id, title, author, genre) => { //Update author, genre, or title
    const values = [book_id, title, author, genre];
    const query = `UPDATE books
    SET title = $2, author = $3, genre = $4
    WHERE book_id = $1
    RETURNING book_id, title, author, genre;`;
    const result = await db.query(query, values);
    // console.log('response: ', result);
    // console.log('response type: ', typeof result);
    // console.log('response.rows: ', result.rows);
    // console.log('response.rows[0]: ', result.rows[0]);
    return result.rows[0];
}

//delete book
dbActions.deleteBook = async (book_id) => {
    const values = [book_id];
    const query = `DELETE from books
    WHERE book_id = $1;`;
    const result = await db.query(query, values);
    // console.log('response: ', result);
    // console.log('response type: ', typeof result);
    // console.log('response.rows: ', result.rows);
    // console.log('response.rows[0]: ', result.rows[0]);
    return `${values} has been deleted.`

}
//*profile handling
//add Profile //login functionality? //pass in library or saved books?
dbActions.createUser = async (username, password) => {
    if (!username || !password) {
        return {
          log: 'Missing username or password in userController.createUser',
          status: 400,
          message: { err: 'An error ocurred' },
        };
    }
    const hash = await bcrypt.hash(password, 10);

    const values = [username, hash];

    const query = `INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING user_id, username, password;`;
    const result = await db.query(query, values);
    return result.rows[0];
}

// login (verify user) ***
// returns userID for success, nothing for failure
dbActions.verifyUser = async (username, password) => {
    if (!username || !password) {
        console.log("Missing username and/or password")
        return;
    }

    const values = [username];

    const query = `SELECT user_id, password FROM users
    WHERE username = $1`;

    const result = await db.query(query, values);

    if (result.rows.length === 0){
        console.log("Username not found.")
        return;
    }

    const userID = result.rows[0].user_id
    const dbPassword = result.rows[0].password;
    const isValid = await bcrypt.compare(password, dbPassword);

    if (isValid){
        console.log("Username/password match!");
        return userID;
    }
    else {
        console.log("Username/password mismatch!");
        return;
    }
}

dbActions.getUsers = async () => {
    const query = `SELECT * FROM users;`;
    const result = await db.query(query);
    return result.rows;
}

//add review ***
dbActions.addReview = async (user_id, book_id, rating, review) => {
    const values = [user_id, book_id, rating, review];
    // if user_id, book_id don't match the user/book databases, will throw error?
    const query = `INSERT INTO reviews (user_id, book_id, rating, review)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, book_id, rating, review;`;
    const result = await db.query(query, values);
        // console.log('response: ', result);
        // console.log('response type: ', typeof result);
        // console.log('response.rows: ', result.rows);
        // console.log('response.rows[0]: ', result.rows[0]);
    return result.rows[0];
}


//STRETCH:
//search profile 
//add follower
//unfollow
//edit review
//get review
//delete review
//update profile 
//delete profile


dbActions
module.exports = dbActions;