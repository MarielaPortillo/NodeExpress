import Router from "express"
import uController from "../controllers/usuarioController.js"
const ruta = Router();
import verificacion from '../middleware/verificacion.js';
import verify from '../middleware/autenticar.js'
import chechRoles from '../middleware/chechRoles.js'

ruta.get("/listadoUsuarios",[
    verify.verfiyToken, 
    verify.isAdmin, 
    ],uController.listadou);

ruta.get("/buscarUsuario/:id", uController.uno);

ruta.put("/editarUsuario/:id",
    uController.actualizar);

//delete

ruta.delete("/eliminarUsuario/:id",[
    verify.verfiyToken, 
    verify.isAdmin, 
    ], 
    uController.eliminar)

export default ruta

