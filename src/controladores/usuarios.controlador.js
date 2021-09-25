'use strict'

var Usuarios = require("../modelos/usuarios.modelo");
var jwt = require("../JWT/jwt")
var bcrypt = require("bcrypt-nodejs")

function prueba(req, res) {
    return res.status(200).send(req.user)
    
}

function login(req, res) {
    var params = req.body;
    
    if(params.email && params.password){
        Usuarios.findOne({email: params.email},(err, correoEncontrado)=>{
            if(err) return res.status(400).send({mensaje: "Error en la peticion"});
            if(correoEncontrado){
                bcrypt.compare(params.password, correoEncontrado.password, (err, verificacion)=>{
                    if(err) return res.status(400).send({mensaje: "Error en la peticion de verifacion"});
                    if(verificacion){
                        if(params.getToken === 'true'){
                            return res.status(200).send({token: jwt.createToken(correoEncontrado)})
                        }else{
                            correoEncontrado.password = undefined;
                            return res.status(200).send({correoEncontrado});

                        }
                    }else{
                        res.status(400).send({mensaje: "el usuario no se ha podido identificar"})
                    }
                })
            }else{
                res.status(400).send({mensaje: "El usuario no existe"})
            }
        })
    }
    
}

function saveUsers(req, res) {
    var params = req.body;
    var usuarioModel = new Usuarios();

    if(params.nombre && params.email && params.username && params.password && params.rol){
        usuarioModel.nombre = params.nombre;
        usuarioModel.username = params.username;
        usuarioModel.email = params.email;
        usuarioModel.password = params.password;
        usuarioModel.rol = params.rol;
        usuarioModel.imagen = null;

        Usuarios.find({$or:[
            {username: usuarioModel.username},
            {email: usuarioModel.email}
        ]}).exec((err, usuarioEncontrado)=>{
            if(err) return res.status(400).send({mensaje: "Error en la peticion"})

            if(usuarioEncontrado && usuarioEncontrado.length >= 1){
                return res.status(500).send({mensaje: "el usuario ya existe"});

            }else{
                bcrypt.hash(params.password,null,null, (err, encryptacion)=>{
                    usuarioModel.password = encryptacion;
                    
                    if(err) {return res.status(400).send({mensaje: "Error en la peticion hash"});
                }else{
                    usuarioModel.save((err, usuarioGuardado)=>{
                        return res.status(200).send({usuarioGuardado})
                    })
                }

                })
            }

            
        })
    }else{
        return res.status(401).send({mensaje: "Es necesario que llene todos los campos"})
    }
    
}

function updateUsers(req, res) {
    var params = req.body;
    var idUser = req.params.id;
    delete params.password;

    if(req.user.rol !== "Rol_Admin"){
        return res.status(200).send({mensaje: "Solo el administrador puede editar"})

    }
        Usuarios.findByIdAndUpdate(idUser, params, {new:true}, (err, actualizado)=>{
            if(err) res.status(500).send({mensaje: "Error en la peticion de actualizar"});
                return res.status(200).send({actualizado})
        })
       
}
function eliminarUser(req, res) {
    var params = req.body;
    var idUser = req.params.id;

    Usuarios.findByIdAndDelete(idUser, (err, usuarioEliminado)=>{
        if(err) res.status(500).send({mensaje: "Error en la peticion de actualizar"});
        return res.status(200).send({usuarioEliminado})

    })
    
}

function  agregarUsuarioAdmin (req,res){
        var usuarioModel = new Usuarios();
        var passwordSecreta = '123456';

        usuarioModel.nombre = "Gabriel";
        usuarioModel.username = "Gcarino-2017443";
        usuarioModel.email = "jcarino-2017443@kinal.edu.gt";
        usuarioModel.password = passwordSecreta;
        usuarioModel.rol = "Rol_Admin";
        usuarioModel.imagen = null;

        Usuarios.find({$or: [
            {email: usuarioModel.email},
            {username: usuarioModel.username}
        ]}).exec((err, usuarioEncontrado)=>{
            if(err) return res.status(400).send({mensaje: "Error en la peticion"})
            if(usuarioEncontrado && usuarioEncontrado.length >= 1){
                return res.status(500).send({mensaje: "Esta funcion ya fue dada de baja"});

            }else{
                bcrypt.hash(passwordSecreta,null,null,(err, encriptacion)=>{
                    usuarioModel.password = encriptacion;
                    if(err){
                        return res.status(400).send({mensaje: "Error en la peticion hash"});
                    } else{
                        usuarioModel.save((err, adminCreado)=>{
                            if(err) return res.status(500).send({mensaje: "error al guardar"});
                            return res.status(200).send({adminCreado})
                        })
                    }

                })
            }
        })
}

module.exports = {
    saveUsers,
    login,
    updateUsers,
    prueba,
    agregarUsuarioAdmin,
    eliminarUser
}