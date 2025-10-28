<?php
header('Content-Type: application/json');
ob_start();
$included = false;
if (function_exists('mysqli_connect')) {
    @include __DIR__ . '/../index.php';
    $included = true;
}
ob_end_clean();

if (!isset($_GET['item'])) {
    echo json_encode(['success' => false, 'error' => 'Elementua ez da zehaztu.']);
    exit;
}

$item = $_GET['item'];

if (!$conn) {
    echo json_encode(['success' => false, 'error' => 'Datu basera konektatzeko errorea.']);
    exit;
}

// Elementua ezabatu
$sql = "DELETE FROM Datuak WHERE izena = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $item);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

$stmt->close();
$conn->close();
?>