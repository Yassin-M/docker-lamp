<?php
// show_item.php - devuelve filas HTML para la tabla Datuak
ob_start();
// Include the shared DB connector only if mysqli extension exists to avoid
// fatal errors when php-mysql is not installed.
$included = false;
if (function_exists('mysqli_connect')) {
    @include __DIR__ . '/../index.php';
    $included = true;
}
ob_end_clean();

$sql = "SELECT izena, kostua, bizitza, erasoa, mota FROM Datuak ORDER BY izena ASC";
$result = $conn->query($sql);

if (!$result) {
    echo "<tr><td colspan='5'>Kontsulta errorea: " . htmlspecialchars($conn->error) . "</td></tr>";
    $conn->close();
    exit;
}
if (isset($_GET['item'])) {
    $item = $_GET['item']; // Guarda el valor del parámetro
    $item_izena = urldecode($item);
    $item_izena = htmlspecialchars($item_izena);
} else {
    echo "No se ha especificado ningún item.";
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $izena = htmlspecialchars($row['izena']);
        if ($izena == $item_izena) {
            $kostua = htmlspecialchars($row['kostua']);
            $bizitza = htmlspecialchars($row['bizitza']);
            $erasoa = htmlspecialchars($row['erasoa']);
            $mota = htmlspecialchars($row['mota']);
            echo "<tr>";
            echo "<td>{$izena}</td>";
            echo "<td><span class='pill'>{$kostua}</span></td>";
            echo "<td>{$bizitza}</td>";
            echo "<td>{$erasoa}</td>";
            echo "<td><span class='badge'>{$mota}</span></td>";
            echo "</tr>";
        }
    }
} else {
    echo "<tr><td colspan='5'>Ez dago kartarik datu basean.</td></tr>";
}

$conn->close();

?>
