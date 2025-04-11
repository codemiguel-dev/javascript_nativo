export function generateCardmodalHTML() {
    return `
    <div class="card" style="width: 18rem;">
            <div class="card-body">
            <p class="text-dark">Ingresa Imagen</p>
            <input type="file" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="image" placeholder="Ingrese Imagen"/> 
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="title" placeholder="Ingrese Título"/> 
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="header" placeholder="Ingrese Encabezado"/>   
            <a href="#" id="updateCarousel" class="btn btn-primary">Actualizar Carrusel</a>
        </div>
    </div>
    `;
  }
  