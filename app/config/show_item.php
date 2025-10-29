<?php
header('Content-Type: application/json');
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

// Item ez badago, errorea itzuli
if (!isset($_GET['item'])) {
    echo json_encode(['success' => false, 'message' => 'Ez da itemik zehaztu.']);
    exit;
}

// Parametroa lortu eta prestatu
$item = $_GET['item'];
$item_izena = urldecode($item);

// SQL kontsulta zuzenean parametroarekin
$sql = "SELECT izena, kostua, bizitza, erasoa, mota FROM Datuak WHERE izena = '$item_izena'";
$result = mysqli_query($conn, $sql);

// Emaitza egiaztatu eta JSON erantzuna osatu
if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
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

mysqli_close($conn);
?>
