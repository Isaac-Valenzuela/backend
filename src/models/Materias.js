import mongoose, {Schema,model} from 'mongoose'
import bcrypt from "bcryptjs"

const materiasSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    codigo:{
        type:String,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    creditos:{
        type:String,
        require:true,
        trim:true
    },status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


export default model('Materias',materiasSchema)