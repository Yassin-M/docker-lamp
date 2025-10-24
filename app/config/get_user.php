<?php
header('Content-Type: application/json; charset=utf-8');

$conn = mysqli_connect("db", "admin", "test", "database");
if (!$conn) {
    http_response_code(500);
    echo json_encode(['error'=>'DB connection failed', 'detail'=>mysqli_connect_error()]);
    exit;
}

// Forzar NAN de prueba (temporal)
$nan = '12345678Z';

// Consulta genérica (selecciona todo; así no falla si faltan columnas concretas)
$nanEsc = mysqli_real_escape_string($conn, $nan);
$sql = "SELECT * FROM Erabiltzailea WHERE Nan = '$nanEsc'";

$result = mysqli_query($conn, $sql);
if (!$result) {
    http_response_code(500);
    echo json_encode(['error'=>'Query failed', 'detail'=>mysqli_error($conn)]);
    mysqli_close($conn);
    exit;
}

$user = mysqli_fetch_assoc($result);
if (!$user) {
    http_response_code(404);
    echo json_encode(['error'=>'Usuario no encontrado']);
    mysqli_free_result($result);
    mysqli_close($conn);
    exit;
}

// Normalizar salida: si no existen Izena/Abizenak mostramos el Nan como nombre
$out = [
    'id' => $user['nan'] ?? null,
    'nombre' => $user['izena'] ?? null,
    'email' => $user['email'] ?? null,
    'dob' => $user['jaiotze_data'] ?? null,
    'phone' => $user['tlf'] ?? null
];

echo json_encode($out);

mysqli_free_result($result);
mysqli_close($conn);
?>
