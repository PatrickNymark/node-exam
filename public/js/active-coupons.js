$.getScript('/js/injector.js')

const socket = io.connect("http://localhost:5000")

/* open connection to recieve update bets from bets stored in localstorage  */
socket.on('connect', () => {
    socket.emit('request-active-coupons')
})

/* emitted from the server when a bet is updated */
socket.on('requested-active-coupons', (coupons) => {
    console.log(coupons)
    buildDom(coupons)
})

function buildDom(coupons) {
    
    for(var i = 0; i < coupons.length; i++) {
        $('.active-coupon-wrapper').append(
            `<div>
                <h1>${coupons[i].amount}</h1>
                <p>${coupons[i].total}</p>
                <p>${coupons[i].finished}</p>
                <div id="${coupons[i]._id}"></div>

            </div>
        `)


        coupons[i].bets.forEach(bet => {
            const choice = {};

            if(bet.choice === 0) {
                choice.title = bet.c
            }
            $(`${coupons[i]._id}`).append(
                `<div>
                    <p>${bet.choice}</p>
                </div>
            `)
        })
    }
 
}

$(document).ready(function () {
    
})

