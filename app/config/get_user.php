<?php
session_start();

// Conexión a la base de datos (copiada desde index.php)
$hostname = "db";
$username = "admin";
$password = "test";
$db = "database";

$conn = mysqli_connect($hostname, $username, $password, $db);
if (!$conn) {
    http_response_code(500);
    if (isset($_GET['json']) || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'No se pudo conectar a la base de datos', 'detail' => mysqli_connect_error()]);
    } else {
        echo "DB connection error: " . mysqli_connect_error();
    }
    exit;
}

// Determinar si el cliente quiere JSON
$wantJson = isset($_GET['json']) || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

// Obtener identificador del usuario desde la sesión
$sessionNan = null;
if (!empty($_SESSION['user_nan'])) {
    $sessionNan = $_SESSION['user_nan'];
} elseif (!empty($_SESSION['user_id'])) {
    $sessionNan = (string)$_SESSION['user_id'];
}

if ($sessionNan === null) {
    http_response_code(401);
    if ($wantJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'No autenticado (no hay user_nan en la sesión)']);
    } else {
        echo "No autenticado. Usa set_test_session.php?nan=... para crear una sesión de prueba.";
    }
    exit;
}

// Consulta por Nan en la tabla Erabiltzailea
$nanEsc = mysqli_real_escape_string($conn, $sessionNan);
$sql = "SELECT Nan, Izena, Abizenak, JaiotzeData, tlf, email FROM Erabiltzailea WHERE Nan = '$nanEsc'";
$result = mysqli_query($conn, $sql);
if (!$result) {
    http_response_code(500);
    if ($wantJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Error en la consulta', 'detail' => mysqli_error($conn)]);
    } else {
        echo "Query error: " . mysqli_error($conn);
    }
    exit;
}

$user = mysqli_fetch_assoc($result);
if (!$user) {
    http_response_code(404);
    if ($wantJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Usuario no encontrado']);
    } else {
        echo "Usuario no encontrado.";
    }
    exit;
}

// Normalizar salida para el frontend
$out = [
    'id' => $user['Nan'],
    'nombre' => trim(($user['Izena'] ?? '') . ' ' . ($user['Abizenak'] ?? '')),
    'email' => $user['email'] ?? null,
    'dob' => $user['JaiotzeData'] ?? null,
    'phone' => $user['tlf'] ?? null,
];

if ($wantJson) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($out);
} else {
    echo "Nan: " . htmlspecialchars($out['id']) . "<br>";
    echo "Nombre: " . htmlspecialchars($out['nombre']) . "<br>";
    echo "Email: " . htmlspecialchars($out['email']) . "<br>";
    echo "JaiotzeData: " . htmlspecialchars($out['dob']) . "<br>";
    echo "Telefono: " . htmlspecialchars($out['phone']) . "<br>";
    echo "<p><a href=\"../show_user/\">Volver al perfil</a></p>";
}

mysqli_close($conn);

?>