//referenvia al modelo 
import comercio from "../models/comercio.js";
import 'swagger-ui-express';
import 'swagger-jsdoc';

const controlador={}


controlador.listado= async (req,res)=>{
    console.log("Ejecutando el FIND")
    await comercio.find()
    .then((entidad)=>res.status(200).send(entidad))
    .catch((err)=>res.status(400).send(
        {
            "error":"No hay datos de comercios",
        }
        
        ));
}

/**
 * @swagger
 * /uno/{id}:
 *  get:
 *      summary: Obtener un comercio
 *      description: Obteniendo Uno
 *      produces: 
 *          - application/json
 *      parameters:
 *          - in: path
 *             name: id
 *      responses:
 *          200:
 *              description: Un comercio
 *              schema:
 *              type: json
 * 
 */
controlador.uno= async (req,res)=>{
    console.log("Consulta individual")
    await comercio.findById(req.params.id)
    .then((entidad)=>res.status(200).send(entidad))
    .catch((err)=>res.status(400).send(
        {
            "error":"Comercio no encontrado",
            "id":req.params.id
        }
        
        ));
}

controlador.registrar= async (req,res)=>{
    const nuevocomercio = new comercio(req.body)
    console.log(nuevocomercio)
    await nuevocomercio.save()
    .then((entidad)=>res.status(200).send(entidad))
    .catch((err)=>res.status(400).send(
        {
            "error":"No se pudo guardar el comercio"
        }
        
        ));
}
//editar
controlador.actualizar= async (req,res)=>{
    
    console.log("Actualizando un comercio")
    await comercio.findByIdAndUpdate(req.params.id, req.body)
    .then((entidad)=>res.status(200).send(entidad))
    .catch((err)=>res.status(400).send(
        {
            "error":"No se pudo actualizar el comercio",
            "id":req.params.id
        }
        
        ));
}

//eliminar
controlador.eliminar= async (req,res)=>{
    console.log("Elimina comercio")
    await comercio.findByIdAndDelete(req.params.id)
    .then((entidad)=>res.status(200).send(entidad))
    .catch((err)=>res.status(400).send(
        {
            "error":"No se pudo eliminar o no existe",
            "id":req.params.id
        }
        
        ));
}


export default controlador