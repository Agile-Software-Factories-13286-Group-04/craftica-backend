import mongoose from "mongoose";

const userSchema =  new mongoose.Schema(
    {
        _id: Number,
        nombres: {type:String},
        apellidos: {type:String},
        telefono: {type:String},
        foto: {type:String},
        credencial: {
            correo: {type:String},
            password: {type:String},
        },
        localidad: {
            direccion: {type:String},
            ciudad: {type:String},
            pais: {type:String},
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

//Exportamos el modelo
const UserModel = mongoose.model("usuarios", userSchema);

export default UserModel;
