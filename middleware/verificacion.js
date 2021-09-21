import Express from "express";
import jwt from "jsonwebtoken";
import llave from "./llaveSecreta.js";
const verificacion = Express.Router()

verificacion.use((req,res,next)=>{
    let token=req.header['x-access-token'] || req.headers['authorization']
    if(!token){
        res.status(401).send({ mensaje:"No esta autorizado, tiene que logearse"} ) 
        return
    }
    if(token.startsWith("Bearer ")){
        token=token.slice(7,token.length)
    }

    if(token){
        jwt.verify(token,llave,(error,decoded)=>{
            if (error){
                return res.send({
                        mensaje:
                        'Token Inválido'
                    });
            }
            else{
                req.decoded=decoded
                next();
            }
        })
    }   
})

export default verificacion