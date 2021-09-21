import  Mongoose  from "mongoose";

Mongoose
try {
    Mongoose.connect( 'mongodb+srv://admin:1234@cluster0.u1fwz.mongodb.net/EmprendeApp', {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }



//.connect("mongodb://localhost/emprendeapp")
//.connect('mongodb+srv://admin:1234@cluster0.u1fwz.mongodb.net/EmprendeApp')
//.then((db)=>console.log("Ya en linea XD"))
//.catch((err)=>console.log("No se conecta :("));


export default Mongoose

//'mongodb+srv://admin:1234@cluster0.u1fwz.mongodb.net/EmprendeApp?retryWrites=true&w=majority';
