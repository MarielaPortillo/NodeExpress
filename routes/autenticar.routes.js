import Router from "express"
import aController from "../controllers/autenticar.js"
const ruta = Router();
import verificacion from '../middleware/verificacion.js'

ruta.post(
    "/signup",
    
    aController.registrar
  );
  //[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  ruta.post("/signin", aController.login);

  export default ruta