<?php
include("../index.php");
header('Content-Type: application/json; charset=utf-8');

$nan = '12345678Z';
$nanEsc = mysqli_real_escape_string($conn, $nan);
$sql = "SELECT * FROM Erabiltzailea WHERE Nan = '$nanEsc'";

$result = mysqli_query($conn, $sql);

$user = mysqli_fetch_assoc($result);

$out = [
    'id' => $user['nan'] ?? null,
    'nombre' => $user['izena'] ?? null,
    'email' => $user['email'] ?? null,
    'dob' => $user['jaiotze_data'] ?? null,
    'phone' => $user['tlf'] ?? null
];

echo json_encode($out);
mysqli_close($conn);
?>
