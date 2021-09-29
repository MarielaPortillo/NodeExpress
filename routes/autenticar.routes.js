import Router from "express"
import aController from "../controllers/autenticar.js"
const ruta = Router();
import verify from '../middleware/autenticar.js'
import chechRoles from '../middleware/chechRoles.js'

/**
 * @swagger
 * components:
 *  schemas:
 *      Autenticar:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: belmont@gmail.com
 *              password: 1234
 *      res:
 *          type: object
 *          properties:
 *              mensaje:
 *                  type: string
 *              token:
 *                  type: string
 *          
 */

/**
 * @swagger
 * tags:
 *  name: Autenticacion
 *  description: Generacion de tokens de accesos
 */

/**
 * @swagger
 * /signin:
 *  post:
 *      summary: Generar un nuevo token
 *      tags: [Autenticacion]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Autenticar'
 *      responses:
 *          200:
 *              description: El token fue generado con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/res'
 *          500:
 *              description: Ocurrio un error
 * 
 */
 ruta.post("/signin", aController.login);


  export default ruta