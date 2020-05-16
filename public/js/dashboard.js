$(document).ready(function () {
    // set random image
    $('.dashboard-image').attr('src','https://picsum.photos/200/300');

    // Import and injects navigation
    $.getScript("/js/injector.js")

})

