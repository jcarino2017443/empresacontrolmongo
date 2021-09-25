'use strict'

var express = require('express');
var empleadoControlador = require('../controladores/empleados.controlador');
var md_Aunth = require ('../middlewares/authenticated');

var api = express.Router();

api.post('/agregarEmpleado', md_Aunth.ensureAuth, empleadoControlador.agregarEmpleado)
api.put('/editarEmpleado/:id', md_Aunth.ensureAuth, empleadoControlador.editarEmpleado);
api.delete('/eliminarEmpleado/:id', md_Aunth.ensureAuth, empleadoControlador.eliminarEmpleados);
api.get('/buscarEmpleados', md_Aunth.ensureAuth, empleadoControlador.buscarEmpleadoSegunEmpresa);
api.get('/empleadoId/:id', md_Aunth.ensureAuth, empleadoControlador.buscarId)

api.get('/nombreEmpleado/:nombre', md_Aunth.ensureAuth, empleadoControlador.buscarNombre);
api.get('/puestoEmpleado/:puesto', md_Aunth.ensureAuth, empleadoControlador.buscarPuesto);
api.get('/departamentoEmpleado/:depa', md_Aunth.ensureAuth, empleadoControlador.busacarDepartamento);
api.get('/idEmpleado/:id', md_Aunth.ensureAuth, empleadoControlador.idEmpleado)
module.exports = api;