const path = require('path');
const request = require('supertest');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const server = 'http://localhost:3005';
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
    console.log(await pool.query('select * from books'));
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
});
