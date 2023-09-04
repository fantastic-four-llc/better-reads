const User = require('../models/userModels');
const path = require('path');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password) { // if property is required you don't necessarily need this if conditional
        return next({
            log: "Missing username or password in userController.createUser",
            status: 400,
            message: {err: 'An error ocurred'},
        });
    }

    const hash = await bcrypt.hash(password, 10)

    User.create({ username, password: hash})
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
    .then(async user => {
        if(!user) {
            res.send('Incorrect username.')
        } else {
            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                res.send('Incorrect password.')
            } else {
                res.locals.user = user.username;
                // console.log("successfully verified user")
                return next();
            }
        }
    })
    .catch(err => {
        return next({
            log: "Error occurred in userController.verifyUser",
            status: 500,
            message: {err: 'An error ocurred'},
        })
    })
    
}

module.exports = userController;