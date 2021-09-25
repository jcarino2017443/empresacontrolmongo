'use strict'
const jwt = require("jwt-simple");
const moment = require("moment");
var clave_secreta = "IN6AV201443";

exports.createToken = function (usuario) {
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        username: usuario.username,
        email: usuario.email,
        password: usuario.password,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, clave_secreta)
}

