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

// Formulariotik datuak jaso
$izena = $_POST['izena'] ?? '';
$nan = $_POST['nan'] ?? '';
$zenbaki = $_POST['zenbakia'] ?? '';
$data = $_POST['data'] ?? '';
$email = $_POST['email'] ?? '';
$pasahitza = $_POST['pasahitza'] ?? '';

// Erabiltzailea edo NAN-a existitzen den egiaztatu
$user_query = mysqli_query($conn, "SELECT * FROM Erabiltzailea WHERE email='$email' OR nan='$nan'");

if (mysqli_num_rows($user_query) > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Erabiltzaile email-a edo NAN-a dagoeneko erregistratuta dago."
    ]);
    mysqli_free_result($user_query);
    mysqli_close($conn);
    exit;
}

// Erabiltzailea datu-basean sartu
$user_insert = mysqli_query($conn, "INSERT INTO Erabiltzailea (nan, izena, jaiotze_data, tlf, email, pasahitza) 
                                    VALUES ('$nan', '$izena', '$data', '$zenbaki', '$email', '$pasahitza')");

if ($user_insert) {
    echo json_encode([
        "success" => true,
        "message" => "Erabiltzailea erregistratu da.",
        "nan" => $nan
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Errorea: " . mysqli_error($conn)
    ]);
}

mysqli_close($conn);
?>