const express = require('express');
const app = express();
const mongoose = require('mongoose')
const errorHandler = require('./helpers/error-handler')
const session = require('express-session')
var cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const server = require("http").Server(app);
const io = require('socket.io')(server)
const bodyParser = require('body-parser')

const Coupon = require('./models/Coupon');

mongoose.connect('mongodb://localhost:27017/exam-project', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('db connected'));

// static middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyParser.json())

// add & configure middleware
app.use(cookieParser());

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

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});



const gameService = require('./services/game.service');
const betService = require('./services/bet.service');

io.on('connection', function (socket) {
    console.log('A client is connected!');
    socket.on('request-game', (gameId) => {
        gameService.findById(gameId).then(game => {
            socket.emit('initial-game', game)
        })
    })    

    socket.on('update-game', (gameId) => {
        gameService.findById(gameId).then(game => {
            socket.emit('updated-game', game)
        })
    })

    ////
    socket.on('request-coupon', (bets) => {
        console.log('called')
        const couponBets = []
        const ids = []
        
        if(bets !== null) {
            bets.forEach(bet => {
                ids.push(bet.id)
            })
        }

        if(ids.length > 0) {
            betService.findByIds(ids).then(foundBets => {
                // for(var i = 0; i < ids.length; i++) {
                //     console.log(bets)
                //     console.log(ids)
                // }
                var newBets = []
                foundBets.forEach(foundBet => {
                    // console.log(foundBet._id)
                    betChoice = bets.filter(bet => bet.id === foundBet._id.toString())
                        
                    const populatedBet = {
                        bet: foundBet,
                        choice: betChoice[0]
                    }
                    
                    newBets.push(populatedBet)
                })

                socket.emit('initial-coupon', newBets)
                // const betChoice = bets.find(bet => bet.id === foundBets._id)
            })
        }
        
       
        // socket.emit('updated-coupon', couponBets)
    })

    socket.on('disconnect', () => {
        console.log('A client is disconnected')
    })

    socket.on('update-coupon', (bets) => {
        const couponBets = []
        const ids = []
        
        if(bets !== null) {
            bets.forEach(bet => {
                ids.push(bet.id)
            })
        }

        if(ids.length > 0) {
            betService.findByIds(ids).then(foundBets => {
                // for(var i = 0; i < ids.length; i++) {
                //     console.log(bets)
                //     console.log(ids)
                // }
                var newBets = []
                foundBets.forEach(foundBet => {
                    // console.log(foundBet._id)
                    betChoice = bets.filter(bet => bet.id === foundBet._id.toString())
                        
                    const populatedBet = {
                        bet: foundBet,
                        choice: betChoice[0]
                    }
                    
                    newBets.push(populatedBet)
                })

                socket.emit('updated-coupon', newBets)
                // const betChoice = bets.find(bet => bet.id === foundBets._id)
            })
        }
    })

    socket.on('new-coupon', (coupon) => {
        // console.log(coupon)
        coupon.creator = socket.request.session.user

        const newCoupon = new Coupon(coupon)
        newCoupon.save().then(coupon => {
            socket.emit('created-coupon', coupon) 
        })

        console.log(newCoupon)
        // for(var i = 0; i < coupon.bets.length; i++) {

        // }
        // newCoupon.save().then(coupon => {
        //     socket.emit('created-coupon', coupon)
        // })
    })
});


// register routes
app.use('', require('./controllers/view.controller'))
app.use('/api/posts', require('./controllers/post.controller'))
app.use('/api/auth', require('./controllers/auth.controller'))
app.use('/api/games', require('./controllers/game.controller'))
app.use('/api/bets', require('./controllers/bet.controller'))

// global error handler
app.use(errorHandler);


const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Running on ${port}`))