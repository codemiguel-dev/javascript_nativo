const navbarHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">Dropdown</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
`;

document.getElementById("agregarPanel").addEventListener("click", () => {
    if (pageData) {
      // Verificar si ya existe el navbar en el contenido
      if (!pageData.page.navbar.includes(navbarHTML)) {
        // Agregar el navbar al contenido
        pageData.page.navbar = navbarHTML + pageData.page.navbar;
  
        // Actualizar visualmente el contenido
        document.getElementById("container").innerHTML = pageData.page.navbar;
  
        // Enviar el JSON actualizado al servidor para guardar el archivo html.json
        fetch('/guardar-json', { // Ruta al servidor Express
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pageData) // Enviar el JSON con el contenido actualizado
        })
        .then(response => response.json())
        .then(data => {
          console.log("JSON guardado correctamente:", data);
        })
        .catch(error => {
          console.error("Error al guardar el JSON:", error);
        });
      } else {
        console.log("El navbar ya está presente.");
      }
    }
  });
  