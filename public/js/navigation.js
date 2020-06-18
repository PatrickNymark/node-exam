var authenticatedUser = {}

$(document).ready(function () {
    console.log("ready")

    $.get("/api/auth/current")
        .done(function (data) {
            authenticatedUser = data
            $("#authenticated").show()
        })
        .fail(function(data) {
            $("#not-authenticated").show()
        })
})