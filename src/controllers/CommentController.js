import {Router} from 'express';
const router = Router();

import commentModel from "../models/CommentModel.js";
import userModel from "../models/UserModel.js";
import publicationModel from "../models/PublicationModel.js";

//-----------------CRUD COMENTARIOS-----------------

//#Get
router.get("/comentarios", async (req, res)=>{
    const comments= await commentModel.find();
    res.json(comments);
});

//#Post
router.post("/comentarios", async (req, res) => {
    try {

        //Validar que exista la publicacion y el usuario
        const user = await userModel.findById(req.body.usuario_id);
        const publicacion = await publicationModel.findById(req.body.publicacion_id);

        if (!user) {
            return res.status(404).json({ status: "Usuario no encontrado" });
        }

        if (!publicacion) {
            return res.status(404).json({ status: "Publicacion no encontrada" });
        }

        // Generar un ID único para el nuevo comentario
        const lastComment = await commentModel.findOne().sort({ _id: -1 });
        const newId = lastComment ? lastComment._id + 1 : 1;

        //Crear el comentario y añadirle la fecha e ID
        const commentData = {
            _id: newId,
            ...req.body,
            fecha: new Date(),
            megusta: 0
        };

        const comment = new commentModel(commentData);
        await comment.save();
        
        res.status(201).json({ status: "Comentario agregado", comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al agregar el comentario" });
    }
});

//#Get by id
router.get('/comentarios/:id', async (req, res) => {
    const comment= await commentModel.findById(req.params.id);
    res.json(comment);
});

//#Put
router.put('/comentarios/:id', async (req, res) => {
    try { 
        await commentModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200)({ status: "Comentario Actualizado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar el comentario" });
    }
}
);

//#Delete
router.delete("/comentarios/:id", async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ status: "Comentario no encontrado" });
        }

        await commentModel.findByIdAndDelete(req.params.id);

        res.json({ status: "Comentario Eliminado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar el comentario" });
    }
});

//Comentarios por publicacion

router.get("/comentarios/publicacion/:id", async (req, res)=>{
    try {
        const comments= await commentModel.find({publicacion_id: req.params.id});

        if (!comments) {
            return res.status(404).json({ status: "Comentarios no encontrados" });
        }

        // Mapear los comentarios y los detalles del usuario

        const commentResponse = await Promise.all(comments.map(async (comment) => {
            const user = await userModel.findById(comment.usuario_id);
 

            if (!user) {
                return {
                    _id: comment._id,
                    comentario: comment.comentario,
                    fecha: comment.fecha,
                    megusta: comment.megusta,
                    usuario: null
                };
            }   

            return {
                _id: comment._id,
                comentario: comment.comentario,
                fecha: comment.fecha,
                megusta: comment.megusta,
                usuario: {
                    _id: user._id,
                    nombres: user.nombres,
                    apellidos: user.apellidos,
                    correo: user.credencial.correo,
                    foto: user.foto
                }
            };
        }));

        res.json(commentResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los comentarios" });
    }
});

//Exportamos el Controlador
export default router;
