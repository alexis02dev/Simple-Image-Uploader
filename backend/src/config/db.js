import mongoose from "mongoose";
/**
 * Conectar a la base de datos MongoDB Atlas
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL); // Conectar a la base de datos MongoDB Atlas -> mongoose.connect(process.env.MONGOOSE_URL)
    console.log("✅ Conectado a MongoDB Atlas"); // Si se conecta correctamente, mostrar un mensaje de éxito
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message); // Si hay un error, mostrar un mensaje de error -> console.error("❌ Error conectando a MongoDB:", error.message)
    process.exit(1); // Si hay un error, salir del proceso con un código de error 1 -> process.exit(1) -> exit(1)
  }
};
