//referenvia al modelo 
import comercio from "../models/comercio.js";
import Categoria from '../models/categoria.js'
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
    const {nombreComercio,propietario,coordenadas, telefono, redes_sociales, categoria, descripcion, logo} = req.body;

    const newComercio = new comercio({
        nombreComercio,
        propietario,
        coordenadas,
        telefono,
        redes_sociales,
        descripcion,
        logo
    });
    if (categoria) {
        const foundCategoria = await Categoria.find({categoria: {$in: categoria}})
        newComercio.categoria = foundCategoria.map(categoria=>categoria._id);
    }
    else{

        const cate = await Categoria.findOne({categoria: "Comida"});
        console.log(cate)
        newComercio.categoria = [cate._id];

    }
    const createCategoria = await newComercio.save();
    
    res.status(200).json(createCategoria)
    .then((entidad)=>res.status(200).send(entidad))
        .catch((err)=>res.status(400).send(
            {
                "error":"No se pudo registrar revise que los datos se envien correctamente",
                "datos":req.body
            }
            
        ));
    
}
//editar
controlador.actualizar= async (req,res)=>{
    
    if (req.body.categoria) {
        const foundCategoria = await Categoria.find({categoria: {$in: req.body.categoria}})
        req.body.categoria = foundCategoria.map(cat=>cat._id);
        await comercio.findByIdAndUpdate(req.params.id, req.body)
        .then((entidad)=>res.status(200).send(entidad))
        .catch((err)=>res.status(400).send(
            {
                "error":"No se pudo editar el comercio verifique los datos",
                "datos":req.body
            }
        ));
    }else{
        const verificando = await comercio.findById(req.params.id)
        req.body.categoria = verificando.categoria;
        
        await comercio.findByIdAndUpdate(req.params.id, req.body)
        .then((entidad)=>res.status(200).send(entidad))
        .catch((err)=>res.status(400).send(
            {
                "error":"No se pudo editar el comercio",
                "datos":req.body
            }
        ));
    }
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