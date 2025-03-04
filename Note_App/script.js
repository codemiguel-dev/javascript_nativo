const API_URL = "http://localhost/api/Note_App"; // Cambia esto según la URL de tu API

document.addEventListener("DOMContentLoaded", fetchNotes);

let addBtn = document.getElementById("addbtn");
let clrBtn = document.getElementById("clrbtn");

// Agregar una nueva nota
addBtn.addEventListener("click", async function () {
    let addTxt = document.getElementById("addtext").value.trim();
    
    if (!addTxt) {
        alert("No puedes agregar una nota vacía.");
        return;
    }

    let response = await fetch(`${API_URL}/add_note.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: addTxt }),
    });

    let result = await response.json();
    alert(result.mensaje || result.error);
    document.getElementById("addtext").value = "";
    fetchNotes();
});

// Mostrar las notas
async function fetchNotes() {
    let response = await fetch(`${API_URL}/get_notes.php`);
    let notes = await response.json();
    
    let notesElem = document.getElementById("notes");
    notesElem.innerHTML = notes.length 
        ? notes.map((note, index) => `
            <div class="notecard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Nota ${index + 1}</h5>
                    <p class="card-text">${note.content}</p>
                    <button class="btn btn-danger" onclick="deleteNote(${note.id})">Eliminar</button>
                </div>
            </div>
        `).join("")
        : `<h6>No hay notas guardadas.</h6>`;
}

// Eliminar una nota
async function deleteNote(id) {
    if (!confirm("¿Seguro que quieres eliminar esta nota?")) return;

    let response = await fetch(`${API_URL}/delete_note.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });

    let result = await response.json();
    alert(result.mensaje || result.error);
    fetchNotes();
}

// Limpiar el campo de entrada
clrBtn.addEventListener("click", () => {
    document.getElementById("addtext").value = "";
});
