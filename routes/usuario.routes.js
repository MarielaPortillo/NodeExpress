import Router from "express"
import uController from "../controllers/usuarioController.js"
const ruta = Router();
import verify from '../middleware/autenticar.js'
import chechRoles from '../middleware/chechRoles.js'
import aController from "../controllers/autenticar.js"

/**
 * @swagger
 * components:
 *  parameters:
 *      token:
 *          in: header
 *          name: x-access-token
 *          schema:
 *              type: string
 *              format: JWT
 *          required: true
 *      idUser:
 *          in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: id del Usuario
 *  schemas:
 *      Usuario:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              rol:
 *                  type: string
 *          required:
 *              - username
 *              - email
 *              - password
 *              - rol
 *          example:
 *              username: admin
 *              email: admin123@gmail.com
 *              password: "admin123"
 *              rol: [admin, supervisor]
 */

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Operaciones de Usuarios
 */

/** 
 * @swagger
 * /listadoUsuarios:
 *  get:
 *      summary: Obtener Usuarios
 *      tags: [Usuarios]
 *      description: Obteniendo todos
 *      parameters:
 *        - name: x-access-token
 *          in: header
 *      produces: 
 *        - application/json
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
 *      tags: [Usuarios]
 *      description: Buscando
 *      produces: 
 *             - application/json
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
 * /signup:
 *  post:
 *      summary: Creando nuevo usuario
 *      tags: [Usuarios]
 *      description: Creando
 *      parameters:
 *          - $ref: '#/components/parameters/token'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Usuario'
 *      responses:
 *          201:
 *              description: El usuario se creo exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Usuario'
 *          500:
 *              description: Ocurrio un error
 * 
 */
 ruta.post(
    "/signup",
    [verify.verfiyToken,
    verify.isAdmin,
    chechRoles.checkRolesExisted,
    chechRoles.checkDuplicateUsernameOrEmail],
    aController.registrar
  );

/**
 * @swagger
 * /editarUsuario/{id}:
 *  put:
 *      summary: Update usuario por Id
 *      tags: [Usuarios]
 *      description: Updated
 *      parameters:
 *        - $ref: '#/components/parameters/idUser'
 *        - $ref: '#/components/parameters/token'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Usuario'
 *      responses:
 *          200:
 *              description: El usuario se creo exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Usuario'
 *          404:
 *              description: El usuario no fue encontrado
 *          500:
 *              description: Ocurrio un error
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
 *      tags: [Usuarios]
 *      description: Eliminando
 *      produces: 
 *             - application/json
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

