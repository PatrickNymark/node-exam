const express = require('express');
const app = express();
const mongoose = require('mongoose')
const errorHandler = require('./helpers/error-handler')
const session = require('express-session')
var cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost:27017/exam-project', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('db connected'));

// static middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// add & configure middleware
app.use(cookieParser());

// express session middleware
app.use(session({
    key: 'user_id',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}));

// register routes
app.use('', require('./controllers/view.controller'))
app.use('/api/posts', require('./controllers/post.controller'))
app.use('/api/auth', require('./controllers/auth.controller'))

// global error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on ${port}`))