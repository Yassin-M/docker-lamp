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
// Item izena lortu
if (isset($_GET['item'])) {
    $item_izena = urldecode($_GET['item']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ez da itemik zehaztu.']);
    exit;
}

// SQL kontsulta egin parametroekin
$sql = "UPDATE Datuak 
        SET kostua={$_POST['kostua']}, bizitza={$_POST['bizitza']}, erasoa={$_POST['erasoa']}, mota='{$_POST['mota']}'
        WHERE izena='$item_izena'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "Karta eguneratu da."]);
} else {
    echo json_encode(["success" => false, "message" => "Errorea: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>