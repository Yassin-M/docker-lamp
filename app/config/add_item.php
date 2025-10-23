<?php
   include("../index.php");
   $item_izena = $_POST['item_izena'];
   $item_kostua = $_POST['item_kostua'];
   $item_bizitza = $_POST['item_bizitza'];
   $item_erasoa = $_POST['item_erasoa'];
   $item_mota = $_POST['item_mota'];

   $sql = "INSERT INTO items (izena, kostua, bizitza, erasoa, mota) VALUES ('$item_izena', '$item_kostua', '$item_bizitza', '$item_erasoa', '$item_mota')";

   if ($conn->query($sql) === TRUE) {
      echo "Item added successfully.";
   } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
   }

   $conn->close();
?>