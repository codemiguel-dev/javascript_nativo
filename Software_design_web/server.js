const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

// Servir archivos estáticos (como HTML, CSS, JS) desde una carpeta pública
app.use(express.static(path.join(__dirname, 'public')));  // Asumiendo que tienes una carpeta 'public'

// Ruta para el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Cambia 'index.html' por tu archivo HTML
});

// Ruta para guardar el JSON actualizado
app.post('/guardar-json', (req, res) => {
  const data = req.body;  // Obtener el JSON del cuerpo de la solicitud

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

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
      const imageUrl = `/file/carousel/${req.file.filename}`;
      res.json({ success: true, imageUrl });
  } else {
      res.json({ success: false });
  }
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});



// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
