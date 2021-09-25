'use strict'

var express = require('express');
var body_parser = require('body-parser');
var cors  = require ('cors')

var app = express();

//cargar rutas
var frutas_rutas = require("./src/rutas/fruras.ruta");
var usuario_rutas = require("./src/rutas/usuarios.rutas");
var empresa_rutas = require("./src/rutas/empresa.ruta");
var producto_rutas = require("./src/rutas/productos.ruta")
var empleado_rutas = require("./src/rutas/empleados.ruta");
//body parser
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

//configurar cors
app.use(cors())
//rutas base
app.use('/api', frutas_rutas, usuario_rutas, empresa_rutas, producto_rutas, empleado_rutas);


module.exports = app;