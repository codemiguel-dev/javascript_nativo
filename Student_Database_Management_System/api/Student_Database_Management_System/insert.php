<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$age = $data['age'];
$email = $data['email'];

$query = "INSERT INTO students (name, age, email) VALUES (:name, :age, :email)";
$stmt = $conn->prepare($query);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':age', $age);
$stmt->bindParam(':email', $email);

if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Registro agregado correctamente']);
} else {
    echo json_encode(['error' => 'Error al agregar el registro']);
}
?>