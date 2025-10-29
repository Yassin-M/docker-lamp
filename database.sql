-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 23-10-2025 a las 08:40:28
-- Versión del servidor: 10.8.2-MariaDB-1:10.8.2+maria~focal
-- Versión de PHP: 8.2.27

CREATE DATABASE IF NOT EXISTS `database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `database`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `Datuak` (
  `izena` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kostua` int(11) NOT NULL,
  `bizitza` int(11) NOT NULL,
  `erasoa` int(11) NOT NULL,
  `mota` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`izena`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO Datuak (izena, kostua, bizitza, erasoa, mota)
VALUES
-- --- ARRUNTAK ---
('Zalduna', 3, 1654, 192, 'Arrunta'),
('Arkulariak', 3, 290, 107, 'Arrunta'),
('Iratxoak', 2, 202, 121, 'Arrunta'),
('Eskeletoak', 1, 81, 81, 'Arrunta'),
('Morroiak', 3, 230, 103, 'Arrunta'),
('Kanoia', 3, 768, 203, 'Arrunta'),
('Barbaroak', 5, 480, 181, 'Arrunta'),
('Deskarga', 2, NULL, 192, 'Arrunta'),
('Geziak', 3, NULL, 303, 'Arrunta'),
('Izotz Golema', 2, 848, 84, 'Arrunta'),
('Erraldoi Noblea', 6, 1792, 321, 'Arrunta'),

-- --- BEREZIAK ---
('Txerrimuntatzaile', 4, 1548, 298, 'Berezia'),
('Su Bola', 4, NULL, 689, 'Berezia'),
('Mosketaria', 4, 712, 218, 'Berezia'),
('Mini P.E.K.K.A.', 4, 1228, 693, 'Berezia'),
('Erraldoia', 5, 3984, 254, 'Berezia'),
('Magoa', 5, 712, 281, 'Berezia'),
('Balquiria', 4, 1908, 267, 'Berezia'),
('Iratxoen Etxola', 5, 1144, NULL, 'Berezia'),
('Borroka Arietea', 4, 896, 292, 'Berezia'),
('Gerlarien Sendagilea', 4, 1260, 137, 'Berezia'),

-- --- EPIKOAK ---
('P.E.K.K.A.', 7, 3458, 678, 'Epikoa'),
('Haur Dragoi', 4, 1148, 160, 'Epikoa'),
('Eskeletoen Armada', 3, 81, 81, 'Epikoa'),
('Printzea', 5, 1868, 381, 'Epikoa'),
('Sorgina', 5, 836, 133, 'Epikoa'),
('Bonba Globoa', 5, 1672, 902, 'Epikoa'),
('Balezta', 6, 1548, 34, 'Epikoa'),
('Tximista', 6, NULL, 1032, 'Epikoa'),
('Iratxoen Kupela', 3, 202, 121, 'Epikoa'),
('Amorrua', 2, NULL, NULL, 'Epikoa'),
('Pozoia', 4, NULL, 96, 'Epikoa'),

-- --- LEGENDARIOAK ---
('Izotz Magoa', 3, 700, 109, 'Legendarioa'),
('Printzesa', 3, 261, 169, 'Legendarioa'),
('Meatzaria', 3, 1210, 192, 'Legendarioa'),
('Enborra', 2, NULL, 290, 'Legendarioa'),
('Infernu Dragoia', 4, 1172, 87, 'Legendarioa'),
('Tximista', 6, 1452, 1331, 'Legendarioa'),
('Mago Elektrikoa', 4, 712, 116, 'Legendarioa'),
('Basomutila', 4, 1152, 240, 'Legendarioa'),
('Hilerria', 5, NULL, 81, 'Legendarioa'),
('Mega Zalduna', 7, 3993, 266, 'Legendarioa'),
('Fenix', 4, 984, 278, 'Legendarioa'),

-- --- GARAILEAK ---
('Arkularien Erregina', 5, 1096, 240, 'Garailea'),
('Eskeletoen Erregea', 4, 2184, 203, 'Garailea'),
('Urrezko Zalduna', 4, 1812, 192, 'Garailea'),
('Monjea', 5, 1450, 228, 'Garailea'),
('Printzetxoa', 3, 960, 109, 'Garailea');

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Erabiltzailea` (
  `nan` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `izena` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jaiotze_data` date NOT NULL,
  `tlf` int(11) NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pasahitza` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`nan`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO Erabiltzailea (nan, izena, jaiotze_data, tlf, email, pasahitza)
VALUES
('12345678Z', 'admin', '2000-01-01', 123456789, 'admin@example.com', PASSWORD('test'));

COMMIT;
