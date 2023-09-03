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

userController.verifyUser = (req, res, next) => {
    const {username, password} = req.body;

    User.findOne({username})
    .then(user => {
        if(user.password === password) {
            res.locals.user = user;
            return next();
        } else {
            return next({
                log: "Incorrect username or password in userController.createUser",
                status: 400,
                message: {err: 'Incorrect username or password in userController.createUser'},
            })
        }
    })
    .catch(err => {
        return next({
            log: "Error occurred in userController.verifyUser",
            status: 500,
            message: {err: 'An error ocurred'},
        });
    })
    
}

module.exports = userController;