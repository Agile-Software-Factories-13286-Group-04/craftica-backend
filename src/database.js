// database.js
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const uri =
      "mongodb+srv://raydelcarmen45:sJ7EPv3ZGPTf1emm@craftica-backend.dozreis.mongodb.net/craftica_backend_database?retryWrites=true&w=majority";

    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ DB is connected to", db.connection.host);
  } catch (err) {
    console.error("❌ Error conectando a la base de datos:", err);
    throw err;
  }
}
