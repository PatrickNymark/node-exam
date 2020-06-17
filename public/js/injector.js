$(function(){
    // Set navigation
    $.get("../navigation.html", function(data){
        $('#navigation').hide().html(data).fadeIn(400);
    });

    // set navigation style
    $('head').append('<link rel="stylesheet" href="/css/navigation.css" type="text/css" />');

    // set google font
    $("head").append("<link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;1,400;1,600&display=swap' rel='stylesheet'>");
});
