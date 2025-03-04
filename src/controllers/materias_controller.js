// IMPORTAR EL MODELO
import Materias from "../models/Materias.js"

import mongoose from "mongoose"


const listarMaterias = async (req, res) => {
    try {
        // Filtramos por materias cuyo 'status' sea true
        const materias = await Materias.find({ ...req.materiasBDD, status: true }).select("-createdAt -updatedAt -__v");

        // Si no se encuentran materias, respondemos con un mensaje adecuado
        if (materias.length === 0) {
            return res.status(404).json({ msg: "No se encontraron materias activas." });
        }

        res.status(200).json(materias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error al obtener las materias." });
    }
};


// Método para ver el detalle de una materia en particular
const detalleMaterias = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `Lo sentimos, no existe la materia ${id}` });
    const materias = await Materias.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json({
        materias
    })
}

// Método para registrar una materia
const registrarMaterias = async (req, res) => {
    // desestructurar el codigo
    const { codigo } = req.body
    // Validar todos los camposs
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    // Obtener el nombre en base al codigo
    const verficarCodigoBDD = await Materias.findOne({ codigo })
    // Verificar si la materia ya se encuentra registrado
    if (verficarCodigoBDD) return res.status(400).json({ msg: "Lo sentimos, la materia ya se encuentra registrada" })

    // Crear una instancia de la materia
    const nuevaMateria = new Materias(req.body)
    // Guardar en BDD
    await nuevaMateria.save()

    // Presentar resultados
    res.status(200).json({ msg: "Registro exitoso de la materia" })
}




// Método para actualizar una materia
const actualizarMateria = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `Lo sentimos, no existe la materia ${id}` });

    await Materias.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json({ msg: "Actualización exitosa de la materia" })
}



// Método para eliminar(dar de baja) una materia
const eliminarMateria = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `Lo sentimos, no existe la materia ${id}` })

    await Materias.findByIdAndUpdate(req.params.id, { status: false }, {new: true})

    res.status(200).json({ msg: "Eliminado/dado de baja" })
}






export {
    listarMaterias,
    detalleMaterias,
    registrarMaterias,
    actualizarMateria,
    eliminarMateria
}