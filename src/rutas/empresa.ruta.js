'use strict'
var express = require("express");
var api = express.Router();

var empresaContrador = require("../controladores/empresa.controlador");
var md_Auth = require("../middlewares/authenticated");

api.post("/crearEmpresas", md_Auth.ensureAuth, empresaContrador.saveEmpresa);
api.put("/editarEmpresas/:id", md_Auth.ensureAuth, empresaContrador.editarEmpresas);
api.delete("/eliminarEmpresa/:id", md_Auth.ensureAuth, empresaContrador.eliminarEmpresas)
api.get("/buscarEmpresas", md_Auth.ensureAuth, empresaContrador.encontrarEmpresa),
api.get("/nombreEmpleado", empresaContrador.buscarNombre);
api.get("/idEmpresa/:id", md_Auth.ensureAuth, empresaContrador.empresaId);

module.exports = api;

//api.put("/agregarEmpleado/:id", md_Auth.ensureAuth, empresaContrador.añadirEmpleado);
//api.put("/eliminarEmpleado/:id", md_Auth.ensureAuth, empresaContrador.eliminarEmpleado)
//api.get("/obteneEmpleados/:id", md_Auth.ensureAuth, empresaContrador.obtenerEmpleados);
//api.put("/editarEmpleados/:idEmpresa/:idEmpleado/:propietario", md_Auth.ensureAuth, empresaContrador.editarEmpleado)