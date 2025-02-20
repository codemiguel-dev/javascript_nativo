document.addEventListener("DOMContentLoaded", function () {
  const buscador = document.getElementById("buscador");
  const listaArticulos = document.getElementById("listaArticulos");

  // Ocultar la lista al principio
  listaArticulos.style.display = "none";

  // Agregar un evento input para manejar la entrada del buscador
  buscador.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();

      document.querySelectorAll(".articulo").forEach(fruta => {
          const frutaTexto = fruta.textContent.toLowerCase();

          if (frutaTexto.includes(searchTerm)) {
              fruta.classList.remove("filtro");
          } else {
              fruta.classList.add("filtro");
          }
      });

      // Mostrar u ocultar la lista dependiendo de si hay un término de búsqueda
      if (searchTerm.trim() !== "") {
          listaArticulos.style.display = "block";
      } else {
          listaArticulos.style.display = "none";
      }
  });

  // Agregar un evento para manejar la recarga de la página
  window.addEventListener("load", function () {
      // Ocultar la lista si el buscador está vacío al cargar la página
      if (buscador.value.trim() === "") {
          listaArticulos.style.display = "none";
      } else {
          listaArticulos.style.display = "block";
      }
  });
});
