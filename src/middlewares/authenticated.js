'use strict'

const jwt = require("jwt-simple");
const moment = require("moment");
var clave_secreta = "IN6AV201443";

exports.ensureAuth = function (req, res, next) {
    if(!req.headers.authorization){
        return res.status(400).send({mensaje: "se necesitan las cabezaras de autorizacion"});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, clave_secreta)
        if(payload.exp <= moment().unix()){
            return res.status(401).send({mensaje: "El token ha expirado"});
        }
    }catch(ex){
        return res.status(404).send({mensaje: "El token no es valido"});
    }
    req.user = payload;
    next();
}