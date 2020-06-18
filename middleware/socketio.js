const gameService = require('../services/game.service');
const betService = require('../services/bet.service');
const couponService = require('../services/coupon.service');

module.exports = function(socket) {
    socket.on('connection', function (socket) {
        
        socket.on('request-game', (gameId, initial) => {
            gameService.findById(gameId).then(game => {
                if(initial) {
                    socket.emit('initial-game', game)
                } else {
                    socket.emit('updated-game', game)
                }
            })
        })    
    
        socket.on('request-coupon', (bets, initial) => {
            const ids = []
            
            if(bets !== null) {
                bets.forEach(bet => {
                    ids.push(bet.id)
                })
            }

            if(ids.length > 0) {
                betService.findByIds(ids).then(foundBets => {
                    var newBets = []

                    foundBets.forEach(foundBet => {
                        betChoice = bets.filter(bet => bet.id === foundBet._id.toString())
                            
                        const populatedBet = {
                            bet: foundBet,
                            choice: betChoice[0]
                        }
                        
                        newBets.push(populatedBet)
                    })

                    if(initial) {
                        socket.emit('initial-coupon', newBets)
                    } else {
                        socket.emit('updated-coupon', newBets)
                    }
                })
            }
            
        })

        socket.on('new-coupon', (coupon) => {
            coupon.creator = socket.request.session.user

            couponService.create(coupon)
                .then(coupon => socket.emit('created-coupon', coupon))

        })

        socket.on('request-active-coupons', () => {
            var user = socket.request.session.user

            couponService.findActiveByUser(user).then(coupons => {
                socket.emit('requested-active-coupons', coupons)
            })
        })

        socket.on('request-updated-coupons', () => {
            var user = socket.request.session.user

            couponService.findActiveByUser(user).then(coupons => {
                socket.emit('requested-updated-coupons', coupons)
            })
        })
    })
};