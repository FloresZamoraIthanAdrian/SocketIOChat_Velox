const socket = io()

let user = prompt('Digite el nombre de usuario que quiere usar\nDe no elegir sera anonimo');

let time = new Date();
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('outpout');
let actions = document.getElementById('actions');

username.value = user;
if(user == '' || user == null){
    username.value = 'Anonimo';
    user = "Anonimo";
}

btn.addEventListener('click', function () {

    if(user == ''){
        user = 'Anonimo'
    }
    socket.emit('chat:message', {
        hour: `${time.getHours()}:${time.getMinutes()}`,
        message: message.value,
        username: user
    });

});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value)
});

socket.on('new:connection', function (data){
    socket.emit
});

socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.value += `${data.username} : ${data.message} - ( ${data.hour} )\n`
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p 
    class = "accion animate__animated animate__pulse animate__infinite"><em>
    ${data} is typing a message ...
    </em></p>`
});

