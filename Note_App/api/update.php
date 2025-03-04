<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$name = $data['name'];
$age = $data['age'];
$email = $data['email'];

$query = "UPDATE students SET name = :name, age = :age, email = :email WHERE id = :id";
$stmt = $conn->prepare($query);
$stmt->bindParam(':id', $id);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':age', $age);
$stmt->bindParam(':email', $email);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Registro actualizado correctamente']);
} else {
    echo json_encode(['error' => 'Error al actualizar el registro']);
}
?>