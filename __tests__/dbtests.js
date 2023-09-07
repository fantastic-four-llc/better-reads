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
        title: 'Words of Radiance',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };

      const result = await dbActions.addBook(newbook);
      book = result;
      book.title = 'Dawnshard';

      const result2 = await dbActions.updateBook(book);
      expect(result2).toEqual(book);
    });

    it('delete book functionality', async () => {
      const newbook = {
        title: 'Oathbringer',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };

      const result = await dbActions.addBook(newbook);
      expect(result.book_id).not.toEqual(undefined);

      const result2 = await dbActions.deleteBook(result);
      const result3 = await dbActions.getBook(result);
      expect(result3[0]).toEqual(undefined);
    });

    it('testing for sql injection on getbook', async () => {
      const normalbook = {
        title: 'Rhythm of War',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };

      await dbActions.addBook(normalbook);

      const maliciousbook = {
        title: 'Rhythm of War',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        '; drop table books;--': '; drop table books;--Get ReKt',
      };

      result = await dbActions.getBook(maliciousbook);
      expect(result[0]).toEqual({ ...normalbook, book_id: result[0].book_id });
    });

    it('testing getting book by author', async () => {
      const bookquery = { author: 'Brandon Sanderson' };

      await dbActions.addBook({
        title: 'Name of the Wind',
        author: 'Patrick Rothfuss',
        genre: 'Fantasy',
      });
      await dbActions.addBook({
        title: 'Words of Radiance',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });

      const result = await dbActions.getBook(bookquery);

      expect(result[0]).toEqual({
        book_id: 1,
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
      expect(result[1]).toEqual({
        book_id: 2,
        title: 'Dawnshard',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
      expect(result[2]).toEqual({
        book_id: 4,
        title: 'Rhythm of War',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
      expect(result[3]).toEqual({
        book_id: 6,
        title: 'Words of Radiance',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
    });

    it('test create new user and verify user', async () => {
      const newuser = {
        username: 'Nate',
        password: 'hunter2',
      };
      const result = await dbActions.createUser(newuser);
      expect(result.username).toEqual(newuser.username);
      expect(result.password).not.toEqual(newuser.password);
      const result2 = await dbActions.verifyUser(newuser);
      expect(result2).not.toEqual(undefined);
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});
