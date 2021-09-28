import Router from "express"
import uController from "../controllers/usuarioController.js"
const ruta = Router();
import verify from '../middleware/autenticar.js'
import chechRoles from '../middleware/chechRoles.js'

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Operaciones con usuarios
 */
/**
 * @swagger
 * /listadoUsuarios:
 *  get:
 *      summary: Obtener Usuarios
 *      description: Obteniendo todos
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *      produces: 
 *          - application/json
 *      responses:
 *          200:
 *              description: Todos los Usuarios
 *              schema:
 *              type: json
 * 
 */
ruta.get("/listadoUsuarios",[
    verify.verfiyToken, 
    verify.isAdmin, 
    ],uController.listadou);

/**
  * @swagger
  * /buscarUsuario/{id}:
  *  get:
  *      summary: Buscando usuario por id
  *      description: Buscando
  *      produces: 
  *          - application/json
  *      parameters:
  *             - name: x-access-token
  *               in: header
  *             - in: path
  *               name: id
  *               description: Ingrese el id a buscar
  *      responses:
  *          200:
  *              description: Un usuario
  *              schema:
  *              type: json
  * 
  */
ruta.get("/buscarUsuario/:id",[
    verify.verfiyToken, 
    verify.isAdmin, 
    ], uController.uno);

/**
  * @swagger
  * /editarUsuario/{id}:
  *  put:
  *      summary: Update usuario por Id
  *      description: Updated
  *      produces: 
  *          - application/json
  *      parameters:
  *          - name: x-access-token
  *            in: header
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
ruta.put("/editarUsuario/:id",[
    verify.verfiyToken, 
    verify.isAdmin, 
    chechRoles.checkRolesExisted
    ],
    uController.actualizar);


/**
  * @swagger
  * /eliminarUsuario/{id}:
  *  delete:
  *      summary: Eliminando usuario por id
  *      description: Eliminando
  *      produces: 
  *          - application/json
  *      parameters:
  *             - name: x-access-token
  *               in: header
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
//delete
ruta.delete("/eliminarUsuario/:id",[
    verify.verfiyToken, 
    verify.isAdmin, 
    ], 
    uController.eliminar)

export default ruta

