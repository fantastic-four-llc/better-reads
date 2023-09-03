const path = require('path');
const express = require('express');

// require controllers
const userController = require('./controllers/userControllers');
const bookController = require('./controllers/bookControllers');
const { restart } = require('nodemon');

const app = express();
const PORT = 3005;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../src')));

// create a new user
app.post('/signup', userController.createUser,(req, res) => {
   return res.status(200).json(res.locals.newUser);
});

// login
app.post('/login', userController.verifyUser, (req, res) => {
    return res.status(200).json(res.locals.user);
});

// add book to dashboard
app.post('/dashboard', bookController.console, bookController.addBook, (req, res) => {
    return res.status(200).json(res.locals.newBook);
});

// catch all
app.use('*', (req, res) => {
    res.sendStatus(404).send('What the dog doin?');
});

// global error handler
app.use((err, req, res, next) => {
    const defaultError = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred. RIP.' },
    };
    const errorObj = Object.assign({}, defaultError, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
