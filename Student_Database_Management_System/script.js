// Variables del formulario y la lista
const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// URL base de la API
const API_BASE_URL = 'http://localhost/api/Student_Database_Management_System';

// Obtener registros desde la base de datos MySQL
async function fetchRecords() {
    try {
        const response = await fetch(`${API_BASE_URL}/get.php`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const records = await response.json();
        displayRecords(records);
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        recordList.innerHTML = '<tr><td colspan="5" style="text-align:center;color:red;">Error al cargar los registros</td></tr>';
    }
}

// Mostrar registros en la tabla
function displayRecords(records) {
    recordList.innerHTML = '';
    if (records.length === 0) {
        recordList.innerHTML = '<tr><td colspan="5" style="text-align:center;color:red;">No Record Found</td></tr>';
    } else {
        records.forEach((record) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.age}</td>
                <td>${record.email}</td>
                <td><button onclick="editRecord(${record.id}, '${record.name}', ${record.age}, '${record.email}')">Edit</button></td>
                <td><button onclick="deleteRecord(${record.id})">Delete</button></td>
            `;
            recordList.appendChild(row);
        });
    }
}

// Agregar o actualizar un registro
recordForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const email = emailInput.value.trim();
    const editId = editIndexInput.value;

    // Validar campos
    if (!name || !age || !email) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const endpoint = editId ? 'update.php' : 'insert.php';
    const method = editId ? 'PUT' : 'POST';
    const body = JSON.stringify({ id: editId, name, age, email });

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: body,
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        alert(result.mensaje || result.error);
        recordForm.reset();
        editIndexInput.value = '';
        fetchRecords();
    } catch (error) {
        console.error('Error al guardar:', error);
        alert('Error al guardar el registro. Por favor, intenta nuevamente.');
    }
});

// Editar un registro
function editRecord(id, name, age, email) {
    nameInput.value = name;
    ageInput.value = age;
    emailInput.value = email;
    editIndexInput.value = id;
}

// Eliminar un registro
async function deleteRecord(id) {
    if (!confirm('¿Estás seguro de eliminar este registro?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/delete.php`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        alert(result.mensaje || result.error);
        fetchRecords();
    } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el registro. Por favor, intenta nuevamente.');
    }
}

// Cargar registros al inicio
fetchRecords();