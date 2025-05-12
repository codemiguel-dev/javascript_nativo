

/**
 * Función para guardar datos JSON en el servidor
 * @param {Object} data - Datos a guardar
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
// En tu función guardarJSON del frontend:
export async function showJSON(pageData) {

    const position = pageData.page.elementsOrder[0] === 'navbar' ? 'left' : 'right';
    console.log(position);
    // Mostrar contenido inicial
    document.getElementById("dynamic-title-image").innerHTML = pageData.page.titleimage.html;

    // Mostrar contenido de navbar modal
    document.getElementById("container-nav").innerHTML =   pageData.page.container.html + pageData.page.title.html +
    pageData.page.navbar.html + pageData.page.endcontainer.html;
    
    // Mostrar contenido completo de la página
    document.getElementById("container-carousel").innerHTML =   pageData.page.container.html +
    pageData.page.carousel.html + pageData.page.endcontainer.html;

    // Mostrar contenido completo de la página
    document.getElementById("container-carousel-modal").innerHTML =   pageData.page.container.html +
    pageData.page.carouselmodal.html + pageData.page.endcontainer.html;

}