/**
 * Función para guardar datos JSON en el servidor
 * @param {Object} data - Datos a guardar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export async function guardarJSON(data) {
    try {
      const response = await fetch('/guardar-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error al guardar el JSON:", error);
      throw error; // Re-lanzamos el error para manejo externo
    }
  }