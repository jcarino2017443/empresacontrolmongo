'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = Schema({
    nombre:String,
    proveedor: String,
    stock: Number,
    vendido: Number,
    propietario: {type: Schema.Types.ObjectId, ref:'usuarios'}

})
module.exports = mongoose.model('Producto', productoSchema);