// Importar Router de Express
import {Router} from 'express'

// Crear una instancia de Router() 
const router = Router()

// Importar los métodos del controlador 
import {
    login,
    registro,
    confirmEmail,
    detalleUsuario
} from "../controllers/usuario_controller.js";
import verificarAutenticacion from '../middlewares/autenticacion.js';

// Rutas publicas
router.post("/login", login);

router.post("/registro" , registro);

router.get("/confirmar/:token", confirmEmail);

router.get("/perfil/:id",verificarAutenticacion, detalleUsuario);


// Exportar la variable router
export default router






