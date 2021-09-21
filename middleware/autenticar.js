import jwt from 'jsonwebtoken';
import llavesecreta from './llaveSecreta.js';
import usuario from '../models/usuario.js';
import Role from '../models/roles.js'
const verify = {};

verify.verfiyToken = async (req, res, next)=>{
    const token = req.headers["x-access-token"];

    console.log(token);
    if (!token) {
        return res.status(400).json({
            menssage: "No hay token"
        })
        
    }
    try {
        const decoded = jwt.verify(token, llavesecreta);
        req.usuarioId = decoded.id;
    
        const user = await usuario.findById(req.usuarioId, { password: 0 });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
        next();
      } catch (error) {
        return res.status(401).json({ message: "Jaa usuario no autorizado!" });
      }
};
verify.isSupervisor = async (req, res, next) => {
    try {
      const user = await usuario.findById(req.usuarioId);
      const rol = await Role.find({ _id: { $in: user.rol } });
  
      for (let i = 0; i < rol.length; i++) {
        if (rol[i].name === "supervisor") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Necesitas rol de supervisor!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };
  
 verify.isAdmin = async (req, res, next) => {
    try {
      const user = await usuario.findById(req.usuarioId);
      const rol = await Role.find({ _id: { $in: user.rol } });
  
      for (let i = 0; i < rol.length; i++) {
        if (rol[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Necesita rol de administrador!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };


export default verify