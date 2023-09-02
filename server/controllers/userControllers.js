const User = require('../models/userModels');
const path = require('path');

const userController = {};

userController.createUser = (req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password) { // if property is required you don't necessarily need this if conditional
        return next({
            log: "Missing username or password in userController.createUser",
            status: 400,
            message: {err: 'An error ocurred'},
        });
    }

    User.create({ username, password})
    .then(response => {
        res.locals.newUser = response;
        return next();
    })
    .catch(err =>{
        return next ({
            log: "Error in userController.createUser",
            status: 500,
            message: {err: 'An error ocurred'},
        })
    })
    
}

module.exports = userController;