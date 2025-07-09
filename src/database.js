import mongoose from "mongoose";

//entorne de produccion, cuando hablen los contenedores
mongoose
  .connect(
    "mongodb+srv://raydelcarmen45:sJ7EPv3ZGPTf1emm@craftica-backend.dozreis.mongodb.net/craftica_backend_database?retryWrites=true&w=majority"
  )
  //mongoose.connect("mongodb://database/Uma_Database")
  .then((db) => console.log("DB is connected to", db.connection.host))
  .catch((err) => console.error(err));

export default mongoose;
