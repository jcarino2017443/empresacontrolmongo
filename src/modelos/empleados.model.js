var moongose = require('mongoose');
var Schema = moongose.Schema;

var empleadoSchema = Schema({
    nombre: String,
    puesto:String,
    departamento: String,
    propietario: {type: Schema.Types.ObjectId, ref: 'empresas'}
});

module.exports = moongose.model('Empleado', empleadoSchema)