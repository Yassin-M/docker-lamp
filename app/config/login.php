<?php
   include('../index.php'); //Datu basearekin konexioa
   session_start();
   $_SESSION = []:

   // datuak formulariotik hartu
   $email = $_POST['email'];
   $pasahitza = $_POST['pasahitza'];

   // Konprobatu emaila existizen dela datu basean
   $user_query = mysqli_query($conn, "SELECT * FROM Erabiltzilea WHERE email='$email'");

   if(mysqli_num_rows($user_query) == 1){
      $erabiltzailea = mysqli_fetch_assoc($user_query);
      if($usuario['pasahitza'] === $pasahitza){
         $_SESSION['erabiltzailea'] = $erabiltzailea['izena'];
      }
   }else{
      
   }

?>