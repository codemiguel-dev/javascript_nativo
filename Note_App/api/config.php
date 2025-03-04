<?php
$host = 'localhost';
$dbname = 'notes_db';
$username = 'root'; // Cambia esto si usas otro usuario
$password = ''; // Cambia esto si tienes contraseña en MySQL

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]));
}
?>
