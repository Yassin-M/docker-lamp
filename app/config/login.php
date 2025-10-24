<?php
include('../index.php');
session_start();
$_SESSION = [];
header('Content-Type: application/json; charset=utf-8');

$izena = mysqli_real_escape_string($conn, $_POST['izena'] ?? '');
$pasahitza = mysqli_real_escape_string($conn, $_POST['pasahitza'] ?? '');
$sql = "SELECT * FROM Erabiltzailea WHERE Izena = '$izena'";

$user_query = mysqli_query($conn, $sql);

if(mysqli_num_rows($user_query) === 1){
    $erabiltzailea = mysqli_fetch_assoc($user_query);

    if($erabiltzailea['pasahitza'] === $pasahitza){
        $_SESSION['nan'] = $erabiltzailea['nan'];
        echo json_encode("success" => true,"message" => "Saioa hasita dago","nan" => $erabiltzailea['nan']);
    } else {
        echo json_encode(["success" => false, "message" => "Pasahitza txarto dago"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Erabiltzailea ez da aurkitu"]);
}
?>
