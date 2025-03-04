// Importar el Schema y el modelo de mongoose
import {Schema, model} from 'mongoose'
// Importar bcrypt para cifrar las contraseñas
import bcrypt from "bcryptjs"


// Crear el Schema "atributos de la tabla de la BDD"
const UsuarioSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
})

// Método para cifrar el password del usuario
UsuarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
UsuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
UsuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

// Crear el Modelo Usuario "Tabla BDD" en base al esquema llamado veterinarioSchema
// Luego exportar el modelo
export default model('Usuario',UsuarioSchema)