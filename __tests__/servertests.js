const path = require('path');
const request = require('supertest');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const server = 'http://localhost:3005';
const db = require('../server/sql/connect');
require('dotenv').config();

describe('server unit tests', () => {
  beforeAll(async () => {
    let PG_URL;
    if (process.env.NODE_ENV === 'test') {
      PG_URL = process.env.TESTDATABASE_URL;
    } else {
      PG_URL = process.env.DATABASE_URL;
    }
    const pool = new Pool({
      connectionString: PG_URL,
    });
    await pool.query('delete from users where 1=1');
    await pool.query('delete from reviews where 1=1');
    await pool.query('delete from followers where 1=1');
    await pool.query('delete from books where 1=1');
    pool.end();
  });
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 satus and text/html content type', done => {
        request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });
  });
  afterAll(done => {
    db.end().then(done());
  });
});
