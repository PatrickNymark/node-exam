$(document).ready(function () {
    $.get("/api/posts/", function (data) {
        console.log(data)
    });
})