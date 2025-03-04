<?php
include 'config.php';

$query = "SELECT * FROM students";
$stmt = $conn->prepare($query);
$stmt->execute();
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($records);
?>