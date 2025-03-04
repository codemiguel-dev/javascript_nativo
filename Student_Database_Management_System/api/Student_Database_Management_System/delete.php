<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !is_numeric($data['id'])) {
    echo json_encode(['error' => 'ID inválido']);
    exit;
}

$id = intval($data['id']);

$query = "DELETE FROM students WHERE id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Registro eliminado correctamente']);
} else {
    echo json_encode(['error' => 'Error al eliminar el registro']);
}
?>
