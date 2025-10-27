-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 23-10-2025 a las 08:40:28
-- Versión del servidor: 10.8.2-MariaDB-1:10.8.2+maria~focal
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `database`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Datuak`
--

CREATE TABLE `Datuak` (
  `izena` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kostua` int(11) NOT NULL,
  `bizitza` int(11) NOT NULL,
  `erasoa` int(11) NOT NULL,
  `mota` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Datuak (izena, kostua, bizitza, erasoa, mota)
VALUES
-- --- COMUNES ---
('Caballero', 3, 1654, 192, 'Común'),
('Arqueras', 3, 290, 107, 'Común'),
('Duendes', 2, 202, 121, 'Común'),
('Esqueletos', 1, 81, 81, 'Común'),
('Esbirros', 3, 230, 103, 'Común'),
('Cañón', 3, 768, 203, 'Común'),
('Bárbaros', 5, 480, 181, 'Común'),
('Descarga', 2, NULL, 192, 'Común'),
('Flechas', 3, NULL, 303, 'Común'),
('Gólem de Hielo', 2, 848, 84, 'Común'),
('Gigante Noble', 6, 1792, 321, 'Común'),

-- --- ESPECIALES ---
('Montapuercos', 4, 1548, 298, 'Especial'),
('Bola de Fuego', 4, NULL, 689, 'Especial'),
('Mosquetera', 4, 712, 218, 'Especial'),
('Mini P.E.K.K.A.', 4, 1228, 693, 'Especial'),
('Gigante', 5, 3984, 254, 'Especial'),
('Mago', 5, 712, 281, 'Especial'),
('Valquiria', 4, 1908, 267, 'Especial'),
('Choza de Duendes', 5, 1144, NULL, 'Especial'),
('Ariete de Batalla', 4, 896, 292, 'Especial'),
('Curandera Guerrera', 4, 1260, 137, 'Especial'),

-- --- ÉPICAS ---
('P.E.K.K.A.', 7, 3458, 678, 'Épica'),
('Bebé Dragón', 4, 1148, 160, 'Épica'),
('Ejército de Esqueletos', 3, 81, 81, 'Épica'),
('Príncipe', 5, 1868, 381, 'Épica'),
('Bruja', 5, 836, 133, 'Épica'),
('Globo Bombástico', 5, 1672, 902, 'Épica'),
('Ballesta', 6, 1548, 34, 'Épica'),
('Rayo', 6, NULL, 1032, 'Épica'),
('Barril de Duendes', 3, 202, 121, 'Épica'),
('Furia', 2, NULL, NULL, 'Épica'),
('Veneno', 4, NULL, 96, 'Épica'), -- Daño por segundo

-- --- LEGENDARIAS ---
('Mago de Hielo', 3, 700, 109, 'Legendaria'),
('Princesa', 3, 261, 169, 'Legendaria'),
('Minero', 3, 1210, 192, 'Legendaria'),
('El Tronco', 2, NULL, 290, 'Legendaria'),
('Dragón Infernal', 4, 1172, 87, 'Legendaria'), -- Daño inicial que aumenta
('Chispitas', 6, 1452, 1331, 'Legendaria'),
('Mago Eléctrico', 4, 712, 116, 'Legendaria'),
('Leñador', 4, 1152, 240, 'Legendaria'),
('Cementerio', 5, NULL, 81, 'Legendaria'),
('Megacaballero', 7, 3993, 266, 'Legendaria'),
('Fénix', 4, 984, 278, 'Legendaria'),

-- --- CAMPEONES ---
('Reina Arquera', 5, 1096, 240, 'Campeón'),
('Rey Esqueleto', 4, 2184, 203, 'Campeón'),
('Caballero Dorado', 4, 1812, 192, 'Campeón'),
('Monje', 5, 1450, 228, 'Campeón'),
('Principito', 3, 960, 109, 'Campeón');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Erabiltzailea`
--

CREATE TABLE `Erabiltzailea` (
  `nan` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `izena` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jaiotze_data` date NOT NULL,
  `tlf` int(11) NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pasahitza` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Indices de la tabla `Datuak`
--
ALTER TABLE `Datuak`
  ADD PRIMARY KEY (`izena`);

--
-- Indices de la tabla `Erabiltzailea`
--
ALTER TABLE `Erabiltzailea`
  ADD PRIMARY KEY (`nan`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
