//referencia al modelo
import usuario from "../models/usuario.js";
import Role from '../models/roles.js';

const controlador={}
// Mostrar todos los usuarios
controlador.listadou= async (req,res)=>{
    console.log("Ejecutando el FIND usuario")
    await usuario.find()
    .then((entidad)=>res.status(200).send(entidad))
    .catch((err)=>res.status(400).send(
        {
            "error":"No hay usuarios enla BD",
        }
        ));
}
// Mostrar un usuario
controlador.uno= async (req,res)=>{
    console.log("Consulta individual")
    await usuario.findById(req.params.id)
    .then((entidad)=>res.status(200).send(entidad))
    .catch((err)=>res.status(400).send(
        {
            "error":"Usuario no encontrado",
            "id":req.params.id
        }
        ));
    
}

//editar
controlador.actualizar= async (req,res)=>{
    const {username, email, password, rol} = req.body;
    
    if (rol) {
        const foundRol = await Role.find({name: {$in: rol}})
        req.body.rol = foundRol.map(role=>role._id);
        await usuario.findByIdAndUpdate(req.params.id, req.body)
        .then((entidad)=>res.status(200).send(entidad))
        .catch((err)=>res.status(400).send(
            {
                "error":"No se pudo actualizar el usuario admin",
                "id":req.body
            }
            
        ));
        
    }else{
        
        const verificando = await usuario.findById(req.params.id)
        req.body.rol = verificando.rol;
        
        await usuario.findByIdAndUpdate(req.params.id, req.body)
        .then((entidad)=>res.status(200).send(entidad))
        .catch((err)=>res.status(400).send(
            {
                "error":"No se pudo actualizar el usuario",
                "id":req.body
            }
        ));
    }
    
}

//eliminar
controlador.eliminar= async (req,res)=>{
    console.log("Eliminando Usuario")
    await usuario.findByIdAndDelete(req.params.id)
    .then((entidad)=>res.status(200).send(entidad))
    .catch((err)=>res.status(400).send(
        {
            "error":"No se pudo eliminar el usuario o no existe",
            "id":req.params.id
        }
        
        ));
}

export default controlador