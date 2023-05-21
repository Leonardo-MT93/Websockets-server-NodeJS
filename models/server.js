const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    //Hacemos que el puerto sea visible
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app); //Le envio mi aplicacion de express en este caso es "app"
    this.io = require("socket.io")(this.server); //Es toda la informacion de los sockets conectados

    //Forma simplificada
    this.paths = {};

    //Middlewares son funciones que agregan otra funcionalidad al webserver. Se ejecutan siempre que levantamos el servidor
    this.middlewares();
    //Configuramos las rutas llamando al metodo
    this.routes();

    //nuevo path para los manejos de los sockets - Sockets

    this.sockets();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Directorio publico -- Implementamos nuestra carpeta pública
    this.app.use(express.static("public")); // palabra clave use para definir un middleware
  }

  //Metodo para definir rutas
  routes() {
    //Middleware condicional que comienza con el path /api/users = this.usuariosPath
    // this.app.use(this.paths.auth, require('../routes/auth'));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  //Metodo para escuchar
  listen() {
    this.server.listen(this.port, () => {
      //levantamos el servidor en este caso
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
