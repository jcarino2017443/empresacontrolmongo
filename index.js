'use strict'

var moongose = require("mongoose");
var app = require('./app')
var puerto = 3800;

moongose.Promise = global.Promise;
moongose.connect('mongodb+srv://jeffrey:divertido19@basededatos.bgvve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log('La conexion se ha hecho exitosamente');

    app.listen(process.env.PORT || puerto, ()=>{
        console.log(`el servidor esta corriendo en el puerto ${puerto}`)
    })
}).catch(function (err) {
    console.log(err)
})
//mongodb://localhost:27017/Curso