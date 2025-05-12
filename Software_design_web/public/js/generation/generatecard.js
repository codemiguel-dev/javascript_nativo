
// En tu función guardarJSON del frontend:
export async function generateCard() {
    const carouselContainer = document.querySelector(".swiper-wrapper");

  if (!carouselContainer) {
    console.error("No se encontró el contenedor del carrusel");
    return;
  }

  // Limpiar contenedor existente
  carouselContainer.innerHTML = "";

  for (let i = 1; i <= numberOfCards; i++) {
    const cardHTML = `
    
      <li class="card-item swiper-slide" data-index="${i}">
        <a href="#" class="card-link">
          <p class="fs-1">Número de tarjeta. ${i}</p>
          <img src="file/img/Sin_imagen.png" alt="Card Image" class="card-image"
            id="previewcarousel-${i}" width="100px">
          <h2 class="card-title">Ingresar Datos</h2>
          <input type="file" class="form-control image-input" 
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default" 
            id="imagecarousel-${i}"
            placeholder="Ingrese Imagen" />
          <input type="text" class="form-control title-input" 
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default" 
            id="titlecarousel-${i}"
            placeholder="Ingrese Título" />
          <input type="text" class="form-control header-input" 
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default" 
            id="headercarousel-${i}"
            placeholder="Ingrese Encabezado" />
        </a>
      </li>
      <!-- If we need pagination -->
    `;
    carouselContainer.insertAdjacentHTML("beforeend", cardHTML);
  }

  // Configurar los event listeners para los inputs de imagen
  setupImageInputs();

}

function setupImageInputs() {
    document.querySelectorAll(".image-input").forEach((input) => {
      input.addEventListener("change", async function (e) {
        const index = this.id.split("-")[1];
        const previewId = `previewcarousel-${index}`;
        const previewImage = document.getElementById(previewId);
        const file = e.target.files[0];
  
        if (file && previewImage) {
          // Mostrar previsualización
          const reader = new FileReader();
          reader.onload = function (event) {
            previewImage.src = event.target.result;
            previewImage.style.display = "block";
          };
          reader.readAsDataURL(file);
  
          // Subir imagen al servidor
          const formData = new FormData();
          formData.append("image", file);
          formData.append("index", index);
  
          try {
            const response = await fetch("/upload-image", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
  
            if (!data.success) {
              console.error("Error al subir la imagen:", data.message);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
      });
    });
  }