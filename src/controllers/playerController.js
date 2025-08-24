import db from "../config/firebase.js";

export const registerPlayer = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email required" });
    }

    const docRef = await db.collection("players").add({
      name,
      email,
      score: 0,
      createdAt: new Date(),
    });

    return res
      .status(201)
      .json({ id: docRef.id, message: "Player registered" });
  } catch (error) {
    console.error("🔥 Error registerPlayer:", error);
    return res
      .status(500)
      .json({ error: error.message || "Failed to register player" });
  }
};

// READ ALL
export const getPlayers = async (req, res) => {
  try {
    const snapshot = await db.collection("players").get();
    const players = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
export const getPlayerById = async (req, res) => {
  try {
    const doc = await db.collection("players").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updatePlayer = async (req, res) => {
  try {
    const { score } = req.body;
    await db
      .collection("players")
      .doc(req.params.id)
      .update({
        ...(score !== undefined && { score }),
        updatedAt: new Date(),
      });
    res.json({ message: "Player updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deletePlayer = async (req, res) => {
  try {
    await db.collection("players").doc(req.params.id).delete();
    res.json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
