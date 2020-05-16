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

        $.post("/api/auth/login", user, (data) => {
            if(data.isAuthenticated) {
                document.location = '/dashboard'
            }
        });
    });
});