'use strict'

var express = require("express");
var api = express.Router();

var productoCotrolador = require('../controladores/productos.controlador');
var md_Auth = require('../middlewares/authenticated');


api.post('/agregarProducto', md_Auth.ensureAuth, productoCotrolador.agregar);
api.put('/editarProdutos/:id', md_Auth.ensureAuth,productoCotrolador.editarProdutos);
api.delete('/eliminarProducto/:id', md_Auth.ensureAuth, productoCotrolador.eliminarProductos);
api.get('/productoId/:id', md_Auth.ensureAuth, productoCotrolador.buscarId)
api.put('/comprarProductos/:id/:cant',md_Auth.ensureAuth, productoCotrolador.comprarProducto);
api.get('/obtenerProductos', md_Auth.ensureAuth, productoCotrolador.buscarProductoPropietario);
api.get('/obtenerStock/:id', md_Auth.ensureAuth, productoCotrolador.buscarStock)
api.get('/obtenerNombre/:name', md_Auth.ensureAuth, productoCotrolador.buscarNombre);
api.get('/obtenerProveedor/:proveedor', md_Auth.ensureAuth, productoCotrolador.buscarProveedor)
api.get('/ascendete', md_Auth.ensureAuth, productoCotrolador.Ascendente);
api.get('/descente', md_Auth.ensureAuth, productoCotrolador.Desentente)

api.get('/resultados', md_Auth.ensureAuth, productoCotrolador.Estadistica)
api.get('/masComprados', md_Auth.ensureAuth, productoCotrolador.MasVendidos);
module.exports = api;