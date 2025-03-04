
import mongoose from "mongoose";
import Matricula from "../models/Matricula.js"




const listarMatricula = async (req, res) => {
    try {
        // Filtramos por matriculas cuyo 'status' sea true
        const matriculas = await Matricula.find().populate("id_estudiante").populate("id_materia");
            
        // Si no se encuentran matriculas, respondemos con un mensaje adecuado
        if (matriculas.length === 0) {
            return res.status(404).json({ msg: "No se encontraron matriculas activas." });
        }

        res.status(200).json(matriculas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error al obtener las matriculas." });
    }
};

// Método para ver el detalle del matricula
const detalleMatricula = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe esa Matricula`});
    const matriculas = await Matricula.findById(id)
  .populate({ path: 'id_estudiante', select: '_id nombre apellido' })
  .populate({ path: 'id_materia', select: '_id nombre' });
    res.status(200).json(matriculas)
}



// Método para crear el matricula
const registrarMatricula = async (req,res)=>{
    const {id_estudiante} = req.body
    if( !mongoose.Types.ObjectId.isValid(id_estudiante) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const matricula = await Matricula.create(req.body)
    res.status(200).json({msg:`Registro exitoso de la matricula ${matricula._id}`})
}




// Método para actualizar el tratamiento
const actualizarMatricula = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la matricula ${id}`})
    await Matricula.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa de la matricula"})
}





// Método para eliminar la matricula
const eliminarMatricula = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe esa matricula`})
    await Matricula.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Matricula eliminada exitosamente"})
}


// Método para cambiar el estado del matricula
const cambiarEstado = async(req,res)=>{

    await Matricula.findByIdAndUpdate(req.params.id,{estado:false})
    res.status(200).json({msg:"Estado de la matricula modificada exitosamente"})
}







export {
    detalleMatricula,
    registrarMatricula,
    actualizarMatricula,
    eliminarMatricula,
    cambiarEstado,
    listarMatricula
}