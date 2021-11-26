//Importing module
const express = require('express')
const app = express()
const routes = require('./routes/index')
var cors = require('cors')
let jsonParser = require('body-parser').json()
app.use(jsonParser)
app.use(cors())

//swagger import and settings
const swaggerJsdocs = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "TODO Application API",
            description: "TODO Application API",
            contact: "Debanjan Dasgupta",
            server: ['http://127.0.0.1:4040']
        }
    },
    apis: ['server.js']
}
const swaggerDocs = swaggerJsdocs(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));


//Swagger declaration
/**
 * @swagger
 * /api/operations/register:
 *  post: 
 *      description: "This url request can be used for registering the user"
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            schema:
 *                type: object
 *                properties:
 *                    fullname: 
 *                        type: string
 *                        required: true
 *                    email:
 *                        type: string
 *                        required: true
 *                    password:
 *                        type: string
 *                        required: true
 *                example:
 *                    fullname: Debanjan
 *                    email: debanjan@test.com
 *                    password: test
 *      responses:
 *          200:
 *              description: Success.
 */


/**
 * @swagger
 * /api/operations/login:
 *  post: 
 *      description: "This url request can be used for logging in the user"
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: body
 *            schema:
 *                type: object
 *                properties:
 *                    email:
 *                        type: string
 *                        required: true
 *                    password:
 *                        type: string
 *                        required: true
 *                example:
 *                    email: debanjan@test.com
 *                    password: test
 *      responses:
 *          200:
 *              description: Success.
 */

/**
 * @swagger
 * /api/operations/add_todo:
 *  post: 
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *                type: string
 *                required: true
 *          - in: body
 *            name: body
 *            schema:
 *                type: object
 *                properties:
 *                    title:
 *                        type: string
 *                        required: true
 *                    content:
 *                        type: string
 *                        required: true
 *                example:
 *                    title: Hello
 *                    content: Hello from app.
 *      responses:
 *          '200':
 *              description: Success.
 */

/**
 * @swagger
 * /api/operations/delete_todo:
 *  post: 
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *                type: string
 *                required: true
 *          - in: body
 *            name: body
 *            schema:
 *                type: object
 *                properties:
 *                    todo_id:
 *                        type: integer
 *                        required: true
 *                example:
 *                    todo_id: 1
 *      responses:
 *          '200':
 *              description: Success.
 */
/**
 * @swagger
 * /api/operations/get_todo:
 *  get: 
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *                type: string
 *                required: true
 *      responses:
 *          '200':
 *              description: Success.
 */

// Routes declaration
app.use('/api/operations', routes)


// Starting app
const port = process.env.PORT || 4040
app.listen(port, () => {console.log(`listening to ${port}`)})