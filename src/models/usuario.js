import  Mongoose  from "mongoose";
import  bcrypt  from "bcryptjs";




const usuarioSchema=Mongoose.Schema(
  {
    username: {type:String, require:true, unique:true},
    email: {type:String, require:true, unique:true},
    password: {type:String, require:true},
    rol: [{
      ref: "Role",
      type: Mongoose.Schema.Types.ObjectId
    }]


  },
  {
    timestamps: true,
    versionKey: false
  }
) 
usuarioSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  usuarioSchema.statics.matchPassword = async function (password, receivedPass) {
    return await bcrypt.compare(password, receivedPass);
  };


export default Mongoose.model('Usuario',usuarioSchema)