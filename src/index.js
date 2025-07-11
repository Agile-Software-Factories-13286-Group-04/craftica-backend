//Importamos Framework express
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "./shared/");

import database from "./database.js";

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));

// Ruta principal para probar disponibilidad
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Inicializa el servidor
async function startServer() {
  try {
    // Conexión a BD (asegúrate que database.js haga la conexión)
    await database();

    // Importación de modelos (solo para que se registren)
    await import("./models/StoreModel.js");
    await import("./models/ProductModel.js");
    await import("./models/UserModel.js");
    await import("./models/PublicationModel.js");
    await import("./models/CommentModel.js");
    await import("./models/ReactionModel.js");

    // Rutas
    const routes = (await import("./routes/index.routes.js")).default;
    app.use(routes);

    // Puerto
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
}

startServer();
