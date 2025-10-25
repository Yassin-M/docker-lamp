<?php
   include("../index.php");
   
   $item_izena = $_POST['karta_izena'];
   $item_kostua = $_POST['karta_kostua'];
   $item_bizitza = $_POST['karta_bizitza'];
   $item_erasoa = $_POST['karta_erasoa'];
   $item_mota = $_POST['karta_mota'];

   $sql = "INSERT INTO Datuak (izena, kostua, bizitza, erasoa, mota) VALUES ('$item_izena', '$item_kostua', '$item_bizitza', '$item_erasoa', '$item_mota')";

   if ($conn->query($sql) === TRUE) {
      echo "Item added successfully.";
   } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
   }

   $conn->close();
?>