$.getScript('/js/injector.js')

var url = window.location
const socket = io.connect(`http://${url.hostname}:5000`)

var oldActiveCoupons = []

/* open connection to recieve update bets from bets stored in localstorage  */
socket.on('connect', () => {
    socket.emit('request-active-coupons', true)
})

/* emitted from the server when a bet is updated */
socket.on('requested-active-coupons', (coupons) => {
    buildDom(coupons, true)
})

socket.on('update-coupons', () => {
    socket.emit('request-updated-coupons', false)
})

socket.on('requested-updated-coupons', (coupons) => {
    console.log('called')
    buildDom(coupons, false)
})

function buildDom(coupons, initial) {
    if(!initial) $('.active-coupon-wrapper').html('');
    oldActiveCoupons = coupons

    for(var i = 0; i < coupons.length; i++) {
        var date = moment(coupons[i].createdAt).format('DD/MM/YYYY HH:mm:ss');
        $('.active-coupon-wrapper').append(
            `<div id="${coupons[i]._id}" class="active-coupon">
                <div class="coupon-header">
                    <div class="left">
                        <span><span>Created at:</span> ${date}</span>
                    </div>
                    <div class="active-numbers">
                        <p>Amount <span>$${coupons[i].amount}</span></p>
                        <p>Total Odds <span>${coupons[i].total}</span></p>
                    </div>
                </div>
                <h1>Possible winnings: $${(coupons[i].amount * coupons[i].total).toFixed(2)}</h1>
                <div class="${coupons[i]._id}"></div>
            </div>
        `)


        coupons[i].bets.forEach(foundBet => {
            const bet = foundBet.bet
         
            var title = ''
            var odds = 0

            if(Number(bet.choice) === 1) {
                title = bet.home.title
                odds = bet.home.odds
            } else if(Number(bet.choice) === 2) {
                title = bet.away.title
                odds = bet.away.odds

            }

            $(`.${coupons[i]._id}`).append(
                `<div class="bet-content">
                    <div class="bet-wrap">
                        <p>${bet.game_id.home} v ${bet.game_id.away}</p>
                        <p>${bet.type}
                    </div>
                    <div class="bet-wrap">
                        <p>${title}</p>
                        <p>${odds}
                        <p id="game-won">${bet.finished ? 'Finished' : 'Game not finished yet.'}</p>

                    </div>
                </div>
            `)
        })
    }
    

}

$(document).ready(function () {
    
})

