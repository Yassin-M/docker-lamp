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

// Erabiltzailea eguneratzeko SQL kontsulta
$sql = "UPDATE Erabiltzailea 
        SET izena='{$_POST['izena']}', email='{$_POST['email']}', jaiotze_data='{$_POST['dob']}', tlf='{$_POST['telefonoa']}'
        WHERE nan='{$_POST['nan']}'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "Erabiltzailea eguneratu da."]);
} else {
    echo json_encode(["success" => false, "message" => "Errorea: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>