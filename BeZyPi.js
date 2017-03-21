$(function() {
    $("#LoadBetaSerie").click(LoadSeries);
});

var apiBetaSerie = 'https://api.betaseries.com/';

// Identifiants TKA
var apiKey = "7fb939f3363b";
var login = "haiecapique";
var pwd = "d9fb8a057fb2af1c9c9557e49eee7dd4"; //$.md5('monPwd');


// Identifiants VBL
//var apiKey = "e8d8e7bc375e";
//var login = "Maverickk";
//var pwd = "f15c5072e4704081555ee67c67629f7a"; //$.md5('monPwd');

function HeaderApiBetaSerie(token) {
    var header = 'key=' + apiKey + '&v=2.4';

    if(token != null)
        header += '&token=' + token;

    return header;
}

function GetAjaxTokenBetaSeries() {
    return $.ajax({
        url : apiBetaSerie + 'members/auth',
        type : 'POST',
        data : 'login=' + login + '&password=' + pwd + '&' + HeaderApiBetaSerie(null),
        dataType : 'json'
    });
}

function GetAjaxSeriesBetaSeries(requestToken) {
    return $.ajax({
        url : apiBetaSerie + 'members/infos?only=shows&' + HeaderApiBetaSerie(requestToken),
        type : 'GET',
        dataType : 'json'
    });
}

function LoadSeries() {
    ShowLoading();
    var requestToken = GetAjaxTokenBetaSeries();
    requestToken.then(value => InterneLoadSeries(value.token), value => Errors(value, true));
}

function InterneLoadSeries(token) {
    var requestSeries = GetAjaxSeriesBetaSeries(token);
    requestSeries.then(value => InterneShowSeries(value.member.shows), value => Errors(value, false));
    requestSeries.always(HideLoading);
}

function InterneShowSeries(series) {
    var tableauSeries = [];
    
    $.each(series, function(i, item) {
        var serie = {            
            text: item.title,
            selectable: false,
            nodes: [{
                text: "Episode <button type='button' class='btn btn-primary downloadEpisode' onclick='DownloadEpisode(\""+ item.id + "\", \"id-episode\")'>Telecharger</button>",
                selectable: false
            },
            {
                text: "Episode2 <button type='button' class='btn btn-primary downloadEpisode' onclick='DownloadEpisode(\""+ item.id + "\", \"id-episode2\")'>Telecharger</button>",
                selectable: false
            }]
        };
  
        tableauSeries.push(serie);
    });

    CreerTreeView(tableauSeries);
}

function CreerTreeView(tableauSeries) {
    $("#tree").empty();

    $('#tree').treeview({
        data: tableauSeries,
        levels: 1
    });
}
function Errors (value, isHide) {
    alert(JSON.stringify(value, null, ' '));
    if(isHide) {
        HideLoading();
    }
}

function DownloadEpisode(serie, episode) {
    alert(serie + "/" + episode);
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
