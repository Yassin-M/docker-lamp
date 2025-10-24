<?php
include("../index.php");
header('Content-Type: application/json; charset=utf-8');

$stmt = $conn->prepare("UPDATE Erabiltzailea 
                        SET izena=?, email=?, jaiotze_data=?, tlf=? 
                        WHERE nan=?");

$stmt->bind_param("sssss", $_POST['izena'], $_POST['email'], $_POST['dob'], $_POST['telefonoa'], $_POST['nan']);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Erabiltzailea eguneratu da."]);

} else {
    echo json_encode(["success" => false, "message" => "Errorea: " . $stmt->error]);
}
mysqli_close($conn);
?>