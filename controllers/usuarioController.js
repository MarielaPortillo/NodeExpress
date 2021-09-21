//referencia al modelo
import usuario from "../models/usuario.js";
import Role from '../models/roles.js';
//import generarJWT from "../generarjwt/generarJWT.js";
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
//import llaveSecreta from "../middleware/llaveSecreta";
import Verificacion from"../middleware/verificacion.js";
import llave from "../middleware/llaveSecreta.js";

//const llave = llaveSecreta(llaveSecreta);
const controlador={}

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
    
    /*console.log(updateUsuario)
    if (username) {
            const verificando = await usuario.findById(req.params.id)
            req.body.email = verificando.email;
            req.body.password = verificando.password;
            req.body.rol = verificando.rol;
            
            await usuario.findByIdAndUpdate(req.params.id, req.body)
            .then((entidad)=>res.status(200).send(entidad))
            .catch((err)=>res.status(400).send(
                {
                    "error":"No se pudo actualizar el usuario",
                    "id":updateUsuario
                }
                
                ));
        } else {
            if (username) {
                const verificando = await usuario.findById(req.params.id)
                req.body.email = verificando.email;
                req.body.password = verificando.password;
                req.body.rol = verificando.rol;
                
                await usuario.findByIdAndUpdate(req.params.id, req.body)
                .then((entidad)=>res.status(200).send(entidad))
                .catch((err)=>res.status(400).send(
                    {
                        "error":"No se pudo actualizar el usuario",
                        "id":updateUsuario
                    }
                    
                    ));
            } else {
                
            }
        }
    const verificando = await usuario.findById(req.params.id)
    updateUsuario.rol = verificando.rol;
    console.log({menssage:"Datos byId ",verificando})*/
    
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