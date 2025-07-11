import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        _id: {type: Number},
        nombre: {type: String},
        precio: {type: Number},
        descripcion: {type: String},
        categoria: {type: [String]},

    },
    {
        timestamps: true,
        versionKey: false,
    }
)

//exportamos el modelo
const ProductModel = mongoose.model("productos", productSchema)
export default ProductModel;