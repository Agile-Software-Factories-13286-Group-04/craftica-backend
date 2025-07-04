//Importamos Framework express
import express from "express";

//Importamos el cors para permitir el acceso a la API
import cors from "cors";

//Generamos la app Web
const app = express();

//Mostrar un HTML en el navegador
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, './shared/');

//Importamos el modulo de ruta de la base de datos
import database from './database.js';

app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(publicPath));

//Activamos el cors para permitir el acceso a la API
app.use(cors());

// Función async para manejar las importaciones dinámicas
async function startServer() {
    //Importamos el modelos de la base de datos
    app.use((await import("./routes/index.routes.js")).default);
    app.use((await import("./models/StoreModel.js")).default);
    app.use((await import("./models/ProductModel.js")).default);
    app.use((await import("./models/UserModel.js")).default);
    app.use((await import("./models/PublicationModel.js")).default);
    app.use((await import("./models/CommentModel.js")).default);
    app.use((await import("./models/ReactionModel.js")).default);

    //Definimos el puerto del servicio web
    app.listen(3000);
    console.log("Server on port", 3000);

    app.get('/', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
}

// Ejecutamos la función
startServer().catch(console.error);