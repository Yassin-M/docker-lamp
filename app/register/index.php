<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erregistroa</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body class="centered-page">
    <div class="container">
        <div class="panel Formularioa" id="form_div">
            <form action="" name="formularioa" id="register_form" method="POST">
                <h1 style="text-align: center;">ERREGISTROA</h1>
                <p>
                    <label for="izena">Izena</label>
                    <input type="text" name="izena" id="izena" placeholder="Zure izena-abizenak sartu (Adib.: Asier Siñobas)" required>
                </p>
                <p>
                    <label for="nan">NAN</label>
                    <input type="text" name="nan" id="nan" placeholder="Zure NAN-a sartu (Adib.: 12345678Z)" required>
                </p>
                <p>
                    <label for="data">Jaiotze data</label>
                    <input type="date" name="data" id="data" required>
                </p>
                <p>
                    <label for="zenbakia">Telefonoa</label>
                    <input type="text" name="zenbakia" id="zenbakia" placeholder="Zure telefonoa sartu (Adib.: 612345678)" required>
                </p>
                <p>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Zure email-a sartu (Adib.: asier@ehu.eus)" required>
                </p>
                <p>
                    <label for="pasahitza">Pasahitza</label>
                    <input type="password" name="pasahitza" id="pasahitza" required>
                </p>
                <div class="buttons">
                    <a class="btn" type="button" id="atzera" href="../" role="button" style="margin-top: 1rem;">
                        <img src="../img/atzera.png" width="50" height="50">
                    </a>
                    <button class="btn primary" type="submit" id="register_submit" style="margin-top: 1rem;">
                        <img src="../img/bidali.png" width="50" height="50">
                    </button>
                    <button class="btn danger" type="reset" id="register_reset" style="margin-top: 1rem;">
                        <img src="../img/ezabatu.png" width="50" height="50">
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="../js/register.js" defer></script>
</body>
</html>

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
