<?php
header('Content-Type: application/json; charset=utf-8');
ob_start();

$included = false;
if (function_exists('mysqli_connect')) {
    @include __DIR__ . '/../index.php';
    $included = true;
}
ob_end_clean();

// CSRF tokena egiaztatu
include_once __DIR__ . '/csrf.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validateCsrfToken($_POST['csrf_token'] ?? '')) {
        echo json_encode([
            "success" => false,
            "message" => "CSRF tokena baliogabea."
        ]);
        exit;
    }
}

// DB konexioaren egiaztapena
if (!$included) {
    echo json_encode(['success' => false, 'message' => 'Errorea datu basearekin konektatzean.']);
    exit;
}

// Erabiltzailea eguneratzeko SQL kontsulta
$stmt = mysqli_prepare($conn, "UPDATE Erabiltzailea SET izena=?, email=?, jaiotze_data=?, tlf=? WHERE nan=?");
mysqli_stmt_bind_param($stmt, 'sssss', $_POST['izena'], $_POST['email'], $_POST['dob'], $_POST['telefonoa'], $_POST['nan']);
$sql = mysqli_stmt_execute($stmt);

if ($sql) {
    echo json_encode(["success" => true, "message" => "Erabiltzailea eguneratu da."]);
} else {
    echo json_encode(["success" => false, "message" => "Errorea: " . mysqli_error($conn)]);
}
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>