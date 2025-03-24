document.addEventListener("DOMContentLoaded", function() {
    // Crear un bloque de contenido de ejemplo
    const designArea = document.getElementById("design-area");

    // Crear un botón para añadir un bloque
    const addBlockButton = document.createElement("button");
    addBlockButton.textContent = "Añadir bloque";
    addBlockButton.onclick = function() {
        const newBlock = document.createElement("div");
        newBlock.classList.add("content-block");
        newBlock.innerHTML = "<p>Nuevo bloque de contenido</p>";
        newBlock.style.backgroundColor = "#e2e2e2";
        newBlock.style.padding = "20px";
        newBlock.style.marginBottom = "10px";
        designArea.appendChild(newBlock);
    };

    document.body.appendChild(addBlockButton);
});
