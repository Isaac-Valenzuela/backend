import mongoose, {Schema,model} from 'mongoose'



const matriculaSchema = new Schema({
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
    estado:{
        type:Boolean,
        require:true,
        default:true
    },
    id_estudiante:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Estudiante',
        require:true
    },
    id_materia:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Materias',
        require:true
    }
},{
    timestamps:true
})

export default model('Matricula',matriculaSchema)