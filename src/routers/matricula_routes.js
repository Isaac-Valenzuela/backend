import {Router} from 'express'
const router = Router()

import {
    detalleMatricula,
    registrarMatricula,
    actualizarMatricula,
    eliminarMatricula,
    cambiarEstado,
    listarMatricula,
    
} from "../controllers/matricula_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";


// Ruta para crear la matricula
router.post('/matricula/registro',verificarAutenticacion,registrarMatricula)

router.get("/matricula",verificarAutenticacion,listarMatricula);

// Ruta para ver el detalle de la matricula
router.get('/matricula/:id',verificarAutenticacion,detalleMatricula)

// Ruta para actualizar de la matricula
router.put('/matricula/actualizar/:id',verificarAutenticacion,actualizarMatricula)

// Ruta para eliminar de la matricula
router.delete('/matricula/eliminar/:id',verificarAutenticacion,eliminarMatricula)


// Ruta para cambiar el estado de la matricula
router.post('/matricula/estado/:id',verificarAutenticacion,cambiarEstado)




export default router