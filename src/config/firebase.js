import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 Menggunakan jalur absolut untuk memastikan file ditemukan
const serviceAccountPath = path.resolve(__dirname, "serviceAccountKey.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });

  console.log("🔥 Firebase Admin SDK diinisialisasi dengan sukses!");
} catch (error) {
  console.error("❌ Gagal menginisialisasi Firebase Admin SDK:", error);
}

const db = admin.firestore();
export default db;
