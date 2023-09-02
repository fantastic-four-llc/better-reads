const mongoose = require('mongoose');

const MONGO_URI = DATABASE_URI;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'betterreads',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: {type: String,},
    genre: ,
    summary: ,
    review ,
})