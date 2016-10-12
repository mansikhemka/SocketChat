/**
 * Created by mansikhemka on 12/10/16.
 */


var socket = io();

var user = "Anonymous";

$(function(){
    display();
    $('#send').click(()=>{
       socket.emit('chat',$('#message').val())
        $('#message').html('');
    })


    $('#adduser').click(()=>{
        user = $('#username').val();
        socket.emit('userhere', user);

    })
});

function display(){
    $.get('/shows',(data)=>{
        console.log(data);

        var list=""
        for(var i=0;i<data.length;i++){
            var item;
            item='<li><div class="w3-panel w3-card-8">'+data[i].user+' : '+data[i].message+'</div></li><br>';
            list = list+item;
        }
        $('.receivehere').html(list);
    })
}

socket.on('chat', function(data){
    console.log(data);
    $('.receivehere').append('<li><div class="w3-panel w3-card-8">'+data+'</div></li><br>');
})

socket.on('join', (bear)=>{
    console.log(bear);
    $('.receivehere').append('<li style="background-color: skyblue; color: snow; padding: 10px;"><center>'+bear+' has joined</center></li><br>');
})
socket.on('leaving',(alright)=>{
    $('.receivehere').append('<li style="background-color: skyblue; color: snow; padding: 10px;"><center>'+alright+' has left</center></li><br>');
})