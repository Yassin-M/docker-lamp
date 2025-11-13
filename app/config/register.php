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

// Formulariotik datuak jaso
$izena = $_POST['izena'] ?? '';
$nan = $_POST['nan'] ?? '';
$zenbaki = $_POST['zenbakia'] ?? '';
$data = $_POST['data'] ?? '';
$email = $_POST['email'] ?? '';
$pasahitza = $_POST['pasahitza'] ?? '';

$data = $_POST['jaiotze_data'];
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
    echo json_encode(['success' => false, 'message' => 'Data formatu okerra']);
    exit;
}

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
$stmt = mysqli_prepare($conn, "INSERT INTO Erabiltzailea (nan, izena, jaiotze_data, tlf, email, pasahitza) VALUES (?, ?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, 'ssssss', $nan, $izena, $data, $zenbaki, $email, $pasahitza);
$user_insert = mysqli_stmt_execute($stmt);

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

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>