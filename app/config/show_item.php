<?php
header('Content-Type: application/json');
ob_start();

$included = false;
if (function_exists('mysqli_connect')) {
    @include __DIR__ . '/../index.php';
    $included = true;
}
ob_end_clean();

if (!$included) {
    echo json_encode(['success' => false, 'message' => 'Errorea datu basearekin konektatzean.']);
    exit;
}

if (!isset($_GET['item'])) {
    echo json_encode(['success' => false, 'message' => 'Ez da itemik zehaztu.']);
    exit;
}

$item = $_GET['item'];
$item_izena = htmlspecialchars(urldecode($item));

$sql = "SELECT izena, kostua, bizitza, erasoa, mota FROM Datuak WHERE izena = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $item_izena);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        'success' => true,
        'izena' => $row['izena'],
        'kostua' => $row['kostua'],
        'bizitza' => $row['bizitza'],
        'erasoa' => $row['erasoa'],
        'mota' => $row['mota']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Itema ez da aurkitu.']);
}

$stmt->close();
$conn->close();
?>
