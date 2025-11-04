import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Corrige o __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos de arquivos
const FILE = path.join(__dirname, "news.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");

// Cria pasta uploads caso não exista
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 25 * 1024 * 1024, // 25MB
    fileSize: 10 * 1024 * 1024,  // 10MB
  },
});

// Funções auxiliares
function readData() {
  if (!fs.existsSync(FILE)) return [];
  const data = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(data || "[]");
}

function saveData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
}

// 🔹 GET — retorna todas as notícias
app.get("/news", (req, res) => {
  res.json(readData());
});

// 🔹 POST — cria uma nova notícia
app.post("/news", upload.single("image"), (req, res) => {
  try {
    const { title, subtitle, paragraphs, useCarousel } = req.body;

    if (!title) {
      return res.status(400).json({ message: "O campo 'title' é obrigatório." });
    }

    const news = readData();

    const newItem = {
      id: Date.now(),
      title,
      subtitle: subtitle || "",
      cover: req.file ? `/uploads/${req.file.filename}` : "",
      paragraphs: paragraphs ? JSON.parse(paragraphs) : [],
      useCarousel: useCarousel === "true",
      date: new Date().toISOString(),
    };

    news.push(newItem);
    saveData(news);

    res.status(201).json({ message: "Notícia criada com sucesso!", news: newItem });
  } catch (err) {
    console.error("Erro ao criar notícia:", err);
    res.status(500).json({ message: "Erro interno ao criar notícia." });
  }
});

// 🔹 GET — retorna notícia por ID
app.get("/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const news = readData();
  const item = news.find(n => n.id === id);

  if (!item) {
    return res.status(404).json({ message: "Notícia não encontrada" });
  }

  res.json(item); // envia apenas o item
});

// 🔹 DELETE — remove notícia por ID
app.delete("/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const news = readData();
  const index = news.findIndex(n => n.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Notícia não encontrada" });
  }

  const [deleted] = news.splice(index, 1);
  saveData(news);

  if (deleted.cover) {
    const imagePath = path.join(__dirname, deleted.cover);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  res.json({ message: "Notícia deletada com sucesso!" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`);
});
