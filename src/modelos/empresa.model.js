'use strict'
var moongose = require("mongoose");
var Schema = moongose.Schema;

var empresaSchema = Schema({
    nombre: String,
    empleados: [{
        nombreEmpleado: String,
        departamento: String
    }],
    propietario: {type: Schema.Types.ObjectId, ref: 'usuarios'}
})

module.exports = moongose.model("Empresa", empresaSchema)