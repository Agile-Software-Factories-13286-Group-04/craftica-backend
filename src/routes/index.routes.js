import {Router} from 'express';
const router = Router();

//Importamos los controladores
import userController from "../controllers/UserController.js";
import publicationController from "../controllers/PublicationController.js";
import productController from "../controllers/ProductController.js";
import storeController from "../controllers/StoreController.js";
import commentController from "../controllers/CommentController.js";
import reactionController from "../controllers/ReactionController.js";

//Importamos los controladores en el router
router.use(userController);
router.use(publicationController);
router.use(productController);
router.use(storeController);
router.use(commentController);
router.use(reactionController);

//Exportamos el router al index.js
export default router;