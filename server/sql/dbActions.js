const db = require('./connect');

dbActions = {};

dbActions.addBook = async (title, author, genre) => {
    const values = [title, author, genre];
    const query = `INSERT INTO books (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING book_id, title, author, genre;`;
    try {
        const result = await db.query(query, values);
    }
    catch(err){
        console.log('err: ', err);
    };
}