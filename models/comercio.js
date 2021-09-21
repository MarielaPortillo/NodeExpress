import  Mongoose  from "mongoose";


const comercioSchema=Mongoose.Schema({

    nombre: {type:String, require:true},
    direccion: {type:String, require:true},


})

export default Mongoose.model('Comercio',comercioSchema)