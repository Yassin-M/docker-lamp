<?php
ob_start();

$included = false;
if (function_exists('mysqli_connect')) {
    @include __DIR__ . '/../index.php';
    $included = true;
}
ob_end_clean();

// DB konexioaren egiaztapena
if (!$included || !isset($conn) || !$conn) {
    echo "<tr><td colspan='3' style='text-align:center;color:var(--danger);padding:1rem;'>Errorea: ezin izan da datu basera konektatu.</td></tr>";
    exit;
}

// SQL kontsulta zuzenean parametroekin
$sql = "SELECT izena, mota FROM Datuak ORDER BY izena ASC";
$result = $conn->query($sql);

if (!$result) {
    echo "<tr><td colspan='3' style='text-align:center;color:var(--danger);padding:1rem;'>Kontsulta errorea: " . $conn->error . "</td></tr>";
    $conn->close();
    exit;
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $izena = $row['izena'];
        $mota = $row['mota'];
        $showUrl   = '/show_item?item=' . rawurlencode((string)$izena);
        $deleteUrl = '/delete_item?item=' . rawurlencode((string)$izena);

        echo "<tr>";
        echo "<td>{$izena}</td>";
        echo "<td><span class='badge'>{$mota}</span></td>";
        echo '  <td class="actions">';
        echo '    <a class="btn" href="' . $showUrl . '">Ikusi</a> ';
        echo '    <a class="btn danger" href="' . $deleteUrl . '">Ezabatu</a>';
        echo '  </td>';
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='3' style='text-align:center;'>Ez dago kartarik datu basean.</td></tr>";
}

$conn->close();
?>
