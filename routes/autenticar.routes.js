import Router from "express"
import aController from "../controllers/autenticar.js"
const ruta = Router();
import verify from '../middleware/autenticar.js'
//import chechRoles from '../middleware/chechRoles.js'

/**
 * @swagger
 * definitions:
 *  ModeloUsuario:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 * 
 */


/**
 * @swagger
 * /signup:
 *  post:
 *      summary: Creando usuario
 *      description: Creando
 *      produces: 
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: agregando 
 *            schema:
 *              type: string
 *              format: string
 *      responses:
 *          201:
 *              description: Creado exitosamente
 * 
 */
ruta.post(
    "/signup",
    [
      verify.verfiyToken, 
      verify.isAdmin
    ],
    aController.registrar
  );
  //[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  ruta.post("/signin", aController.login);

  export default ruta