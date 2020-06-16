$.getScript('/js/injector.js')

var gameId = window.location.pathname.substring(7)
var bets = []


$(document).ready(function () {
    const socket = io.connect("http://localhost:5000")

    socket.on('connect', () => {
        socket.emit('request-game', gameId)
    })

    socket.on('update-bets', () => {
        socket.emit('update-game', gameId)
    })

    socket.on('initial-game', function(game) {
        bets = game.bets;

        $('#game-header').text(`${game.home} v ${game.away}`);

        game.bets.forEach(bet => {
            if (bet.x) {
                $('#game-wrapper').hide().append(
                    `<div id="${bet._id}" class="game-content">
                        <p class="odds-header">${bet.type}</p>
                        <div class="bet-content">
                            <div id="0" class="bet-item">
                                <p><span>${bet.home.title ? bet.home.title : game.home}</span> <span class="odds">${bet.home.odds}</span></p>
                            </div>
                            <div id="1" class="bet-item">
                                <p><span>${bet.x.title ? bet.x.title : 'Draw'} </span> <span class="odds">${bet.x.odds}</span></p>
                            </div>
                            <div id="2" class="bet-item">
                                <p><span>${bet.away.title ? bet.away.title : game.away}</span> <span class="odds">${bet.away.odds}</span></p>
                            </div>
                        </div>
                    </div>`
                ).fadeIn(200)
            } else {
                $('#game-wrapper').hide().append(
                    `<div id="${bet._id}" class="game-content">
                        <p class="odds-header">${bet.type}</p>
                        <div class="bet-content">
                            <div id="0" class="bet-item-2">
                                <p>${bet.home.title ? bet.home.title : game.home} <span class="odds">${bet.home.odds}</span></p>
                            </div>
                            <div id="2" class="bet-item-2">
                                <p><span>${bet.away.title ? bet.away.title : game.away}</span> <span class="odds">${bet.away.odds}</span></p>
                            </div>
                        </div>
                    </div>`
                ).fadeIn(200)
            }
            
        })
    })

    socket.on('updated-game', function(game) {
        
        for(var i = 0; i < game.bets.length; i++) {
            const homeOdds = $(`#${bets[i]._id}`).find('.odds:eq(0)')
            const awayOdds = $(`#${bets[i]._id}`).find('.odds:eq(1)')
            const homeWrapper = homeOdds.parent().parent()
            const awayWrapper = awayOdds.parent().parent()

            if(bets[i].home.odds !== game.bets[i].home.odds) {
                homeWrapper.fadeOut(400)
                homeOdds.text(game.bets[i].home.odds)
                homeWrapper.fadeIn(400)
            } 
            
            if(bets[i].away.odds !== game.bets[i].away.odds) {
                awayWrapper.fadeOut(400)
                awayOdds.text(game.bets[i].away.odds)
                awayWrapper.fadeIn(400)
            }
        }
    })

    // var couponBets = JSON.parse(localStorage.getItem('coupon'))
    // if (couponBets.length !== null) renderCoupon(couponBets)



    $(document).on('click', '.bet-item-2, .bet-item', function (e) {
        betId = $(this).parent().parent().attr('id')
        betChoice = $(this).attr('id')

        bet = {
            choice: betChoice,
            id: betId
        }

        var currentBets = JSON.parse(localStorage.getItem("coupon"))

        if (currentBets === null) {
            currentBets = []
        }

        currentBets.push(bet)

        localStorage.setItem("coupon", JSON.stringify(currentBets))

        $('#game-message').append('<p>Bet added to coupon!<p>')
            .fadeIn(400)
            .delay(1500)
            .fadeOut(300, function() { 
                $(this).children().remove(); 
            })
        // $('#game-message').html('')
    })
    
})



