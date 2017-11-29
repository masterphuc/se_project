$( document ).ready(function() {
    var cookieData = document.cookie
        if(cookieData.length>0){
            $("#loginList").css("display", "none")
            $("#logoutList").css("display", "block")
            $("#signupList").css("display", "none")
            console.log(cookieData)
        }
    
            
        $("#loginTrig").click(function(){
             $('#navOG').fadeOut('medium', function() {
                $('#logInput').fadeIn('medium')
            })
        })
        
        $("#loginCancel").click(function(){
            $("#logInput").fadeOut('medium', function(){
                $("#navOG").fadeIn('medium')
            })
        })
        
        $("#login").click(function(){
                          
        })
        
        $("#logout").click(function(){
            
        })
});