<?php
header('Content-Type: application/json; charset=utf-8');
ob_start();

$included = false;
if (function_exists('mysqli_connect')) {
    @include __DIR__ . '/../index.php';
    $included = true;
}
ob_end_clean();

session_start();
$_SESSION = [];

// NAN eta pasahitza jaso
$nan = $_POST['nan'] ?? '';
$pasahitza = $_POST['pasahitza'] ?? '';

// SQL kontsulta egin parametroekin
$sql = "SELECT * FROM Erabiltzailea WHERE nan = '$nan'";
$user_query = mysqli_query($conn, $sql);

if (mysqli_num_rows($user_query) === 1) {
    $erabiltzailea = mysqli_fetch_assoc($user_query);

    if ($erabiltzailea['pasahitza'] === $pasahitza) {
        $_SESSION['nan'] = $erabiltzailea['nan'];
        echo json_encode([
            "success" => true,
            "message" => "Saioa hasita dago",
            "nan" => $erabiltzailea['nan']
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Pasahitza txarto dago"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erabiltzailea ez da aurkitu"
    ]);
}
?>
