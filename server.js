
import  express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { engine } from "express-handlebars"



import indexRouter from "./src/router/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import pathHandler from "./src/middlewares/pathHandler.js"
import __dirname from "./utils.js"
import morgan from "morgan"
import socketCb from "./src/router/index.socket.js"



//init
const server = express()
const port = 8080
const ready = () => console.log(`server ready in ${port}`)
const nodeServer = createServer(server)
const socketServer = new Server(nodeServer)
export default socketServer
socketServer.on("connection", socketCb)
nodeServer.listen(port, ready)


//middlewares
server.use(express.json())                           //manejar jsons
server.use(express.urlencoded({ extended: true }))    //leer params y queries
server.use(express.static('public'))

//template engine
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')


//router   ... orden correcto
server.use("/", indexRouter)           //primero leer todas las rutas
server.use(errorHandler)               //catchear los errores de endpoints
server.use(pathHandler)                //errores de ruta
server.use(morgan("dev"))




