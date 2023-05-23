import express from "express"
import morgan from "morgan"
import cors from "cors"

// Routes
import productRoutes from "./routes/productRoutes.js"
import sankeyRoutes from "./routes/sankeyRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"

// Server
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use(cors());

app.use("/api", productRoutes);
app.use("/api", sankeyRoutes);
app.use("/api", studentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
