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
if (!$included || !isset($conn) || !$conn) {
    echo json_encode(['success' => false, 'message' => 'Errorea: ezin izan da datu basera konektatu.']);
    exit;
}

// Parametroak jaso
$item_izena = $_POST['karta_izena'] ?? '';
$item_kostua = $_POST['karta_kostua'] ?? '';
$item_bizitza = $_POST['karta_bizitza'] ?? '';
$item_erasoa = $_POST['karta_erasoa'] ?? '';
$item_mota = $_POST['karta_mota'] ?? '';

// SQL kontsulta zuzenean parametroekin
$sql = "INSERT INTO Datuak (izena, kostua, bizitza, erasoa, mota) 
        VALUES ('$item_izena', '$item_kostua', '$item_bizitza', '$item_erasoa', '$item_mota')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Karta zuzen gehitu da.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>