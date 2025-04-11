const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ CONFIGURACIÓN CORRECTA DE MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public/file/carousel');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 🚫 SIN DATE.NOW
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });

// ✅ RUTA PARA SUBIDA DE IMAGEN
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const imageUrl = `file/carousel/${req.file.filename}`; // ❌ sin 'public/'
    res.json({ success: true, imageUrl });
  } else {
    res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
