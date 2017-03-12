$(function() {
    $("#LoadBetaSerie").click(LoadBetaSerie);
});

var tokenBetaSerie = '';
var apiKey = "7fb939f3363b";
    
var login = "haiecapique";
var pwd = "d9fb8a057fb2af1c9c9557e49eee7dd4"; //$.md5('monPwd');
var apiBetaSerie = 'https://api.betaseries.com/';

HeaderApiBetaSerie = function(withToken) {
    if(withToken)
        return 'key=' + apiKey + '&v=2.4&token=' + tokenBetaSerie;
    return 'key=' + apiKey + '&v=2.4';
}

LoadTokenBetaSerie = function(actionSuccess) {
    $.ajax({
        url : apiBetaSerie + 'members/auth',
        type : 'POST',
        data : 'login=' + login + '&password=' + pwd + '&' + HeaderApiBetaSerie(false),
        dataType : 'json',

        success : function(resultat, statut) {          
            tokenBetaSerie = resultat.token;
            actionSuccess();
        },
        error : function(resultat, statut, erreur) {
            alert(JSON.stringify(resultat, null, ' '));
        },
        complete : function(resultat, statut) {
        }
    });
}

LoadBetaSerie = function() {
    ShowLoading();

    LoadTokenBetaSerie(function() {        
        $.ajax({
            url : apiBetaSerie + 'members/infos?only=shows&' + HeaderApiBetaSerie(true),
            type : 'GET',
            dataType : 'json',

            success : function(resultat, statut) {                
                var data = resultat.member.shows;                
                $("#Series").empty();                
                $.each(data, function(i, item) {
                    $("#Series").append('<li>' + item.title + '</li>');
                });
                
                HideLoading();
            },
            error : function(resultat, statut, erreur) {
                alert(JSON.stringify(resultat, null, ' '));
            },
            complete : function(resultat, statut) {
            }
        });
    });
}

String.prototype.nl2br = function() {
    return this.replace(/\n/g, "<br />");
}

ShowLoading = function(opts) {
    var defaults  = {
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

    var options = $.extend({}, defaults, opts);

    var img = $('<div><img src="' + options.imgPath + '"><div>' + options.text + '</div></div>');
    var block = $('<div id="loading_block"></div>');

    block.css(options.style).appendTo('body');
    img.css(options.imgStyle).appendTo(block);
};

HideLoading = function() {
    $('div#loading_block').remove();
};
