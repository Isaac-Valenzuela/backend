
// Importar el modelo 
import generarJWT from "../helpers/crearJWT.js"
import Usuario from "../models/Usuario.js";
import mongoose from "mongoose";
import { sendMailToUser } from "../config/nodemailer.js"


// Método para el login
const login = async(req,res)=>{
    const {email,password} = req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const usuarioBDD = await Usuario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    
    if(usuarioBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    
    if(!usuarioBDD) return res.status(404).json({msg:"El usuario es incorrecto"})
    
    const verificarPassword = await usuarioBDD.matchPassword(password)
    
    if(!verificarPassword) return res.status(404).json({msg:"El password es incorrecto"})
    

    const token = generarJWT(usuarioBDD._id,"usuario")

    const {nombre,apellido,_id} = usuarioBDD
    
    res.status(200).json({
        token,
        nombre,
        apellido,
        _id,
        email:usuarioBDD.email,
    })
}



// Método para el registro
const registro = async (req,res)=>{
    // Desestructurar los campos 
    const {email,password} = req.body
    // Validar todos los campos llenos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    // Obtener el usuario de la BDD en base al email
    const verificarEmailBDD = await Usuario.findOne({email})
    // Validar que el email sea nuevo
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    // Crear la instancia del usuario
    const nuevoUsuario = new Usuario(req.body)
    // Encriptar el password
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)
    //Crear el token 
    const token = nuevoUsuario.crearToken()
    // Invocar la función paara el envío de correo 
    await sendMailToUser(email,token)
    // Guaradar en BDD
    await nuevoUsuario.save()
    // Imprimir el mensaje
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}



const detalleUsuario = async (req, res) => {
    const { id } = req.params;  // Extraemos el id de los parámetros de la URL

    // Verificamos si el id es un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el usuario con id ${id}` });
    }

    try {
        // Buscamos el usuario por id en la base de datos y excluimos los campos no necesarios
        const usuario = await Usuario.findById(id).select("-createdAt -updatedAt -__v");

        if (!usuario) {
            // Si no se encuentra el usuario, respondemos con un error 404
            return res.status(404).json({ msg: `Usuario no encontrado` });
        }

        // Si todo es correcto, respondemos con los datos del usuario
        res.status(200).json({ usuario });
    } catch (error) {
        // Manejo de errores de la base de datos o cualquier otro error
        console.error(error);
        res.status(500).json({ msg: "Hubo un error al obtener los detalles del usuario" });
    }
};




// Método para confirmar el token
const confirmEmail = async(req,res)=>{

    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})

    const usuarioBDD = await Usuario.findOne({token:req.params.token})

    if(!usuarioBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    
    
    usuarioBDD.token = null

    usuarioBDD.confirmEmail=true

    await usuarioBDD.save()

    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
}


// Exportar cada uno de los métodos
export {
    login,
    registro,
    confirmEmail,
    detalleUsuario
}