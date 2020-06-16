
var total = 1
const socket = io.connect("http://localhost:5000")

    socket.on('connect', () => {
        // socket.emit('request-game', gameId)
        console.log('connected')
        const bets = JSON.parse(localStorage.getItem('coupon'))

        socket.emit('request-coupon', bets)
    })

    socket.on('update-bets', () => {
        const bets = JSON.parse(localStorage.getItem('coupon'))

        // $('.coupon-wrapper').html('')

        socket.emit('update-coupon', bets)
    })

    var oldBets = []

    socket.on('initial-coupon', (bets) => {
        console.log(bets)
        oldBets = bets
        // var total = 1;
        bets.forEach(bet => {
            if(Number(bet.choice.choice) === 0 ) {
                $('.coupon-wrapper').append(
                    `<div id="${bet.bet._id}" class="bet-wrapper">
                        <div class="bet-item">${bet.bet.type}</div>
                        <div class="bet-item">${bet.bet.game_id.home} v ${bet.bet.game_id.away}</div>
                        <div class="bet-item-sm">${bet.bet.home.title}</div>
                        <div class="bet-item-sm odds">${bet.bet.home.odds}</div>
                        <div id="delete">X</div>
                    </div>`)

                total = total * bet.bet.home.odds
            } else if(Number(bet.choice.choice) === 1 )  {
                $('.coupon-wrapper').append(
                    `<div id="${bet.bet._id}" class="bet-wrapper">
                        <div class="bet-item">${bet.bet.type}</div>
                        <div class="bet-item">${bet.bet.game_id.home} v ${bet.bet.game_id.away}</div>
                        <div class="bet-item-sm">${bet.bet.x.title}</div>
                        <div class="bet-item-sm odds">${bet.bet.x.odds}</div>
                        <div id="delete">X</div>
                    </div>`)
                total = total * bet.bet.x.odds

            } else if(Number(bet.choice.choice) === 2 ) {
                total = total * bet.bet.away.odds

                $('.coupon-wrapper').append(
                    `<div id="${bet.bet._id}" class="bet-wrapper">
                        <div class="bet-item">${bet.bet.type}</div>
                        <div class="bet-item">${bet.bet.game_id.home} v ${bet.bet.game_id.away}</div>
                        <div class="bet-item-sm">${bet.bet.away.title}</div>
                        <div class="bet-item-sm odds">${bet.bet.away.odds}</div>
                        <div id="delete">X</div>
                    </div>`)
            }

            console.log(total)
        })

        $('.total-wrapper').html(`<p>Total Odds: ${total}</p>`)
        console.log(oldBets.length)
        if(!oldBets.length > 0) {
            $('.input').css({ 'pointer-events: ': 'none'})
            $('.btn').css({ 'pointer-events: ': 'none'})

        }
    })

    socket.on('updated-coupon', (bets) => {
        // var total = 1;

        for(var i = 0; i < oldBets.length; i++) {
            const odds = $(`#${oldBets[i].bet.id}`).find('.odds');
            if(bets[i].bet.home.odds !== oldBets[i].bet.home.odds) {
                odds.fadeOut(400)
                odds.text(bets[i].bet.home.odds)
                odds.fadeIn(400)
            } else if(bets[i].bet.away.odds !== oldBets[i].bet.away.odds) {
                odds.fadeOut(400)
                odds.text(bets[i].bet.away.odds)
                odds.fadeIn(400)
            }

            total = total * Number(odds.html())
        }

        $('.total-wrapper').html(`<p>Total Odds: ${total}</p>`)

        oldBets = bets
    })

    socket.on('created-coupon', (coupon) => {
        $('.coupon-wrapper').html('')
        localStorage.removeItem('coupon')
        $('.total-wrapper').html(`<p>No bets added to coupon`)
        $('.coupon-wrapper').hide().append('<p style="font-size: 15px">Coupon added! Good Luck!<p>')
            .fadeIn(700)
            .delay(3000)
            .fadeOut(300)

    })

$(document).ready(function () {
    $.getScript('/js/injector.js')

    $(document).on('click', '#delete', function(){
        const betId = $(this).parent().attr('id')
        
        var localBets = JSON.parse(localStorage.getItem('coupon'))
        pos = localBets.map(function(e) { return e.id; }).indexOf(betId);
        
        localBets.splice(pos, 1);
        localStorage.setItem('coupon', JSON.stringify(localBets))

        $(this).parent().remove()
        location.reload()
        // socket.emit('request-coupon', localBets)
    });

    $(document).on('click', '.btn', function(){
        var joinedBets = []
        for(var i = 0; i < oldBets.length; i++) {
            var bet = {}
            bet.bet = oldBets[i].bet
            bet.bet.choice = oldBets[i].choice.choice

            joinedBets.push(bet)
        }

        
        const coupon = {
            bets: joinedBets,
            total: total,
            amount: 100
        }
        socket.emit('new-coupon', coupon)
        // socket.emit('request-coupon', localBets)
    });

    $(document).on('keyup', '#test', function(e) {
        if(!e.target.value > 0) {
            $('.btn').css({'pointer-events': 'none'});
        } else {
            $('.btn').css({'pointer-events': 'auto'});

        }
    })
    
})



