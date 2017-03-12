$(function() {
    $("#LoadBetaSerie").click(LoadBetaSerie);
});

LoadBetaSerie = function() {

    ShowLoading();
    
    var pwd = $.md5('developer');
    var login = "Dev011";
    var apiKey = "7fb939f3363b";

    $.ajax({
        url : 'https://api.betaseries.com/members/auth',
        type : 'POST',
        data : 'key=' + apiKey + '&v=2.4&login=' + login + '&password=' + pwd,
        dataType : 'json',

        success : function(value, statut) {
            $('#success').html(value.token);
        },
        error : function(resultat, statut, erreur) {
            alert(resultat.responseText);
        },
        complete : function(resultat, statut) {
            HideLoading();
        }
    });
}

ShowLoading = function(opts) {
    var options = {
        imgPath: 'loading.svg',
        imgStyle: {
            width: 'auto',
            textAlign: 'center',
            marginTop: '20%'
        },
        text: 'Chargement...',
        style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, .8)',
            left: 0,
            top: 0,
            zIndex: 10000
        }
    };

    $.extend(options, opts);

    var img = $('<div><img src="' + options.imgPath + '"><div>' + options.text + '</div></div>');
    var block = $('<div id="loading_block"></div>');

    block.css(options.style).appendTo('body');
    img.css(options.imgStyle).appendTo(block);
};

HideLoading = function() {
    $('div#loading_block').remove();
};
