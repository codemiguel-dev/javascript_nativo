export function generateNavbarHTML(color, opc1, opc2, opc3, opc4, opc5, opc6) {
  // Determina la clase de texto según el color de fondo
  const textClass = color === "light" ? "text-dark" : "text-light";
  const buttoncolorClass = color === "light" ? "navbar-light" : "navbar-dark";

  console.log(buttoncolorClass);
  return `
    <nav class="navbar navbar-expand-lg bg-${color}">
      <div class="container-fluid">
        <a class="navbar-brand ${textClass}" href="#">Navbar</a>
        <button class="navbar-toggler ${buttoncolorClass}" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link ${textClass} active" href="#">${opc1}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${textClass} active" href="#">${opc2}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${textClass} active" href="#">${opc3}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${textClass} active" href="#">${opc4}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${textClass} active" href="#">${opc5}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${textClass} active" href="#">${opc6}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}