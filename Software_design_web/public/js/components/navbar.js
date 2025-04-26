export function generateNavbarHTML(
  selectedRadio = null,
  opc1, opc2, opc3, opc4, opc5, opc6,
  opc1link, opc2link, opc3link, opc4link, opc5link, opc6link,
  selectedRadioFixed = null,
  imageUrl = null  // Nuevo parámetro para la URL de la imagen
) {
  // Determina la clase de texto según el color de fondo
  const textClass = selectedRadio === "light" ? "text-dark" : "text-light";
  const buttoncolorClass = selectedRadio === "light" ? "navbar-light" : "navbar-dark";
  
  // Usar selectedRadioFixed solo si existe
  const fixedClass = selectedRadioFixed ? selectedRadioFixed : "";

  // Generar el elemento de imagen si existe una URL
  const logoImage = imageUrl 
    ? `<img src="${imageUrl}" alt="Logo" class="navbar-brand-image" style="height: 40px; margin-right: 10px;">`
    : '';

  return `
    <nav class="navbar navbar-expand-lg bg-${selectedRadio} ${fixedClass}">
      <div class="container-fluid">
        ${logoImage}
        <button class="navbar-toggler ${buttoncolorClass}" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link ${textClass} ${opc1 ? 'active' : ''}" href="${opc1link || '#'}">${opc1 || ''}</a>
            </li>
            ${opc2 ? `<li class="nav-item">
              <a class="nav-link ${textClass}" href="${opc2link || '#'}">${opc2}</a>
            </li>` : ''}
            ${opc3 ? `<li class="nav-item">
              <a class="nav-link ${textClass}" href="${opc3link || '#'}">${opc3}</a>
            </li>` : ''}
            ${opc4 ? `<li class="nav-item">
              <a class="nav-link ${textClass}" href="${opc4link || '#'}">${opc4}</a>
            </li>` : ''}
            ${opc5 ? `<li class="nav-item">
              <a class="nav-link ${textClass}" href="${opc5link || '#'}">${opc5}</a>
            </li>` : ''}
            ${opc6 ? `<li class="nav-item">
              <a class="nav-link ${textClass}" href="${opc6link || '#'}">${opc6}</a>
            </li>` : ''}
          </ul>
        </div>
      </div>
    </nav>
  `;
}