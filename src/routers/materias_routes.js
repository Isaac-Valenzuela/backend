import {Router} from 'express'
const router = Router()

import {
    listarMaterias,
    detalleMaterias,
    registrarMaterias,
    actualizarMateria,
    eliminarMateria
} from "../controllers/materias_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";


router.get("/materias",verificarAutenticacion,listarMaterias);
router.get("/materias/:id",verificarAutenticacion, detalleMaterias);
router.post("/materias/registro", verificarAutenticacion,registrarMaterias);
router.put("/materias/actualizar/:id", verificarAutenticacion,actualizarMateria);
router.delete("/materias/eliminar/:id", verificarAutenticacion,eliminarMateria);


export default router