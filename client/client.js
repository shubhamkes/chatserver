(function(){

    window.onload = windowLoad;

    function windowLoad(){
        var socket = io();
            $('form').submit(function(){
                socket.emit('chatMessage', $('#m').val());
                $('#m').val('');
                return false;
            });
            socket.on('chatMessage', function(msg){
                console.log(msg);
                $('#messages').append($('<li>').text(msg));
            });
    };
})();