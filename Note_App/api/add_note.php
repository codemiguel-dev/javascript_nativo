<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$content = trim($data['content'] ?? '');

// Validar que la nota no esté vacía
if (empty($content)) {
    echo json_encode(['error' => 'La nota no puede estar vacía.']);
    exit;
}

$query = "INSERT INTO notes (content) VALUES (:content)";
$stmt = $conn->prepare($query);
$stmt->bindParam(':content', $content);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Nota agregada correctamente']);
} else {
    echo json_encode(['error' => 'Error al agregar la nota']);
}
?>
