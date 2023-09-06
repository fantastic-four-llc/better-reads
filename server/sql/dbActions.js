const db = require('./connect');

dbActions = {};

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
  } catch (err) {
    console.log('err: ', err);
    return err;
  }
};
module.exports = dbActions;
