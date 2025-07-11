import {Router} from 'express';
const router = Router();

import reactionModel from "../models/ReactionModel.js";

//-----------------CRUD REACCIONES-----------------

//#Get
router.get("/reacciones", async (req, res)=>{
    const reactions= await reactionModel.find();
    res.json(reactions);
});

//#Post
router.post("/reacciones", async (req, res) => {
    try {
        //Validar si ya existe una reaccion del usuario en una publicacion
        const userReaction = await reactionModel.findOne({publicacion_id: req.body.publicacion_id, usuario_id: req.body.usuario_id});

        if (userReaction) {
            return res.status(500).json({ status: "El usuario ya tiene una reacción", reaction: userReaction });
        }

        // Generar un ID único para la nueva reacción
        const lastReaction = await reactionModel.findOne().sort({ _id: -1 });
        const newId = lastReaction ? lastReaction._id + 1 : 1;

        //Crear la reaccion y añadirle la fecha e ID
        const reactionData = {
            _id: newId,
            ...req.body,
            fecha: new Date()
        };

        const reaction = new reactionModel(reactionData);
        await reaction.save();
        
        res.status(201).json({ status: "Reaccion agregada", reaction });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al agregar la reaccion" });
    }
});

//#Get by id
router.get('/reacciones/:id', async (req, res) => {
    const reaction= await reactionModel.findById(req.params.id);
    res.json(reaction);
}
);

//#Put
router.put('/reacciones/:id', async (req, res) => {
    try {
        await reactionModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ status: "Reaccion Actualizada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar la reaccion" });
    }
}
);

//#Delete
router.delete("/reacciones/:id", async (req, res) => {
    try {
        const reaction = await reactionModel.findById(req.params.id);

        if (!reaction) {
            return res.status(404).json({ status: "Reaccion no encontrada" });
        }

        await reactionModel.findByIdAndDelete(req.params.id);

        res.json({ status: "Reaccion Eliminada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar la reaccion" });
    }
}
);

//Reacciones por publicacion
router.get("/reacciones/publicacion/:id", async (req, res)=>{
    try {
        const reactions= await reactionModel.find({publicacion_id: req.params.id});

        if (!reactions) {
            return res.status(404).json({ status: "Reacciones no encontradas" });
        }

        //Retornar la cantidad de reacciones que son 1
        const reactionCount = reactions.filter(reaction => reaction.reaccion === 1).length;

        res.json({ status: "Cantidad de Likes", cantidad: reactionCount });

        ///res.json(reactions);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener las reacciones" });
    }
});

//Exportamos el Controlador
export default router;
