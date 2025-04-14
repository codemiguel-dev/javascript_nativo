

/**
 * Función para guardar datos JSON en el servidor
 * @param {Object} data - Datos a guardar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
// En tu función guardarJSON del frontend:
export async function showJSON(data) {
    document.getElementById("dynamic-title-image").innerHTML = data.page.titleimage.html;

// Mostrar contenido inicial

// Mostrar contenido inicial
document.getElementById("container").innerHTML = data.page.container.html + data.page.title.html +
data.page.navbar.html + data.page.carousel.html + data.page.endcontainer.html;

  }