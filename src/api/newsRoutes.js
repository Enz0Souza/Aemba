import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// armazenamento das imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/news"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// lista de notícias (você pode trocar depois por banco de dados)
let noticias = [];

// rota para criar notícia
router.post("/create", upload.fields([{ name: "capa" }, { name: "corpo" }]), (req, res) => {
  const { titulo, subtitulo, conteudo } = req.body;
  const novaNoticia = {
    id: Date.now(),
    titulo,
    subtitulo,
    conteudo,
    capa: req.files?.capa?.[0]?.path || "",
    corpoImg: req.files?.corpo?.[0]?.path || "",
    data: new Date()
  };
  noticias.unshift(novaNoticia);
  res.json({ message: "Notícia criada!", noticia: novaNoticia });
});

// rota para listar notícias
router.get("/", (req, res) => res.json(noticias));

// rota para obter notícia por id
router.get("/:id", (req, res) => {
  const noticia = noticias.find(n => n.id == req.params.id);
  noticia ? res.json(noticia) : res.status(404).json({ message: "Notícia não encontrada" });
});

export default router;
