const socket = io()

let user = prompt('Digite el nombre de usuario que quiere usar\nDe no elegir sera anonimo');

let time = new Date();
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('outpout');
let actions = document.getElementById('actions');
let status = document.getElementById('status');
let numCon = document.getElementById('NumConexion');
let pNum = document.getElementById('num');

username.value = user;
if (user == '' || user == null) {
    username.value = 'Anonimo';
    user = "Anonimo";
}

btn.addEventListener('click', function () {

    if (user == '') {
        user = 'Anonimo'
    }

    socket.emit('chat:message', {
        hour: `${time.getHours()}:${time.getMinutes()}`,
        message: message.value,
        username: user
    });
    message.value = '';

});

message.addEventListener('keypress', function (data) {
    socket.emit('chat:typing', {
        username: user
    });
});

socket.on('connect', (data) =>{
    socket.emit('new:connection', {
        username: user
    });
});

socket.on('disconnect', (data) => {
    socket.emit('leave:connection', {
        username: user
    });
});

socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<div class='grid-message'>
    <p class='nom-usu'>${data.username}: </p>
    <p class='mensaje'>${data.message}</p>
    <p class='dhora'>(${data.hour})</p>
    </div>`
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p 
    style='padding-left: 16px;' class = "accion animate__animated animate__pulse animate__infinite"><em>
    ${data.username} esta escribiendo un mensaje...
    </em></p>`
});

socket.on('new:connection', function (data){
    console.log(data.socketCount)
    numCon.innerHTML =`<p>En linea ${data.socketCount}</p>`
    status.innerHTML += `<p class='conexion'>
    ${data.user} se ha conectado
    </p>`;
});

socket.on('leave:connection', function(data) {
    console.log(data.socketCount)
    numCon.innerHTML =`<p>En linea ${data.socketCount}</p>`
    status.innerHTML += `<p class='conexion'>
    Un usuario se ha desconectado
    </p>`
});

