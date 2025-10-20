<?php
   include("../index.php");
   $izena = $_POST['izena'];
   $nan = $_POST['nan'];

   $sql = "INSERT INTO usuarios (id, nombre) VALUES ('$nan', '$izena')";

   if ($conn->query($sql) === TRUE) {
      echo "Usuario registrado correctamente.";
   } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
   }
   // creo que aun no confirma que el usuario no exista
   $conn->close();
?>