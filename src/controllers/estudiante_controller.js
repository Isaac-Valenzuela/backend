// IMPORTAR EL MODELO
import EStudiante from "../models/EStudiante.js"

import mongoose from "mongoose"


const listarEstudiante = async (req, res) => {
    try {
        // Filtramos por estudiantes cuyo 'status' sea true
        const estudiantes = await EStudiante.find({ ...req.estudianteBDD, status: true }).select("-salida -createdAt -updatedAt -__v");

        // Si no se encuentran estudiantes, respondemos con un mensaje adecuado
        if (estudiantes.length === 0) {
            return res.status(404).json({ msg: "No se encontraron estudiantes activos." });
        }

        res.status(200).json(estudiantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error al obtener los estudiantes." });
    }
};


// Método para ver el detalle de un estudiante en particular
const detalleEstudiante = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `Lo sentimos, no existe el estudiante ${id}` });
    const estudiante = await EStudiante.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json({
        estudiante
    })
}

// Método para registrar un estudiante
const registrarEstudiante = async (req, res) => {
    // desestructurar el email
    const { email } = req.body
    // Validar todos los camposs
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    // Obtener el usuario en base al email
    const verificarEmailBDD = await EStudiante.findOne({ email })
    // Verificar si el estudiante ya se encuentra registrado
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })

    // Crear una instancia del estudiante
    const nuevoEstudiante = new EStudiante(req.body)
    // Guardar en BDD
    await nuevoEstudiante.save()

    // Presentar resultados
    res.status(200).json({ msg: "Registro exitoso del estudiante" })
}




// Método para actualizar un estudiante
const actualizarEstudiante = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `Lo sentimos, no existe el estudiante ${id}` });

    await EStudiante.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json({ msg: "Actualización exitosa del estudiante" })
}



// Método para eliminar(dar de baja) un estudiante
const eliminarEstudiante = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `Lo sentimos, no existe el estudiante ${id}` })

    await EStudiante.findByIdAndUpdate(req.params.id, { status: false }, {new: true})

    res.status(200).json({ msg: "Eliminado/dado de baja" })
}






export {
    listarEstudiante,
    detalleEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}