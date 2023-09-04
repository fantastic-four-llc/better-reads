const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    // if property is required you don't necessarily need this if conditional
    return next({
      log: 'Missing username or password in userController.createUser',
      status: 400,
      message: { err: 'An error ocurred' },
    });
  }

  const hash = await bcrypt.hash(password, 10);

  User.create({ username, password: hash })
    .then(response => {
      res.locals.newUser = response;
      return next();
    })
    .catch(err =>
      next({
        log: 'Error in userController.createUser',
        status: 500,
        message: { err: 'An error ocurred' },
      }),
    );
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(async user => {
      if (!user) {
        // res.send('Incorrect username or password.')
        return next({
          log: 'Error occurred in userController.verifyUser',
          status: 401,
          message: { err: 'An error ocurred' },
        });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        // res.send('Incorrect username or password.')
        return next({
          log: 'Error occurred in userController.verifyUser',
          status: 401,
          message: { err: 'An error ocurred' },
        });
      }
      res.locals.user = user.username;
      //   console.log("successfully verified user")
      return next();
    })
    .catch(err =>
      next({
        log: 'Error occurred in userController.verifyUser',
        status: 500,
        message: { err: 'An error ocurred' },
      }),
    );
};

userController.findUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User was not found!');
    }
    res.locals.library = user.library;
    return next();
  } catch (err) {
    const error = {
      log: 'Error in findBook controller',
      status: 500,
      message: { err: 'Unable to find user. Try again later.' },
    };
    return next(error);
  }
};

userController.addBook = async (req, res, next) => {
  try {
    const { username, book } = req.body;
    const { library } = res.locals;
    console.log('library', library, 'book', book);
    const user = await User.findOneAndUpdate(
      { username },
      { library: [...library, book] },
      { new: true },
    );
    console.log('user library', user.library[0]);
    if (!user) {
      throw new Error('User was not found!');
    }
    res.locals.currentUser = user;
    return next();
  } catch (err) {
    const error = {
      log: 'Error in userController.addBook middleware',
      status: 500,
      message: { err: 'Unable to add book. Try again later.' },
    };
    return next(error);
  }
};

module.exports = userController;
