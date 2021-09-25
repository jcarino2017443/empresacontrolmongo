'use strict'

var moongose = require("mongoose");
var app = require('./app')
var puerto = 3800;

moongose.Promise = global.Promise;
moongose.connect('mongodb://localhost:27017/Curso', {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log('La conexion se ha hecho exitosamente')
    app.listen(puerto, ()=>{
        console.log(`el servidor esta corriendo en el puerto ${puerto}`)
    })
}).catch(function (err) {
    console.log(err)
})