<?php
// show_items.php - devuelve filas HTML para la tabla Datuak
ob_start();
// Include the shared DB connector only if mysqli extension exists to avoid
// fatal errors when php-mysql is not installed.
$included = false;
if (function_exists('mysqli_connect')) {
    @include __DIR__ . '/../index.php';
    $included = true;
}
ob_end_clean();

// If mysqli extension is not available or $conn is false, show demo data.
if (!function_exists('mysqli_connect') || !$included || !isset($conn) || !$conn) {
    // Demo/sample rows (so the frontend shows content while you fix PHP/MySQL)
    $demo = [
        ['izena' => 'P.Ejemplo 1', 'kostua' => 3, 'bizitza' => 1200, 'erasoa' => 150, 'mota' => 'Common'],
        ['izena' => 'P.Ejemplo 2', 'kostua' => 5, 'bizitza' => 1600, 'erasoa' => 220, 'mota' => 'Rare'],
        ['izena' => 'P.Legendaria', 'kostua' => 6, 'bizitza' => 1100, 'erasoa' => 400, 'mota' => 'Legendaria'],
        ['izena' => 'P.Tanque', 'kostua' => 7, 'bizitza' => 4200, 'erasoa' => 90, 'mota' => 'Troop'],
        ['izena' => 'P.Ataque', 'kostua' => 4, 'bizitza' => 900, 'erasoa' => 260, 'mota' => 'Epic'],
    ];

    foreach ($demo as $row) {
        $izena = htmlspecialchars($row['izena']);
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

    // Also emit a small HTML comment to help debugging
    echo "\n<!-- show_items.php: demo data rendered because mysqli/connection is not available -->\n";
    exit;
}

$sql = "SELECT izena, kostua, bizitza, erasoa, mota FROM Datuak ORDER BY izena ASC";
$result = $conn->query($sql);

if (!$result) {
    echo "<tr><td colspan='5'>Error en consulta: " . htmlspecialchars($conn->error) . "</td></tr>";
    $conn->close();
    exit;
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $izena = htmlspecialchars($row['izena']);
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
} else {
    echo "<tr><td colspan='5'>No hay cartas en la base de datos.</td></tr>";
}

$conn->close();

?>
