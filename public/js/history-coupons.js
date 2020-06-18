$.getScript('/js/injector.js')

var userId = window.location.pathname.substring(9)

fetch(`/api/coupons/${userId}`)
    .then(res => res.json())
    .then(coupons => {
        console.log(coupons)
        buildDom(coupons)
    })

function buildDom(coupons) {
    for(var i = 0; i < coupons.length; i++) {
        var date = moment(coupons[i].createdAt).format('DD/MM/YYYY HH:mm:ss');
        $('.history-coupon-wrapper').append(
            `<div class="active-coupon">
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
                <div id="${coupons[i]._id}"></div>
                <h1>${coupons[i].finished && coupons[i].won ? 'Won' : 'Lost'}</p>
            </div>
        `)
        
        $('.active-coupon').css('min-height', 'auto')
        $('.active-coupon').css('left', '50%')
        $('.active-coupon').css('transform', 'translateX(-50%)')

        $('.active-coupon').css('padding-bottom', '10px')

    }
    
}

$(document).ready(function () {

})

