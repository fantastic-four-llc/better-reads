const dbActions = require('../sql/dbActions');

const userControllerSQL = {};

userControllerSQL.createUser = async (req, res, next) => {
    console.log('entered createUser controller');
    // console.log(req.body)
    const { username, password } = req.body;
    console.log({ username, password })
    try {
        const result = await dbActions.createUser(username, password);
        res.locals.newUser = result;
        console.log(res.locals.newUser);
        return next();
    }
    catch(err){
        err = 'error found at userControllerSQL createUser middleware'
        console.log('err: ', err);
        return next(err);
    }
}

userControllerSQL.userAuth = async (username, password) => {
    console.log('undergoing user authentication');
    const { username, password } = req.body;
    try {
        const result = await dbActions.verifyUser(username, password);
        res.locals.authentication = result;
        console.log(res.locals.authentication);
        return next();
    }
}

module.exports = userControllerSQL;