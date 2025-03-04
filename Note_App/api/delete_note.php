<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;

if (!$id || !is_numeric($id)) {
    echo json_encode(['error' => 'ID inválido']);
    exit;
}

$query = "DELETE FROM notes WHERE id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Nota eliminada correctamente']);
} else {
    echo json_encode(['error' => 'Error al eliminar la nota']);
}
?>
