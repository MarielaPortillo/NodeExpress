import Router from "express"
import cController from "../controllers/comercioController.js"
import verify from "../middleware/autenticar.js";
import checkCate from "../middleware/chechRoles.js"

const ruta = Router();

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
 *      id:
 *          in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          example: 614956586cd61b7b04afbee0
 *          description: id del Comercio
 *  schemas:
 *      Comercio:
 *          type: object
 *          properties:
 *              nombreComercio:
 *                  type: string
 *              propietario:
 *                  type: string
 *              coordenadas:
 *                  type: string
 *              telefono:
 *                  type: string
 *              redes_sociales:
 *                  type: string
 *              categoria:
 *                  type: string
 *              descripcion:
 *                  type: string
 *              logo:
 *                  type: string
 *          example:
 *              nombreComercio: Comercio 04
 *              propietario: Leon Belmont
 *              coordenadas: "40° 24' 59'' N; 03° 42' 09'' O"
 *              telefono: 73396763
 *              redes_sociales: facebook instagram
 *              categoria: [Celulares]
 *              descripcion: Comercio de celulares
 *              logo: https://controlpublicidad.com/uploads/2018/03/pringles-104400.gif
 */

/**
 * @swagger
 * tags:
 *  name: Comercios
 *  description: Operaciones de comercios
 */

 /**
 * @swagger
 * /listadoComercios:
 *  get:
 *      summary: Obtener comercios
 *      tags: [Comercios]
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
   *      tags: [Comercios]
   *      description: Obteniendo Uno
   *      produces: 
   *             - application/json
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
  
/**
 * @swagger
 * /registrar:
 *  post:
 *      summary: Creando comercio
 *      tags: [Comercios]
 *      description: Creando nuevo comercio
 *      parameters:
 *        - $ref: '#/components/parameters/token'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comercio'
 *      responses:
 *          201:
 *              description: El comercio se creo exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comercio'
 *          500:
 *              description: Ocurrio un error
   * 
   */
  
   ruta.post("/registrar", 
      [verify.verfiyToken, 
       verify.isAdmin, 
       checkCate.checkCategoriaExisted],
       cController.registrar);
  
/**
 * @swagger
 * /eliminarComercio/{id}:
 *  delete:
 *      summary: Eliminando comercio por id
 *      description: Eliminando
 *      tags: [Comercios]
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *        - $ref: '#/components/parameters/token'
 *      responses:
 *          200:
 *              description: Comercio eliminado
 *          404:
 *              description: El comercio no fue encontrado
 *          500:
 *              description: ocurrio un error
 * 
 */
  
   ruta.delete("/eliminarComercio/:id",
      [verify.verfiyToken, 
      verify.isAdmin],
      cController.eliminar)
  
/**
 * @swagger
 * /editarComercio/{id}:
 *  put:
 *      summary: Update comercio por Id
 *      description: Creando
 *      tags: [Comercios]
 *      parameters:
 *        - $ref: '#/components/parameters/id'
 *        - $ref: '#/components/parameters/token'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comercio'
 *      responses:
 *          200:
 *              description: El comercio se creo exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comercio'
 *          500:
 *              description: ocurrio un error
 * 
 */
  
   ruta.put("/editarComercio/:id",
   [verify.verfiyToken,
      verify.isAdmin,
      checkCate.checkCategoriaExisted],
      cController.actualizar)
export default ruta 
