'use strict'
const express = require("express");
var api = express.Router();

var usuarioContrador = require("../controladores/usuarios.controlador");
var md_Auth = require("../middlewares/authenticated");


api.post("/agregarUsuario", usuarioContrador.saveUsers);
api.post("/login", usuarioContrador.login);
api.put("/editarUsuario/:id", md_Auth.ensureAuth, usuarioContrador.updateUsers);
api.post("/Iniciar", usuarioContrador.agregarUsuarioAdmin)
api.delete('/eliminarUser/:id', usuarioContrador.eliminarUser);
api.get("/prueba", md_Auth.ensureAuth, usuarioContrador.prueba)
module.exports = api;

