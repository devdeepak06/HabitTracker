// ----require ----//
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// ----environment----//
const env = require('./config/environment');
// ----database----//
const mongoose = require('./config/mongoose');

const app = express();
const port = process.env.port || 8000;

const session = require('express-session');
const passport = require('passport');
const LocalStretegy = require('./config/passport-local-stretegy');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// -----EJS----//
app.use(expressLayouts);
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.set("layout extractStyles", true);
app.set('layout extractScript', true);

// ----body Parser----//
app.use(express.urlencoded({ extended: false }));

// sessions
app.use(session({
    name: "habit_tracker",
    secret: 'RelbXzro0EGeHeOxiVW0CYPcHk0uCOwg',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));



// ----passport----//
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setflash);

// ----routes----//
app.use('/', require('./routes'))
app.listen(port, function(error) {
    if (error) {
        console.log("error to connect server", error);
        return;
    }
    console.log("Server is runing up port  no ", port);
});