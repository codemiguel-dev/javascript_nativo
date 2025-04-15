document.getElementById("deletePanel").addEventListener("click", () => {
    if (!pageData || !pageData.page || !pageData.page.navbar) {
      console.warn("Datos no válidos: pageData o navbar no encontrado");
      return;
    }
  
    // ID del navbar que quieres borrar (podría venir de un input o ser fijo)
    const navbarIdToDelete = 1; // Este sería el ID 1 que aparece en tu JSON
  
    // Verificar si el navbar existe y coincide con el ID
    if (pageData.page.navbar.id === navbarIdToDelete) {
      // 1. Limpiar el HTML visualmente
      
      // Mostrar contenido inicial
      document.getElementById("container").innerHTML =   pageData.page.container.html +  pageData.page.title.html +
      pageData.page.navbar.html +   pageData.page.carousel.html +   pageData.page.endcontainer.html;
      
      // 2. Actualizar el JSON (ambas opciones disponibles)
      // Opción A: Eliminar completamente el objeto navbar
      //delete pageData.page.navbar;
      
      // Opción B: Mantener la estructura vacía (descomenta si prefieres esta)
      pageData.page.navbar = { id: 1, html: "" };
  
      // 3. Enviar cambios al servidor
      fetch('/guardar-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData)
      })
      .then(response => {
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        return response.json();
      })
      .then(data => {
        console.log("Navbar eliminado correctamente", data);
        // Opcional: Recargar datos o actualizar UI
      })
      .catch(error => {
        console.error("Error:", error);
        // Opcional: Mostrar mensaje al usuario
      });
    } else {
      console.warn(`No se encontró navbar con ID ${navbarIdToDelete}`);
    }
  });