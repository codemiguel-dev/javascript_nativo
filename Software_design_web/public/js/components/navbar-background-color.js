export function generateNavbarHTML(color) {
  // Determina la clase de texto según el color de fondo
  const textClass = color === "light" ? "text-dark" : "text-light";

  return `
    <nav class="navbar navbar-expand-lg bg-${color}">
      <div class="container-fluid">
        <a class="navbar-brand ${textClass}" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link ${textClass} active" href="#">Inicio</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}