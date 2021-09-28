import Router from "express"
import aController from "../controllers/autenticar.js"
const ruta = Router();
import verify from '../middleware/autenticar.js'
import chechRoles from '../middleware/chechRoles.js'

/**
 * @swagger
 * tags:
 *  name: Autenticar
 *  description: Operaciones de autenticacion de usuarios
 */
/**
 * @swagger
 * /signup:
 *  post:
 *      summary: Creando nuevo usuario
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
    chechRoles.checkRolesExisted,
    chechRoles.checkDuplicateUsernameOrEmail,
    aController.registrar
  );
  //[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
  /**
 * @swagger
 * /signin:
 *  post:
 *      summary: Login usuario
 *      description: Logueando con usuario 
 *      produces: 
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: login 
 *            schema:
 *              type: string
 *              format: string
 *      responses:
 *          201:
 *              description: Logueado exitosamente
 *              schema:
 *                  type: json
 * 
 */
  ruta.post("/signin", aController.login);

  export default ruta