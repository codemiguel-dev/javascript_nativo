<?php
include 'config.php';

$query = "SELECT * FROM notes ORDER BY created_at DESC";
$stmt = $conn->prepare($query);
$stmt->execute();
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notes);
?>
