import Usuario from "../models/usuario.js";
import jwt from 'jsonwebtoken';
import Role from '../models/roles.js';
import llavesecreta from "../middleware/llaveSecreta.js";

const controlador = {};

controlador.registrar = async (req,res)=>{
    const {username,email,password, rol} = req.body;

    const nuevoUsuario = new Usuario({
        username,
        email,
        password: await Usuario.encryptPassword(password)
    });
    if (rol) {
        const foundRol = await Role.find({name: {$in: rol}})
        nuevoUsuario.rol = foundRol.map(role=>role._id);
    }
    else{

        const role = await Role.findOne({name: "user"});
        nuevoUsuario.rol = [role._id];

    }
    const createUsuario = await nuevoUsuario.save();
    
    res.status(200).json({"nuevoUsuario": createUsuario});
}

controlador.login = async (req,res)=>{
    const userFound = await Usuario.findOne({email: req.body.email}).populate("rol");
    if (!userFound) {
        return res.status(400).json({menssage: "Usuario not found"});
    }

    const comparar = await Usuario.matchPassword(req.body.password, userFound.password);
    if (!comparar) {
        return res.status(401).json({
            token: null,
            message: "Password invalida"
        })
    }

    const token = jwt.sign({id: userFound._id}, llavesecreta, {
        expiresIn: '1d'
    });
    res.json({token: token});

}

export default controlador