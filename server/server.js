const path = require('path');
const express = require('express');

// require controllers
const userController = require('./controllers/userControllers');

const app = express();
const PORT = 3005;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../src')));

app.post('/', userController.createUser,(req, res) => {
   return res.status(200).json(res.locals.newUser);
})

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
