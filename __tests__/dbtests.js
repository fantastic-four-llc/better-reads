const path = require('path');
require('dotenv').config();
const dbActions = require('../server/sql/dbActions');
const { pool, createTables } = require('../server/sql/connect');

describe('db unit tests', () => {
  beforeAll(async () => {
    await createTables();
    await pool.query('delete from users where 1=1');
    await pool.query('delete from reviews where 1=1');
    await pool.query('delete from followers where 1=1');
    await pool.query('delete from books where 1=1');
  });

  describe('SQL unit tests', () => {
    it('add book functionality', async () => {
      const newbook = {
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };
      result = await dbActions.addBook(newbook);
      expect({
        title: result.title,
        author: result.author,
        genre: result.genre,
      }).toEqual(newbook);
    });
    it('update book functionality', async () => {
      const newbook = {
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };
      const result = await dbActions.addBook(newbook);
      book = result.rows[0];
      book.title = 'Dawnshard';
      const result2 = await dbActions.updateBook(book.title);
    });
  });
  afterAll(async () => {
    await pool.query('drop table users Cascade');
    await pool.query('drop table reviews Cascade');
    await pool.query('drop table followers Cascade');
    await pool.query('drop table books Cascade');
    await pool.end();
  });
});
