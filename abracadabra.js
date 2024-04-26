const express = require("express");
const app = express();

// servidor con Express en el puerto 3000
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

// definir assets como carpeta pública del servidor
app.use(express.static(__dirname + "/assets")); 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Se crea arreglo de nombres y se devuelve en formato JSON en ruta: /abracadabra/usuarios
const usuarios = {
  "usuarios": ['Juan', 'Carla', 'Jaime', 'Fabiola', 'Josefa', 'Alejandro']
};
app.get("/abracadabra/usuarios", (req, res) => {
  res.send(usuarios);
});

// Middleware para validar que el usuario existe en el arreglo de nombres
const validarUsuario = (req, res, next) => { 
  const usuario = req.params.usuario;
  if (usuarios.usuarios.includes(usuario)) { // Si usuario existe en el arreglo
    next(); 
  } else {
    res.sendFile(__dirname + "/assets/who.jpeg"); // Si usuario no existe enviar la imagen "who.jpeg"
  }
};

// Ruta para validar usuario antes de acceder al juego
app.get("/abracadabra/juego/:usuario", validarUsuario, (req, res) => {
  res.sendFile(__dirname + "/index.html"); // Dirigir al usuario a página principal donde puede jugar
});

// Ruta para devolver Conejo o Voldemort
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = parseInt(req.params.n); // Convertir el parámetro a número
  const numeroAleatorio = Math.floor(Math.random() * 4) + 1; //  Aleatorio entre 1 y 4
  if (n == numeroAleatorio) {
    res.sendFile(__dirname + "/assets/conejito.jpg"); // Si el número coincide: muestra conejo
  } else {
    res.sendFile(__dirname + "/assets/voldemort.jpg"); // Si el número no coincide: muestra Voldemort
  }
});

// Ruta genérica para manejar rutas no definidas
app.get("*", (req, res) => {
  res.send("Esta página no existe...");
});


