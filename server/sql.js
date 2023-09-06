const { Pool } = require('pg');
require('dotenv').config();
const PG_URL = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: PG_URL,
});

dbActions = {
    
};
//   pool.query(`CREATE TABLE IF NOT EXISTS lifts 
//   (id SERIAL PRIMARY KEY NOT NULL, // they will automatically populate this
//   lift VARCHAR(250) NOT NULL, 
//   reps INTEGER NOT NULL, 
//   weight INTEGER NOT NULL, 
//   rpe INTEGER, 
//   date TIMESTAMP,
//   userid INTEGER NOT NULL);`); //why two different ID's

/*
SQL database flow:
(logging in) → usernames table → friends table → friend books table → friend book comments
                        → username saved books → user saved books → user comments
*/

// user table:
    // serial id? [primary key]
    //username = STRING 
    //password = STRING

pool.query(`CREATE TABLE IF NOT EXISTS users 
(user_id SERIAL PRIMARY KEY NOT NULL,
username VARCHAR(250) NOT NULL UNIQUE,
password VARCHAR(250) NOT NULL);`);




// book table:
    // book id (serial) [primary key]
    // title
    // author
    // genre

pool.query(`CREATE TABLE IF NOT EXISTS books 
(book_id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(250) NOT NULL,
author VARCHAR(250) NOT NULL,
genre VARCHAR(250) NOT NULL);`);




// book review table (join)
    // user id [foreign key]
    // book id [foreign key]
    // rating
    // review

pool.query(`CREATE TABLE IF NOT EXISTS reviews 
(review_id SERIAL PRIMARY KEY NOT NULL,
user_id INT NOT NULL
book_id INT NOT NULL
rating INT NOT NULL
review TEXT
FOREIGN KEY(user_id) REFERENCES users(user_id)
FOREIGN KEY(book_id) REFERENCES books(book_id));`);

//follower table (join)
    // user1 id [foreign ]
    // user2 id [foreign ]

pool.query(`CREATE TABLE IF NOT EXISTS followers 
(follower_id SERIAL PRIMARY KEY NOT NULL,
user1_id INT NOT NULL
user2_id INT NOT NULL
FOREIGN KEY(user1_id) REFERENCES users(user_id)
FOREIGN KEY(user2_id) REFERENCES users(user_id));`);



    
// following users---> this is the join table between u1 and u2
// (potential question: do you need A -> B AND B -> A in two separate entries?)










// const query = `INSERT INTO lifts (lift, weight, reps, rpe, date, userid) 
// VALUES ($1, $2, $3, $4, $5, $6) 
// RETURNING id, lift, weight, reps, rpe, date`
// const values = [var1, var2, var3, var4, var5, var6]
// const result = await pool.query(
//     query,
//     values
//   );
  




  module.exports = dbActions;