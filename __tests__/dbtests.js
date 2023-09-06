const path = require('path');
require('dotenv').config();
const dbActions = require('../server/sql/dbActions');
const { pool, createTables } = require('../server/sql/connect');

describe('db unit tests', () => {
  beforeAll(async () => {
    await pool.query('drop table IF EXISTS users Cascade');
    await pool.query('drop table IF EXISTS reviews Cascade');
    await pool.query('drop table IF EXISTS followers Cascade');
    await pool.query('drop table IF EXISTS books Cascade');
    await createTables();
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
      book = result;
      book.title = 'Dawnshard';
      const result2 = await dbActions.updateBook(book);
      expect(result2).toEqual(book);
    });
  });
  afterAll(async () => {
    await pool.end();
  });
});
