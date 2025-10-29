<?php
include("../index.php");
header('Content-Type: application/json; charset=utf-8');

// Formulariotik datuak jaso
$izena = mysqli_real_escape_string($conn, $_POST['izena'] ?? '');
$nan = mysqli_real_escape_string($conn, $_POST['nan'] ?? '');
$zenbaki = mysqli_real_escape_string($conn, $_POST['zenbakia'] ?? '');
$data = mysqli_real_escape_string($conn, $_POST['data'] ?? '');
$email = mysqli_real_escape_string($conn, $_POST['email'] ?? '');
$pasahitza = mysqli_real_escape_string($conn, $_POST['pasahitza'] ?? '');

// Erabiltzailea edo NAN-a existitzen den egiaztatu
$user_query = mysqli_query($conn, "SELECT * FROM Erabiltzailea WHERE email='$email' OR nan='$nan'");

if (mysqli_num_rows($user_query) > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Erabiltzailea edo NAN-a dagoeneko erregistratuta dago."
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