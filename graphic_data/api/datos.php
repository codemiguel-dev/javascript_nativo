<?php
header('Content-Type: application/json');

$servername = "localhost"; 
$username = "root";
$password = "";
$dbname = "graphic_data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$sql = "SELECT fecha, monto FROM ventas";
$result = $conn->query($sql);

$datos = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $datos[] = [
            "x" => $row["fecha"],  
            "y" => (float) $row["monto"]  
        ];
    }
}

$conn->close();
echo json_encode($datos);
?>
