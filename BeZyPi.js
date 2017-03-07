$(function() {
    $("#LoadBetaSerie").click(function(){
     
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
                $('#complete').html(resultat);
           }
        });
    });
});


