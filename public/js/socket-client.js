//Referencias del html

const lblOnline = document.querySelector('#lblOnline');


const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();
//escucha eventos con el  "on" --Evento para escuchar
socket.on('connect', () => {
    // console.log('CONECTADO');

    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
});


socket.on('disconnect', () => {
    // console.log('DESCONECTADO');
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
});


socket.on('enviar-mensaje', (payload) => {

    console.log(payload)
})

btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value;
    //normalmente mandamos objetos asique es llamado como payload
    const payload = {
        mensaje,
        id: '123abc..uuid',
        fecha: new Date().getTime()
    }
    //Sirve para emitir - solo minusculas
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id)
    });

})