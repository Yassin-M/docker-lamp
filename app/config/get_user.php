<?php
include("../index.php");
session_start();
header('Content-Type: application/json; charset=utf-8');

// Preferir el parámetro GET/POST 'nan'. Si no viene, intentar usar la sesión PHP.
$nan = '';
if(!empty($_GET['nan'])){
    $nan = $_GET['nan'];
} else if(!empty($_POST['nan'])){
    $nan = $_POST['nan'];
} else if(!empty($_SESSION['nan'])){
    $nan = $_SESSION['nan'];
}

if(empty($nan)){
    echo json_encode(['success' => false, 'message' => 'Nan faltatzen da']);
    mysqli_close($conn);
    exit;
}

$nanEsc = mysqli_real_escape_string($conn, $nan);
$sql = "SELECT * FROM Erabiltzailea WHERE Nan = '$nanEsc'";

$result = mysqli_query($conn, $sql);

if(!$result || mysqli_num_rows($result) === 0){
    echo json_encode(['success' => false, 'message' => 'Erabiltzailea ez da aurkitu']);
    mysqli_close($conn);
    exit;
}

$user = mysqli_fetch_assoc($result);

$out = [
    'success' => true,
    'id' => $user['nan'] ?? null,
    'nombre' => $user['izena'] ?? null,
    'email' => $user['email'] ?? null,
    'dob' => $user['jaiotze_data'] ?? null,
    'phone' => $user['tlf'] ?? null
];

echo json_encode($out);
mysqli_close($conn);
?>
