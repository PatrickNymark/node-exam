$.getScript('/js/injector.js')

fetch('/api/games').then(res => res.json()).then(games => {
    if(games.length === 0) {
        $('#games-wrapper').css('justify-content', 'center')
        $('#games-wrapper').css('pointer-events', 'none')

        $('#games-wrapper').hide().append(
            `<div class="game-wrapper">
                <p>No upcoming games...</p>
            </div>`
        ).fadeIn(400)
    }

    games.forEach(game => {
        $('#games-wrapper').hide().append(
            `<div class="game-wrapper">
                <p id="${game._id}">${game.home} v ${game.away}</p>
            </div>`
        ).fadeIn(400)
    })
})

$('.container').hide().prepend(`<h1>Games</h1>`).fadeIn(400)

$(document).ready(function () {
    $(document).on('click', ".game-wrapper", function(){
        const game = $(this).children().first().attr('id')
        window.location = `/games/${game}`
    });
})