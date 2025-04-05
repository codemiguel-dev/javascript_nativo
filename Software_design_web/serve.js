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

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
