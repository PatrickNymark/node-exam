$(document).ready(function () {
    // load injector
    $.getScript('/js/injector.js')

    const socket = io.connect("http://localhost:5000")

    $('#submit-btn').click(function () {
        console.log('clicked')
        message = $("#message").val()

        socket.emit('message', message)
    })

    socket.on('messages', function(data) {
        console.log("called")
        console.log(data)
        
        data.forEach(msg => {
            console.log(msg)

            $("#chat-body").append(`<p>${msg.message}</p>`)
        })
    })

    // $('#chat-body').

    // console.log(socket)
})