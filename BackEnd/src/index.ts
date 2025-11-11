import path from "path";
import express, { Request, Response } from "express";
import cors from "cors";
import { Connection } from "./config/configDB";
import wpRouter from "./routes/wp.route";
import authRouter from "./auth/routes/auth.route";

require("dotenv").config({ path: path.join(__dirname, "../env/.env") });
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/wp", wpRouter);
app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.json( "Servidor funcionando");
});

async function start() {
  try {
    await Connection();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al iniciar el servidor:", err);
    process.exit(1);
  }
}

start();