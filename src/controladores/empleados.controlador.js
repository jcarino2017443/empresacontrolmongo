'use strict'
var Empleado = require("../modelos/empleados.model");

function agregarEmpleado(req, res) {
    var params = req.body;
    var empleadoModel = new Empleado();

    if(params.nombre && params.puesto && params.departamento){
        
        empleadoModel.nombre = params.nombre;
        empleadoModel.puesto = params.puesto;
        empleadoModel.departamento = params.departamento;
        empleadoModel.propietario = req.user.sub

        empleadoModel.save((err, empleadoGuardado)=>{
            if(err) return res.status(500).send({mensaje: "Error en la peticion"});
            return res.status(200).send({empleadoGuardado})
        })
    }

}

function editarEmpleado(req, res) {
    var params = req.body;
    var idEmpleado = req.params.id;
    
    Empleado.findById(idEmpleado, (err, idEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        if(idEncontrado.propietario != req.user.sub){
            return res.status(500).send({mensaje: 'solo la empresa puede editar a sus empleados'})
        }else{
            Empleado.findByIdAndUpdate(idEmpleado, params, {new: true}, (err, empleadoEdit)=>{
                if(err) return res.status(500).send({mensaje: "error en la peticion"});
                return res.status(200).send({empleadoEdit}); 
        
            })
        }
    })
    
   
}

function eliminarEmpleados(req, res) {
    var idEmpleado = req.params.id;
    
    Empleado.findById(idEmpleado, (err, idEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        if(idEncontrado.propietario != req.user.sub){
            return res.status(500).send({mensaje: 'solo la empresa prpietaria puede eliminar a sus empleados'})
        }else{
            Empleado.findByIdAndDelete(idEmpleado, (err, empleadoEliminado)=>{
                if(err) return res.status(500).send({mensaje: "error en la peticion"});
                return res.status(200).send({empleadoEliminado}); 
            })
        }
    })
        
    
}

function buscarEmpleadoSegunEmpresa(req, res) {
    Empleado.find({propietario: req.user.sub}).exec((err, empleadosEncontrados)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        return res.status(200).send({empleadosEncontrados})
    })
    
}

function buscarId(req, res) {
    var empleadoid = req.params.id;

    Empleado.findById(empleadoid, (err, empleadosEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion"});
        return res.status(200).send({empleadosEncontrado})

    })
    
}

function buscarNombre(req,res){
    var nombreEmpleado = req.params.nombre;

    Empleado.find({nombre: nombreEmpleado, propietario: req.user.sub}, (err, nombreEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(nombreEncontrado.length <= 0){
            return res.status(500).send({mensaje: "No hay concidencias"})
        }
        return res.status(200).send({nombreEncontrado});
    })
}

function buscarPuesto(req,res){
    var Empleadopuesto = req.params.puesto;
    Empleado.find({propietario: req.user.sub ,puesto: Empleadopuesto}, (err, puestoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(puestoEncontrado.length <= 0){
            return res.status(500).send({mensaje: "No hay concidencias"})
        }
        return res.status(200).send({puestoEncontrado});
    })
}
function busacarDepartamento(req,res){
    var departamentoEmpleado = req.params.depa;
    Empleado.find({propietario: req.user.sub, departamento:departamentoEmpleado}, (err, depaEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(depaEncontrado.length <= 0){
            return res.status(500).send({mensaje: "No hay concidencias"})
        }
        return res.status(200).send({depaEncontrado})
    })
}
function idEmpleado(req, res){
    var idEmple = req.params.id;
    Empleado.find({propietario: req.user.sub , _id: idEmple}, (err, idEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(idEncontrado.length <= 0){
            return res.status(500).send({mensaje: "No hay concidencias"})
        }
        return res.status(200).send({idEncontrado})
    })
}

module.exports = {
    agregarEmpleado,
    editarEmpleado,
    eliminarEmpleados,
    buscarEmpleadoSegunEmpresa,
    buscarId,

    buscarNombre,
    buscarPuesto,
    busacarDepartamento,
    idEmpleado

}