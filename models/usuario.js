import  Mongoose  from "mongoose";
import  bcrypt  from "bcryptjs";




const usuarioSchema=Mongoose.Schema({

    email: {type:String, require:true},
    password: {type:String, require:true},
    rol: {type:String, require:true}


}) 
/*usuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  usuarioSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };*/


export default Mongoose.model('Usuario',usuarioSchema)