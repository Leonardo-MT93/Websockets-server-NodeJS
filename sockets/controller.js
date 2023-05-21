const socketController = (socket) => {
    console.log('CLiente conectado', socket.id);

    socket.on("disconnect", () => {
      console.log('Cliente desconectado !! ', socket.id);
    });

    socket.on("enviar-mensaje", (payload, callback) => {
      const id = 123456123;
      callback({ id, fecha: new Date().getTime() });

      //msg a todos los clientes conectados
        //this.io  se usan en casos muy especificos - como alguna peticion REST
      socket.broadcast.emit('enviar-mensaje', payload); //Mensaje a todos los demas
    });
  }

  module.exports = {
    socketController
  }