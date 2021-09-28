import Mongoose from 'mongoose';

export const Categorias = ["Ropa", "Zapatos", "Cosmeticos", "Celulares", "Comida",]

const categoriaSchema=Mongoose.Schema({

    categoria: { type: String, min: 4, require: true },
})

export default Mongoose.model('Categoria',categoriaSchema)