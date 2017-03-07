$(function() {
    $("#LoadBetaSerie").click(LoadBetaSerie);
});

LoadBetaSerie = function() {
    cursor_wait();
    
    var pwd = $.md5('developer');
    var login = "Dev011";
    var apiKey = "7fb939f3363b";

    $.ajax({
        url : 'https://api.betaseries.com/members/auth',
        type : 'POST',
        data : 'key=' + apiKey + '&v=2.4&login=' + login + '&password=' + pwd,
        dataType : 'json',

        success : function(value, statut){
            $('#success').html(value.token);
        },
        error : function(resultat, statut, erreur){
            alert(resultat.responseText);
        },
        complete : function(resultat, statut){
            remove_cursor_wait();
        }
    });
}

cursor_wait = function() {
    // switch to cursor wait for the current element over
    var elements = $(':hover');
    if (elements.length) {
        // get the last element which is the one on top
        elements.last().addClass('cursor-wait');
    }
    // use .off() and a unique event name to avoid duplicates
    $('html').
        off('mouseover.cursorwait').
        on('mouseover.cursorwait', function(e) {
            // switch to cursor wait for all elements you'll be over
            $(e.target).addClass('cursor-wait');
        });
}

remove_cursor_wait = function() {
    $('html').off('mouseover.cursorwait'); // remove event handler
    $('.cursor-wait').removeClass('cursor-wait'); // get back to default
}
