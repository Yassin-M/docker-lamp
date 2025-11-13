<?php
  // Include centralized headers for PHP responses (anti-clickjacking, CSP, etc.).
  // This file must be included before any output is sent.
  if (file_exists(__DIR__ . '/config/headers.php')) {
    include_once __DIR__ . '/config/headers.php';
  }

  //echo '<h1>Yeah, it works!<h1>';
  // phpinfo();
  $hostname = "db";
  $username = "admin";
  $password = "test";
  $db = "database";

  $conn = mysqli_connect($hostname,$username,$password,$db);
  if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
  }



// $query = mysqli_query($conn, "SELECT * FROM usuarios")
//    or die (mysqli_error($conn));

// while ($row = mysqli_fetch_array($query)) {
//   echo
//    "<tr>
//     <td>{$row['id']}</td>
//     <td>{$row['nombre']}</td>
//    </tr>";
   

// }

?>
