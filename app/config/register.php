<?php
include("../index.php"); // Conexión a la base de datos

// Recoger datos del formulario
$izena = trim($_POST['izena']);
$nan = trim($_POST['nan']);
$zenbaki = trim($_POST['zenbakia']);
$data = trim($_POST['data']);
$email = trim($_POST['email']);
$pasahitza = trim($_POST['pasahitza']);

// Comprobar si el usuario ya existe
$stmt = $conn->prepare("SELECT * FROM Erabiltzailea WHERE nan=? OR email=?");
$stmt->bind_param("ss", $nan, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "El usuario ya existe.";
    exit;
}

// Insertar usuario (password en texto plano, para pruebas; ideal: usar password_hash)
$stmt = $conn->prepare("INSERT INTO Erabiltzailea (nan, izena, jaiotze_data, tlf, email, pasahitza) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $nan, $izena, $data, $zenbaki, $email, $pasahitza);

if ($stmt->execute()) {
    echo "Usuario registrado correctamente.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
