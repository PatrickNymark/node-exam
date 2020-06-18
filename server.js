const express = require('express');
const app = express();
const mongoose = require('mongoose')
const errorHandler = require('./middleware/error-handler')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const server = require("http").Server(app);
const io = require('socket.io')(server)
const bodyParser = require('body-parser')


/* database connection */
mongoose.connect('mongodb://localhost:27017/exam-project', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('db connected'));

// static middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyParser.json())

// express session middleware
const sessionMiddleware = session({
    key: 'user_id',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
})


app.use(sessionMiddleware);

app.use(function(req, res, next) {
    req.io = io
    next()
})

// require socketio listeners
require('./middleware/socketio')(io)

// setup sessions with socketio
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

// register routes
app.use('', require('./controllers/view.controller'))
app.use('/api/auth', require('./controllers/auth.controller'))
app.use('/api/games', require('./controllers/game.controller'))
app.use('/api/bets', require('./controllers/bet.controller'))
app.use('/api/coupons', require('./controllers/coupon.controller'))
app.use('/api/users', require('./controllers/user.controller'))

// global error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Running on ${port}`))