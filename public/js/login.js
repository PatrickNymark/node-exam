$(document).ready(function () {
    $.getScript('/js/injector.js')
})

// Login submit form
$(function() {
    $("#loginForm").submit(function(e) {
        e.preventDefault();

        const user = {
            email: $('#email').val(),
            password: $('#password').val()
        }

        if(!user.email || !user.password) {
            $('#error').css('opacity', '1')
            $('#error').text('Fields can not be empty')
            return
        }

        $.post("/api/auth/login", user)
            .done(function (data) {
                if(data.isAuthenticated) {
                    document.location = '/dashboard'
                }
            })
            .fail(function (xhr, status, error) {
                $('#error').css('opacity', '1')
                $('#error').text(xhr.responseJSON.error)
            })
    });
});