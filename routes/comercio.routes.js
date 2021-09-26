import Router from "express"
import cController from "../controllers/comercioController.js"
import verify from "../middleware/autenticar.js";
const rutaComercio = Router();

 rutaComercio.get("/listadoComercios",cController.listado);

 rutaComercio.get("/uno/:id",cController.uno)

 rutaComercio.post("/registrar", [verify.verfiyToken, verify.isAdmin],cController.registrar)


 rutaComercio.delete("/eliminarComercio/:id",cController.eliminar)

 rutaComercio.put("/editarComercio/:id",cController.actualizar)
export default rutaComercio 