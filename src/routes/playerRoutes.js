import express from "express";
import {
  registerPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../controllers/playerController.js";

const router = express.Router();

// CRUD routes
router.post("/register", registerPlayer);
router.get("/players", getPlayers);
router.get("/players/:id", getPlayerById);
router.put("/players/:id", updatePlayer);
router.delete("/players/:id", deletePlayer);

export default router;
