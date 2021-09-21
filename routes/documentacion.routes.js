import Router from "express"
import aController from "../controllers/autenticar.js"
const ruta = Router();
import cController from "../controllers/comercioController.js"
import verify from '../middleware/autenticar.js'
import uController from "../controllers/usuarioController.js"
import verify from '../middleware/autenticar.js'
import chechRoles from '../middleware/chechRoles.js'


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

/**
 * @swagger
 * /listadoUsuarios:
 *  get:
 *      summary: Obtener Usuarios
 *      description: Obteniendo todos
 *      produces: 
 *          - application/json
 *      responses:
 *          200:
 *              description: Todos los Usuarios
 *              schema:
 *              type: json
 * 
 */
 ruta.get("/listadoUsuarios", uController.listadou)
 /**
  * @swagger
  * /editarUsuario/{id}:
  *  put:
  *      summary: Update usuario por Id
  *      description: Creando
  *      produces: 
  *          - application/json
  *      parameters:
  *          - name: id
  *            in: path
  *            description: Id del usuario
  *          - in: body
  *            name: update 
  *            schema:
  *              type: string
  *              format: string
  *      responses:
  *          201:
  *              description: Un usuario
  *              schema:
  *              type: json
  * 
  */
 ruta.put("/editarUsuario/:id" ,[
     verify.verfiyToken, 
     verify.isAdmin, 
     chechRoles.checkRolesExisted
     ],
     uController.actualizar);
 
 //delete
 /**
  * @swagger
  * /eliminarUsuario/{id}:
  *  delete:
  *      summary: Eliminando usuario por id
  *      description: Eliminando
  *      produces: 
  *          - application/json
  *          - x-access-token
  *      parameters:
  *             - in: path
  *               name: id
  *               description: Ingrese el id a eliminar
  *      responses:
  *          200:
  *              description: Un usuario
  *              schema:
  *              type: json
  * 
  */
 ruta.delete("/eliminarUsuario/:id",[
     verify.verfiyToken, 
     verify.isAdmin, 
     ], 
     uController.eliminar)
//listar todos
/**
 * @swagger
 * /listadoComercios:
 *  get:
 *      summary: Obtener comercios
 *      description: Obteniendo todos
 *      produces: 
 *          - application/json
 *      responses:
 *          200:
 *              description: Todos los comercios
 *              schema:
 *              type: json
 * 
 */
 ruta.get("/listadoComercios",cController.listado);
/**
 * @swagger
 * /uno/{id}:
 *  get:
 *      summary: Obtener un comercio
 *      description: Obteniendo Uno
 *      produces: 
 *          - application/json
 *      parameters:
 *             - in: path
 *               name: id
 *               description: Id del comercio
 *      responses:
 *          200:
 *              description: Un comercio
 *              schema:
 *              type: json
 * 
 */
 ruta.get("/uno/:id",cController.uno)

// Creando definicion de datos

/**
 * @swagger
 * definitions:
 *  nuevocomercio:
 *      type: object
 *      properties:
 *          nombre:
 *              type: string
 *          direccion:
 *              type: string
 * 
 */


/**
 * @swagger
 * /registrar:
 *  post:
 *      summary: Creando comercio
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
 ruta.post("/registrar", [verify.verfiyToken, verify.isAdmin],cController.registrar)

//delete
/**
 * @swagger
 * /eliminarComercio/{id}:
 *  delete:
 *      summary: Eliminando comercio por id
 *      description: Eliminando
 *      produces: 
 *          - application/json
 *      parameters:
 *             - in: path
 *               name: id
 *               description: Ingrese el id a eliminar
 *      responses:
 *          200:
 *              description: Un comercio
 *              schema:
 *              type: json
 * 
 */
 ruta.delete("/eliminarComercio/:id",cController.eliminar)

/**
 * @swagger
 * /editarComercio/{id}:
 *  put:
 *      summary: Update comercio por Id
 *      description: Creando
 *      produces: 
 *          - application/json
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del comercio
 *          - in: body
 *            name: update 
 *            schema:
 *              type: string
 *              format: string
 *      responses:
 *          201:
 *              description: Un comercio
 *              schema:
 *              type: json
 * 
 */
 ruta.put("/editarComercio/:id",cController.actualizar)

 export default ruta