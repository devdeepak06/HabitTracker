const env = require('./environment');
const mongoose = require("mongoose");

require('dotenv').config();
mongoose.set('strictQuery', false);

mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function() {
    // we're connected !
    console.log('Connected to Database :: MongoDB');
});


mongoose.connect(process.env.db).then(() => { console.log("Database connected succesfully") }).
catch((err) => {
    console.log("Not connected database");

})