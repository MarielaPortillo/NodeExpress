import Router from "express"
import aController from "../controllers/autenticar.js"
const ruta = Router();
import verify from '../middleware/autenticar.js'
import chechRoles from '../middleware/chechRoles.js'


ruta.post(
    "/signup",
    chechRoles.checkRolesExisted,
    chechRoles.checkDuplicateUsernameOrEmail,
    aController.registrar
  );
  //[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  ruta.post("/signin", aController.login);

  export default ruta