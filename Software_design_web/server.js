const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // Importamos fs completo
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Multer corregida
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public/file/carousel'); // Añadí 'public' aquí
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Mejor usar nombres únicos para evitar sobreescrituras
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Ruta para subida de imagen (mejorada)
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No se subió ningún archivo' });
    }

    const imageUrl = `/file/carousel/${req.file.filename}`; // Ruta relativa al public
    res.json({ 
      success: true, 
      imageUrl,
      message: 'Imagen subida correctamente'
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ruta para guardar JSON (optimizada)
app.post('/guardar-json', async (req, res) => {
  try {
    const data = req.body;
    
    if (!data?.page) {
      return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    const filePath = path.join(__dirname, 'public/data/page.json');
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Datos guardados correctamente',
      path: '/data/page.json'
    });
  } catch (error) {
    console.error('Error al guardar JSON:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});