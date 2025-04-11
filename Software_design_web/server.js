const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // Importación del módulo multer

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

// Servir archivos estáticos desde una carpeta pública
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta 'public'

// Ruta para el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Cambia 'index.html' por tu archivo HTML
});

// Ruta para guardar el JSON actualizado
app.post('/guardar-json', (req, res) => {
  const data = req.body; // Obtener el JSON del cuerpo de la solicitud

  // Ruta donde se guardará el archivo html.json
  const filePath = path.join(__dirname, 'public/html.json');

  // Guardar el JSON actualizado en el archivo
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al guardar el JSON' });
    }
    res.json({ message: 'JSON guardado correctamente' });
  });
});

const carouselDir = path.join(__dirname, 'public/file/carousel');
if (!fs.existsSync(carouselDir)) {
  fs.mkdirSync(carouselDir, { recursive: true });
}


// Configuración de Multer para guardar las imágenes en la carpeta public/file/carousel
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/file/carousel'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ruta para manejar la subida de imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const imageUrl = `public/file/carousel/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } else {
    res.json({ success: false, message: 'No file uploaded.' });
  }
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});