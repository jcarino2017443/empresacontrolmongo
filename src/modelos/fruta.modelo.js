'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FrutaaSchema = Schema({
    nombre: String,
    color: String,
    temporada: Boolean
})

module.exports = mongoose.model('Fruta', FrutaaSchema)