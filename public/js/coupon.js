
const socket = io.connect("http://localhost:5000")

/* open connection to recieve update bets from bets stored in localstorage  */
socket.on('connect', () => {
    const bets = getFromStorage()

    socket.emit('request-coupon', bets, true)
})

/* emitted from the server when a bet is updated */
socket.on('update-bets', () => {
    const bets = getFromStorage()
    socket.emit('request-coupon', bets, false)
})


/* used to store most recent update to check which require update*/
var oldBets = []

/* used to store total odds value of added bets  */
var total = 1

/* emitted on initial load to build the dom */
socket.on('initial-coupon', (bets) => {
    oldBets = bets

    // if no bets - disable button
    verifyBets(bets, 0)

    bets.forEach(joinedBets => {
        const bet = joinedBets.bet
        const choice = joinedBets.choice

        switch(Number(choice.choice)) {
            case 0:
                $('.coupon-wrapper').append(
                    `<div id="${bet._id}" class="bet-wrapper">
                        <div class="bet-item">${bet.type}</div>
                        <div class="bet-item">${bet.game_id.home} v ${bet.game_id.away}</div>
                        <div class="bet-item-sm">${bet.home.title}</div>
                        <div class="bet-item-sm odds">${bet.home.odds}</div>
                        <div id="delete">X</div>
                    </div>`)

                total = total * bet.home.odds
                break;

            case 1:
                $('.coupon-wrapper').append(
                    `<div id="${bet._id}" class="bet-wrapper">
                        <div class="bet-item">${bet.type}</div>
                        <div class="bet-item">${bet.game_id.home} v ${bet.game_id.away}</div>
                        <div class="bet-item-sm">${bet.x.title}</div>
                        <div class="bet-item-sm odds">${bet.x.odds}</div>
                        <div id="delete">X</div>
                    </div>`)

                total = total * bet.x.odds
                break;

            case 2:
                $('.coupon-wrapper').append(
                    `<div id="${bet._id}" class="bet-wrapper">
                        <div class="bet-item">${bet.type}</div>
                        <div class="bet-item">${bet.game_id.home} v ${bet.game_id.away}</div>
                        <div class="bet-item-sm">${bet.away.title}</div>
                        <div class="bet-item-sm odds">${bet.away.odds}</div>
                        <div id="delete">X</div>
                    </div>`)

                total = total * bet.away.odds
                break;

            default: 
                break;

        }
    })

    $('.total-wrapper').html(`<p>Total Odds: ${total.toFixed(2)}</p>`)

})

/* called after an update on a bet to manipulate and animate the changed state*/
socket.on('updated-coupon', (bets) => {
    total = 1;

    verifyBets(bets, 0)

    for(var i = 0; i < oldBets.length; i++) {
        const odds = $(`#${oldBets[i].bet._id}`).find('.odds');

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

    $('.total-wrapper').fadeOut(400).html(`<p>Total Odds: ${total.toFixed(2)}</p>`).fadeIn(400)
    oldBets = bets
})

/* emitted after succesfully creating a coupon */
socket.on('created-coupon', (coupon) => {
    $('.coupon-wrapper').html('')

    localStorage.removeItem('coupon')

    $('.total-wrapper').html(`<p>No bets added to coupon`)
    $('.coupon-wrapper').hide().append('<p id="message" style="font-size: 15px">Coupon added! Good Luck!<p>')
        .fadeIn(700)
        .delay(3000)
        .fadeOut(300)

})

$(document).ready(function () {
    $.getScript('/js/injector.js')

    /* delete bet from coupon */
    $(document).on('click', '#delete', function(){
        const betId = $(this).parent().attr('id')
        
        var localBets = JSON.parse(localStorage.getItem('coupon'))
        pos = localBets.map(function(e) { return e.id; }).indexOf(betId);
        
        localBets.splice(pos, 1);
        localStorage.setItem('coupon', JSON.stringify(localBets))

        $(this).parent().remove()
        /* reload to update dom with bets from localstorage */
        location.reload()
    });

    /* submit bet */
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
    });

    /* disable submit button when amount is less than or equal to 0 */
    $(document).on('keyup', '#test', function(e) {
        // if(!e.target.value > 0) {
            verifyBets(oldBets, e.target.value)
        //     $('.btn').css({'pointer-events': 'none'});
        // } else {
        //     $('.btn').css({'pointer-events': 'auto'});

        // }
    })
    
})

function addToStorage(bets) {
    localStorage.setItem("coupon", JSON.stringify(bets))
}

function getFromStorage() {
    return JSON.parse(localStorage.getItem("coupon"))
}

function verifyBets(bets, value) {
    if((bets && !bets.length > 0) || (value && !value > 0)) {
        $('.btn').css({'pointer-events': 'none'});
    } else {
        $('.btn').css({'pointer-events': 'auto'});
    }   
}



