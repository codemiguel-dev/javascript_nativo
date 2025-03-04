<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

$query = "DELETE FROM students WHERE id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Registro eliminado correctamente']);
} else {
    echo json_encode(['error' => 'Error al eliminar el registro']);
}
?>