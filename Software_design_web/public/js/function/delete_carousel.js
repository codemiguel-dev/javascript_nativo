// 1. Función para actualizar UI
const updateUI = () => {
  const container = document.getElementById("container-carousel");
  container.innerHTML = `
    ${pageData.page.container.html}
    ${pageData.page.title.html}
    ${pageData.page.endcontainer.html}
  `;
};

// 2. Manejador de eliminación
document.getElementById("deletecarousel").addEventListener("click", async () => {
  try {
    if (!pageData?.page?.carousel) return;

    // Optimista: Actualiza UI primero
    updateUI();

    // En paralelo: Actualiza y envía datos
    pageData.page.carousel.html = "";
    const response = await fetch('/guardar-json', {
      method: 'POST',
      body: JSON.stringify(pageData)
    });

    if (!response.ok) throw new Error("Error en servidor");
    console.log("Eliminado en 1 click");
    
  } catch (error) {
    console.error(error);
    // Rollback UI si falla
    document.getElementById("container-carousel").innerHTML = 
      pageData.page.container.html + 
      pageData.page.title.html + 
      pageData.page.carousel.html + 
      pageData.page.endcontainer.html;
  }
});