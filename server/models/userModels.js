const mongoose = require('mongoose');

const MONGO_URI = DATABASE_URI;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'betterReads',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
    bycript.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
        if(err) return next(err);
        
        this.password = hash;

        return next();
    })
});

const User = mongoose.model('user', userSchema);

module.exports = User;