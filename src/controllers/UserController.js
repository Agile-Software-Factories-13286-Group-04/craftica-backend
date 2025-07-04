import {Router} from 'express';
const router = Router();

import userModel from "../models/UserModel.js";

//-----------------CRUD USUARIOS-----------------
//#Get
router.get("/usuarios", async (req,res) => {
    const users = await userModel.find();
    res.json(users);
});

//#Post
router.post("/usuarios", async (req, res) => {
    try{
        // Generar un ID único para el nuevo usuario
        const lastUser = await userModel.findOne().sort({ _id: -1 });
        const newId = lastUser ? lastUser._id + 1 : 1;
        
        // Crear el usuario con el ID generado
        const userData = {
            _id: newId,
            ...req.body
        };
        
        const user = new userModel(userData);
        await user.save();
        
        res.status(201).json({ status: 'Usuario agregado', user });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Error al agregar el usuario' });
    }
});

//#Get by id
router.get("/usuarios/:id", async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.json(user);
});

//#Put
router.put("/usuarios/:id", async (req, res) => {
    try {
        await userModel.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).json({ status: "Usuario Actualizado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
});

//#Delete
router.delete("/usuarios/:id", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ status: "Usuario no encontrado" });
        }

        await userModel.findByIdAndDelete(req.params.id);

        res.json({ status: "Usuario Eliminado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
});

//Login
router.post("/usuarios/login", async (req, res) => {
    try {
        const user = await userModel.findOne({ credencial: req.body});

        if (!user) {
            return res.status(404).json({ status: "Usuario no encontrado" });
        }
        
        if (user.contrasena !== req.body.contrasena) {
            return res.status(401).json({ status: "Contraseña incorrecta" });
        }
        
        res.json({ status: "Usuario logueado", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});

//Exportamos el Controlador
export default router;
