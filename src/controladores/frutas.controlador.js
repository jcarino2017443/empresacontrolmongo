'use strict'

const frutaModelo = require('../modelos/fruta.modelo');


function prueba(req ,res) {
    return res.status(200).send({mensaje: 'hola a todos'})
}

function saveFrutas(req, res) {
    var params = req.body;
    var frutaModel = new FrutaModelo();
    if(params.nombre && params.color){
        frutaModel.nombre = params.nombre;
        frutaModel.color = params.color;
        frutaModel.temporada = params.temporada;

        frutaModel.save((err, frutasave)=>{
            if(err) {
                 res.status(500).send({mensaje: "Error en el servidor"});
            }else{
                return res.status(200).send({frutasave})

            } 

        })
    }else{
         res.status(200).send({mensaje: "Debe llenar todos los campos"})
    }
    
}
var getFrutas = (req, res)=>{
    FrutaModelo.find({}).sort({_id:-1}).exec(function (err, frutasEncotradas) {
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        return res.status(200).send({frutasEncotradas})
        
    })
}
function idFrutas(req, res) {
    var idfruta = req.params.id;
    
    FrutaModelo.findById(idfruta, (err, getId)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        return res.status(200).send({getId})
    })
    
}

function updatefrutas(req, res) {
    var params = req.body;
    var idfruta = req.params.id;
    
    frutaModelo.findByIdAndUpdate(idfruta, params, {new:true}, (err, actualizarFruta)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        return res.status(200).send({actualizarFruta})
    })
    
}

function deleteFrutas(req, res) {
    var idfruta = req.params.id;

    frutaModelo.findByIdAndRemove(idfruta, (err, frutaeliminada)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        return res.status(200).send({frutaeliminada})
    })
    
}
module.exports = {
    prueba,
    saveFrutas,
    getFrutas,
    idFrutas,
    updatefrutas,
    deleteFrutas
}