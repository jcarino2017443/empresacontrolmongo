'use strict'

var Empresa = require("../modelos/empresa.model");
var Usuario = require("../modelos/usuarios.modelo");
var Empleado = require("../modelos/empleados.model");
var Producto = require("../modelos/productos.model");


function saveEmpresa(req, res) {
    var params = req.body;
    var empresaModel = new Empresa();

    if(req.user.rol !== "Rol_Admin"){
        return res.status(401).send({mensaje: "Solo el administrador puede crear empresas"})
    }

        if(params.nombre){
            empresaModel.nombre = params.nombre;
            empresaModel.propietario = params.propietario;
            

            Empresa.find({nombre: empresaModel.nombre}).exec((err, nombreEncontrado)=>{
                if(err) return res.status(401).send({mensaje: "Error en la peticino"});
                if(nombreEncontrado && nombreEncontrado.length >=1){
                    return res.status(400).send({mensaje: "El nombre ya existe"});
                }else{
                    Empresa.find({propietario: empresaModel.propietario}).exec((err, propietarioEnContrado)=>{
                        if(err) return res.status(401).send({mensaje: "Error en la peticino propietario"});
                            if(propietarioEnContrado && propietarioEnContrado.length >=1){
                                return res.status(400).send({mensaje: "el propietario no puede tener dos empresas"})
                            }else{
                                empresaModel.save(function(err, empresaGuardad) {
                                    if(err) res.status(400).send({mensaje:"Error en la peticion de guardar la empresa"});
                                    if(empresaGuardad){
                                        return res.status(200).send({empresaGuardad})
                                    }
                                })
                            }
                    })
                }
            })
        }  
}

function editarEmpresas(req, res) {
    var params = req.body;
    var idEmpresa = req.params.id;

  if (req.user.rol != 'Rol_Admin') {
      return res.status(500).send({mensaje: 'Solo el administrador puede editar empresas'});
  }

  Empresa.findByIdAndUpdate(idEmpresa, params, {new:true}, (err, empresaEditada)=>{
      if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
      return res.status(200).send({empresaEditada})
  })
    
}
function eliminarEmpresas(req, res) {
    var idEmpresa = req.params.id;
    if(req.user.rol != 'Rol_Admin'){
        return res.status(500).send({mensaje: 'acceso denegado. No eres administrador'})
    }
    Empresa.deleteOne({propietario:idEmpresa}, (err, empresaEliminada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion A'});
        
    })
        Usuario.deleteOne({_id: idEmpresa}, (err, usuarioEliminado)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion B'});
            return res.status(200).send({usuarioEliminado})

        })
}

function encontrarEmpresa(req, res) {

    Empresa.find().exec((err, empresasEncontradas)=>{
        if(err) return res.status(401).send({mensaje: "Error en la peticino"});
        return res.status(200).send({empresasEncontradas})
    })
    
}

function empresaId(req, res) {
    var empresaId = req.params.id;
    Empresa.findById(empresaId, (err, empresasEncontrada)=>{
        if(err) return res.status(500).send({mensaje:"Error en la peticion"});
        return res.status(200).send({empresasEncontrada})
    })
    
}

function EliminarTodo(req,res){
    var idEmpresa = req.params.id;
    if(req.user.rol != 'Rol_Admin'){
        return res.status(500).send({mensaje: 'acceso denegado. No eres administrador'})
    }
        Empresa.deleteOne({propietario:idEmpresa}, (err, empresaEliminada)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion A'});
            
        })
            Usuario.deleteOne({_id: idEmpresa}, (err, usuarioEliminado)=>{
                if(err) return res.status(500).send({mensaje: 'Error en la peticion B'});
                return res.status(200).send({usuarioEliminado})

            })
}


