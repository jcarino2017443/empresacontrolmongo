'use strict'


var Proveedores = require('../modelos/productos.model');


function agregar(req, res) {
    var params = req.body;
    var proveerdorModel = new Proveedores();
    if(params.nombre && params.proveedor && params.stock){
        
        proveerdorModel.nombre = params.nombre;
        proveerdorModel.proveedor = params.proveedor;
        proveerdorModel.stock = params.stock;
        proveerdorModel.vendido = 0;
        proveerdorModel.propietario = req.user.sub; 

        Proveedores.find({nombre: proveerdorModel.nombre}).exec((err, nombreEncontrado)=>{
            if(err) return res.status(500).send({mensaje:'error en la peticion'});
            if(nombreEncontrado && nombreEncontrado.length >= 1){
                return res.status(500).send({mensaje: "el producto ya existe"});
            }else{
                proveerdorModel.save(function (err, productoSave) {
                    if(err) return res.status(500).send({mensaje: "error en la peticion de guardar producto"});
                    if(!productoSave) return res.status(500).send({mensaje:'campos vacion'});
                    return res.status(200).send({productoSave});
                })
            }
        }) 

    }else{
        return res.status(500).send({mensaje: 'debe llenar todos los campos'})
    }
    
}
function editarProdutos(req, res) {
    var params = req.body;
    var productoID = req.params.id;

    Proveedores.findByIdAndUpdate(productoID, params,{new:true}, (err, productoEditado)=>{
        if(err) return res.status(500).send({mensaje:'error en la peticion'});
        return res.status(200).send({productoEditado})
    })
}
function eliminarProductos(req, res) {
    var productoId = req.params.id;
    Proveedores.findByIdAndDelete(productoId, (err, productoEliminado)=>{
        if(err) return res.status(500).send({mensaje:'error en la peticion'});
        return res.status(200).send({productoEliminado})

    })
    
}

function buscarId(req, res) {
    var productoId = req.params.id;
    Proveedores.findById(productoId, (err, productoEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'error en la peticion'});
        return res.status(200).send({productoEncontrado})

    })
    
}

function buscarProductoPropietario(req,res){
    
    Proveedores.find({propietario: req.user.sub}, (err, productoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "error en la peticion de guardar producto"});
        return res.status(200).send({productoEncontrado});
    })
    
}

function buscarStock(req, res){
    var Idpropietario = req.params.id;
    var params = req.body;
    Proveedores.find({stock:params.stock, propietario:Idpropietario}).exec((err, stockEncontrado)=>{
        if(!stockEncontrado) return res.status(500).send({mensaje: "No hay concidencias"})
        return res.status(200).send({stockEncontrado})
    })
}
function buscarNombre(req, res) {
    var nombre = req.params.name;
    var params = req.body;
    Proveedores.find({nombre: nombre, propietario:req.user.sub}).exec((err, nombreEncontado)=>{
        if(nombreEncontado.length <= 0) return res.status(500).send({mensaje: "No hay concidencias"})
        return res.status(200).send({nombreEncontado})

    })
}

function buscarProveedor(req, res) {
    var proveedor = req.params.proveedor;
    
    Proveedores.find({proveedor: proveedor, propietario:req.user.sub}).exec((err, proveedorEncontrado)=>{
        if(proveedorEncontrado.length <= 0) return res.status(500).send({mensaje: "No hay Concidencias"});
        return res.status(200).send({proveedorEncontrado})
    })
}


function comprarProducto(req, res) {
    var params = req.body;
    var idProducto = req.params.id;
    var Cantidad = req.params.cant;
    

    if(Cantidad){
        Proveedores.findById(idProducto, (err, verificar)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion de verificar'});
            if(Cantidad > verificar.stock){
                let valor = verificar.stock;
                return res.status(500).send({mensaje: `Solo tenemos ${valor} unidades a la venta` })
 
            }
            if(verificar.stock <= 0){
                return res.status(500).send({mensaje: 'Por el momento no hay productos'})
            }else{
                Proveedores.findByIdAndUpdate({_id: idProducto}, {$inc:{stock:`-${Cantidad}`, vendido:Cantidad}}, {new:true}, (err, ventaProducto)=>{
                    if(err) return res.status(400).send({mensaje: 'error en la peticion'});
                    return res.status(200).send({ventaProducto})
                })
            }
        })
            
    
    }else{
        return res.status(500).send({mensaje:'es obligatorio el campo cantidad'})
    }
    
}

function Estadistica(req, res) {

        Proveedores.find({propietario: req.user.sub}, {_id:0,stock:0, proveedor:0,propietario:0}).exec((err, resultados)=>{
            if(err) return res.status(500).send({mensaje: 'Error en la peticion de verificar'});
            return res.status(200).send({resultados});
        })
    
}

function Ascendente(req, res){
    Proveedores.find({propietario:req.user.sub}).sort({stock:1}).exec((err, ascendente)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de verificar'});
        return res.status(200).send({ascendente})
    })
}
function Desentente(req, res){
    Proveedores.find({propietario:req.user.sub}).sort({stock:-1}).exec((err, descente)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion de verificar'});
        return res.status(200).send({descente})
    })
}

// function MasVendidos(req,res){
    
//     Proveedores.find({propietario: req.user.sub}).exec((err, encontrado)=>{
//         if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
//             Proveedores.find({vendido:{$gt:8}}, (err, hola)=>{
//                 if(err) return res.status(500).send({mensaje: 'Error en la peticion 2'});

//                 return res.status(200).send({encontrado})
//             })
//     })
// }
function MasVendidos(req,res){
    
    Proveedores.find({vendido:{$gt:8}, propietario: req.user.sub}).exec((err, encontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
        return res.status(200).send({encontrado})
    })
}

//

module.exports = {
    agregar,
    comprarProducto,
    buscarProductoPropietario,
    buscarStock,
    buscarNombre,
    buscarProveedor,
    Estadistica,
    editarProdutos,
    eliminarProductos,
    buscarId,

    Ascendente,
    Desentente,

    MasVendidos
}
