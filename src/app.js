import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import playerRoutes from "./routes/playerRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Boxing Backend API is running");
});

app.use("/api", playerRoutes);

app.listen(PORT, () => {
  console.log(`Boxing backend running on http://localhost:${PORT}`);
});
