const path = require('path');
require('dotenv').config();
const dbActions = require('../server/sql/dbActions');
const { pool } = require('../server/sql/connect');

describe('db unit tests', () => {
  beforeAll(async () => {
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
      result = await dbActions.addBook(
        newbook.title,
        newbook.author,
        newbook.genre,
      );
      expect({
        title: result.title,
        author: result.author,
        genre: result.genre,
      }).toEqual(newbook);
    });
  });
  afterAll(async () => {
    await pool.end();
  });
});
