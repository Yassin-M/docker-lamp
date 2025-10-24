<?php
    include("../index.php"); // datu basera konektatu

    // Recoger datos del formulario
    $izena = $_POST['izena'];
    $nan = $_POST['nan'];
    $zenbaki = $_POST['zenbakia'];
    $data = $_POST['data'];
    $email = $_POST['email'];
    $pasahitza = $_POST['pasahitza'];

    // konprobatu erabiltzailea erregistratuta badago
    $user_query = mysqli_query($conn, "SELECT * FROM Erabiltzailea WHERE email='$email'") or die (mysqli_error($conn));
    $nan_query = mysqli_query($conn, "SELECT * FROM Erabiltzailea WHERE nan='$nan'") or die (mysqli_error($conn));

    if(mysqli_num_rows($user_query) > 0 || mysqli_num_rows($nan_query) > 0) {
        echo "<script>alert('Erabiltzailea erregistratuta dago.'); window.history.back();</script>";
        mysqli_free_result($user_query);
        mysqli_free_result($nan_query);
    } else {
        // Insertar nuevo usuario
        $user_insert = mysqli_query($conn, "INSERT INTO Erabiltzailea (nan, izena, jaiotze_data, tlf, email, pasahitza) 
                                            VALUES ('$nan', '$izena', '$data', '$zenbaki', '$email', '$pasahitza')") 
                                            or die (mysqli_error($conn));

        if ($user_insert) {
            echo "<div style='background-color:#c8f7c5; color:#2e7d32; padding:10px; border-radius:8px; text-align:center; font-weight:bold margin:20px auto; width:fit-content;'>
                     Erabiltzailea erregistratu da.
                  </div>";

        } else {
            echo "Error: " . mysqli_error($conn) . "";
        }
    }
    
    mysqli_close($conn);
?>