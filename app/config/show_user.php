<?php
header('Content-Type: application/json; charset=utf-8');
ob_start();

$included = false;
if (function_exists('mysqli_connect')) {
    @include __DIR__ . '/../index.php';
    $included = true;
}
ob_end_clean();

// DB konexioaren egiaztapena
if (!$included) {
    echo json_encode(['success' => false, 'message' => 'Errorea datu basearekin konektatzean.']);
    exit;
}

// NAN-a lortu
$nan = '';
if (!empty($_GET['user'])) {
    $nan = $_GET['user'];
} else {
    // NAN-a ez badago, errorea itzuli
    echo json_encode(['success' => false, 'message' => 'Nan faltatzen da']);
    mysqli_close($conn);
    exit;
}

// Erabiltzailea bilatu
$sql = "SELECT * FROM Erabiltzailea WHERE Nan = '$nan'";
$result = mysqli_query($conn, $sql);

// Ez bada aurkitzen, errorea itzuli
if (!$result || mysqli_num_rows($result) === 0) {
    echo json_encode(['success' => false, 'message' => 'Erabiltzailea ez da aurkitu']);
    mysqli_close($conn);
    exit;
}

// Erabiltzailearen datuak hartu
$user = mysqli_fetch_assoc($result);

// Irteera:
$out = [
    'success' => true,
    'id' => $user['nan'] ?? null,
    'nombre' => $user['izena'] ?? null,
    'email' => $user['email'] ?? null,
    'dob' => $user['jaiotze_data'] ?? null,
    'phone' => $user['tlf'] ?? null
];

echo json_encode($out);
mysqli_close($conn);
?>
