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

$
// Sarrera-balioen normalizazioa eta egiaztapena
// (trim eta, beharrezkoa denean, motaren egokitzapena)
$item_izena = trim($item_izena);
$item_kostua = trim($item_kostua);
$item_bizitza = trim($item_bizitza);
$item_erasoa = trim($item_erasoa);
$item_mota = trim($item_mota);

$
// Prepared statement bat SQL injekzioak saihesteko
$stmt = $conn->prepare("INSERT INTO Datuak (izena, kostua, bizitza, erasoa, mota) VALUES (?, ?, ?, ?, ?)");
if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Errorea kontsulta prestatzean: ' . $conn->error]);
    $conn->close();
    exit;
}

// Parametroak string gisa lotu, injekzio-arriskuak saihesteko.
if (!$stmt->bind_param('siiis', $item_izena, $item_kostua, $item_bizitza, $item_erasoa, $item_mota)) {
    echo json_encode(['success' => false, 'message' => 'Parametroak lotzean errorea: ' . $stmt->error]);
    $stmt->close();
    $conn->close();
    exit;
}

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Karta zuzen gehitu da.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Errorea kontsulta exekutatzean: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>