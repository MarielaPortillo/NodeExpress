import Router from "express"
import cController from "../controllers/comercioController.js"
import verify from "../middleware/autenticar.js";
import checkCate from "../middleware/chechRoles.js"

const rutaComercio = Router();

/**
 * @swagger
 * tags:
 *  name: Comercios
 *  description: Operaciones GET, POST, PUT y DELETE con comercios
 */
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
 rutaComercio.get("/listadoComercios",cController.listado);

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
 rutaComercio.get("/uno/:id",cController.uno)

 /**
 * @swagger
 * /registrar:
 *  post:
 *      summary: Creando comercio
 *      description: Creando
 *      produces: 
 *          - application/json
 *      parameters:
 *          - name: x-access-token
 *            in: header
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
 rutaComercio.post("/registrar", 
    [verify.verfiyToken, 
     verify.isAdmin, 
     checkCate.checkCategoriaExisted,
     cController.registrar]);

     /**
 * @swagger
 * /eliminarComercio/{id}:
 *  delete:
 *      summary: Eliminando comercio por id
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
 *              description: Un comercio
 *              schema:
 *              type: json
 * 
 */
 rutaComercio.delete("/eliminarComercio/:id",
    [verify.verfiyToken, 
    verify.isAdmin,
    cController.eliminar])

 /**
 * @swagger
 * /editarComercio/{id}:
 *  put:
 *      summary: Update comercio por Id
 *      description: Creando
 *      produces: 
 *          - application/json
 *      parameters:
 *          - name: x-access-token
 *            in: header
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
 rutaComercio.put("/editarComercio/:id",
 [verify.verfiyToken,
    verify.isAdmin,
    checkCate.checkCategoriaExisted,
    cController.actualizar])
export default rutaComercio 