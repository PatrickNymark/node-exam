$.getScript("/js/injector.js")

var current = {}

fetch('/api/auth/current')
    .then(res => res.json())
    .then(user => {
        current.user = user

        fetch(`/api/coupons/${user._id}`)
            .then(res => res.json())
            .then(coupons => {
                current.coupons = coupons
                

                buildDom(current);
            })
        
    })

function buildDom({ user, coupons }) {
    $('.dashboard-header').html(`${user.firstName} ${user.lastName}`)
    $('.dashboard-subheader').html(`${user.email}`)

    $('.currency-wrapper p').append('$' + (user.balance || 0))
    $('.account-wrapper')

    // set history and active links
    $('#history-link').attr('href', `/history/${user._id}`)
    $('#active-link').attr('href', `/active/${user._id}`)

}

function buildModal() {
    $('#modal-background').append(`
        <div class="modal-content">
            <span id="modal-close">X</span>
            <div class="modal-inputs">
                <h1>Add net deposit
                <input class="modal-input type="text" placeholder="Enter amount" />
                <button id="add">Add Amount</button>
            </div>
        </div>
    `)
    $('.modal-content').fadeIn(400)
}

function closeModal() {
    $('#modal-background').fadeOut(400).html('')
    $('.modal-content').fadeOut(400)
    $('.dashboard-page-wrapper').fadeIn(400)

}

function flashMessage() {
    $('.modal-inputs').fadeOut(400).html('')
    $('.modal-content').append(`
        <h1 style="font-size: 16px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"> Succesfully added! </h1>
        `).delay(1000).queue(function() {   
            closeModal();
            location.reload();
        });
}

$(document).ready(function () {
    // Import and injects navigation

    $(document).on('click', '#deposit', () => {
        $('.dashboard-page-wrapper').fadeOut(400)
        $('#modal-background').fadeIn(400)
        buildModal()
    })

    $(document).on('click', '#modal-close', () => {
        closeModal()
    })

    $(document).on('click', '#add', () => {
        var amount = $('.modal-input').val()

        $.post("/api/users/deposit", { amount })
            .done(function (data) {
                console.log(data)
                flashMessage()
            })
            .fail(function (xhr, status, error) {
                // $('#error').css('opacity', '1')
                // $('#error').text(xhr.responseJSON.error)
            })
    })

    $(document).on('click', '#modal-background', (e) => {
        if($(e.target).attr('id') === 'modal-background') {
            closeModal()
        }
    })
})

