<?php
include("../index.php");
header('Content-Type: application/json; charset=utf-8');

if (isset($_GET['item'])) {
    $item = $_GET['item'];
    $item_izena = urldecode($item);
    $item_izena = htmlspecialchars($item_izena);
} else {
    echo "No se ha especificado ningún item.";
}

$stmt = $conn->prepare("UPDATE Datuak 
                        SET kostua=?, bizitza=?, erasoa=?, mota=?
                        WHERE izena=?");

$stmt->bind_param("iiiss", $_POST['kostua'], $_POST['bizitza'], $_POST['erasoa'], $_POST['mota'], $item_izena);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Karta eguneratu da."]);

} else {
    echo json_encode(["success" => false, "message" => "Errorea: " . $stmt->error]);
}
mysqli_close($conn);
?>