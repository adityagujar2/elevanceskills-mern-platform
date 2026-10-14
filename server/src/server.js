import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }
  } else {
    console.warn("MONGODB_URI is not set. Starting API without a database connection.");
  }

  app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}

startServer();
