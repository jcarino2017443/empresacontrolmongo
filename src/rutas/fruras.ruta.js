var express = require('express')
var api = express.Router()
var FrutaControlador = require("../controladores/frutas.controlador")

api.get('/frutaPrueba', FrutaControlador.prueba);
api.post('/setFruta', FrutaControlador.saveFrutas);
api.get('/obtenerFrutas', FrutaControlador.getFrutas);
api.get('/idFruta/:id', FrutaControlador.idFrutas);
api.put('/editarFruta/:id', FrutaControlador.updatefrutas);
api.delete('/eliminarFruta/:id', FrutaControlador.deleteFrutas)

module.exports = api;
