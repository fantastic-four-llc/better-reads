const path = require('path');
const fs = require('fs');
const secrets = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../secrets/secrets.json')),
);
const MONGO_URI = secrets.mongoDBURI;

const mongoose = require('mongoose');

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

const { Schema } = mongoose;
// const subSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   genre: String,
//   summary: String,
//   review: Number,
// });

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  library: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'book' },
    },
  ],
});

const User = mongoose.model('user', userSchema);

const bookSchema = new Schema({
  username: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  summary: String,
  review: Number,
});

const Book = mongoose.model('book', bookSchema);

module.exports = { User, Book };