function añadirEmpleado(req, res) {
    var params = req.body
    var propietario = params.propietario;
    var idEmpresa = req.params.id;
    
    if(params.propietario && params.nombreEmpleado && params.departamento){
        if(req.user.sub !== propietario){
            return res.status(400).send({mensaje: "Solo el propietario tiene acceso"});
        }

        Empresa.findById(idEmpresa, (err, empleadosEncontrados)=>{
            if(err) res.status(500).send({mensaje: "Error en la peticion"});
            if(empleadosEncontrados.empleados.length > 9){
                var largo = empleadosEncontrados.empleados.length;
                return res.status(400).send({mensaje: `solo pueden aver ${largo} empleados`})
            }else{
                    Empresa.findByIdAndUpdate(idEmpresa, {$push:{empleados:{nombreEmpleado: params.nombreEmpleado, departamento: params.departamento}}}, {new:true}, (err, empleadosNew)=>{
                        if(err) return res.status(500).send({mensaje: "Error en la peticion de empleados"});
                            return res.status(200).send({empleadosNew})
                })
            }
        })   
    }else{
       return res.status(400).send({mensaje: "llene todos los campos"})
    }
    
}
function editarEmpleado(req, res) {
    var params = req.body;
    var idEmpre = req.params.idEmpresa;
    var idEmple = req.params.idEmpleado;
    var propietario = req.params.propietario;
    
    
        if(req.user.sub !== propietario){
            return res.status(400).send({mensaje: "Solo el propietario tiene acceso"});
        }
     Empresa.findOneAndUpdate({_id: idEmpre, 'empleados._id':idEmple}, 
     {'empleados.$.nombreEmpleado': params.nombreEmpleado, 'empleados.$.departamento': params.departamento},
     {new:true}, (err, empleadoActualizado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petecion'});
        if(!empleadoActualizado) return res.status(500).send({mensaje: 'No hay datos por actualizar'});

        return res.status(200).send({empleadoActualizado})
     })
    
}
function eliminarEmpleado(req, res) {
    var params = req.body;
    var idEmpresa = req.params.id;
    var propietario = params.propietario;


    if(params.idEmpleado && params.propietario){
        if(req.user.sub === propietario || req.user.rol === 'Rol_Admin'){

            Empresa.findByIdAndUpdate(idEmpresa, {$pull:{empleados:{_id: params.idEmpleado}}}, {new:true}, (err, empleadoRemove)=>{
                if(err) return res.status(500).send({mensaje: "Error en la peticion de empleadosRemove"});
                if(!empleadoRemove){
                    return res.status(401).send({mensaje: "no se pudo eliminar el empleado"});
                }
                return res.status(200).send({empleadoRemove})
            })

        }else{
            return res.status(400).send({mensaje: "Solo el propietario o el administador tiene acceso a esta empresa"})
        }

        
         
    }else{
        return res.status(500).send({mensaje: "Es necesario que coloque el id del empleado y el propietario de la empresa"})
    }


    

    
    
}
function obtenerEmpleados(req, res) {
    var idEmpresa = req.params.id;
    var params = req.body;
    var propietario = params.propietario;

    if(params.propietario){
        if(req.user.sub !== propietario){
            return res.status(200).send({mensaje: "solo el propietario puede ver a sus empleados"});
        }

        Empresa.findById(idEmpresa, {'empleados.nombreEmpleado':1, _id:0}, (err, empleadosObtenidos)=>{
            if(err) return res.status(401).send({mensaje: "Error en la peticion"});
            if(!empleadosObtenidos){
                return res.status(401).send({mensaje: "No hay empleados"});
            }
            return res.status(200).send({empleadosObtenidos})
        })


    }else{
        return res.status(400).send({mensaje: "debe indicar quien es el propietario"})
    }

    
    
}
function buscarNombre(req, res) {
    var params = req.body;
    var nombre = params.nombre;
    if(nombre){
        Empresa.findOne({'empleados.nombreEmpleado': nombre}, {_id:0},(err, nombreEncontrado)=>{
            if(err) return res.status(500).send({mensaje: "Error en la peticion"});
            if(!nombreEncontrado) {
                return res.status(500).send({mensaje: "El empleado no existe"});
            }
            if(nombreEncontrado){
                
                var name = nombreEncontrado.empleados
                        return res.status(200).send({name})
                    
               
            }
            
            
        })
    }else{
        return res.status(500).send({mensaje: "es necesario el campo del nombre"})
    }
    
    
}

module.exports = {
    saveEmpresa,
    editarEmpresas,
    eliminarEmpresas,
    encontrarEmpresa,
    empresaId,
    EliminarTodo,
    buscarNombre
}

