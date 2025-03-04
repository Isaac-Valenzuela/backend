// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

// Importar la variable routerUsuarios
import routerUsuarios from './routers/usuario_routes.js'

// Importar la variable routerEstudiantes
import routerEstudiantes from './routers/estudiante_routes.js'


// Importar la variable routerMaterias
import routerMaterias from './routers/materias_routes.js'


// Importar la variable routerMatriculas
import routerMatriculas from './routers/matricula_routes.js'




// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 5000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales



// Rutas 
app.use('/api',routerUsuarios)
app.use('/api',routerEstudiantes)
app.use('/api',routerMatriculas)
app.use('/api',routerMaterias)



// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))



// Exportar la instancia de express por medio de app
export default  app