$(document).ready(function () {

    $.getScript('/js/injector.js')

    const socket = io.connect("http://localhost:5000")

    // socket.emit("posts")

    socket.on('connect', function(data) {
        socket.emit('posts')
    })

    socket.on('posts', function(data) {
        $('#posts-wrapper').html('')

        data.forEach(post => {
            console.log(post)
            $('#posts-wrapper').append(
                `<div>
                    <p>${post.title}
                </div>`
            )
        })
    })

    socket.on('update-posts', function(data) {
        socket.emit('posts')
    })

    // $.get("/api/posts/", function (data) {
    //     console.log(data)
    //     data.forEach(post => {
    //         $("#posts-wrapper").append(
    //             `<div>
    //                 <p>${post.title}
    //             </div>`
    //         )
    //     })
    // });
})