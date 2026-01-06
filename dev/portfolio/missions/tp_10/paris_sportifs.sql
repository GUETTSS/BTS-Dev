SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `gain` (
  `id_gain` int NOT NULL,
  `id_pari` int DEFAULT NULL,
  `montant_gain` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `gain` (`id_gain`, `id_pari`, `montant_gain`) VALUES
(1, 1, 36.00),
(2, 2, 27.50),
(3, 3, 0.00);


CREATE TABLE `matchs` (
  `id_match` int NOT NULL,
  `equipe_dom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `equipe_ext` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `date_match` datetime NOT NULL,
  `id_sport` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-

INSERT INTO `matchs` (`id_match`, `equipe_dom`, `equipe_ext`, `date_match`, `id_sport`) VALUES
(1, 'PSG', 'Marseille', '2025-03-10 20:00:00', 1),
(2, 'Lakers', 'Warriors', '2025-03-12 04:00:00', 2),
(3, 'Nadal', 'Djokovic', '2025-03-15 14:00:00', 3);



CREATE TABLE `pari` (
  `id_pari` int NOT NULL,
  `id_user` int DEFAULT NULL,
  `id_match` int DEFAULT NULL,
  `id_typepari` int DEFAULT NULL,
  `mise` decimal(6,2) NOT NULL,
  `choix` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `pari` (`id_pari`, `id_user`, `id_match`, `id_typepari`, `mise`, `choix`) VALUES
(1, 1, 1, 1, 20.00, 'PSG gagne'),
(2, 2, 2, 2, 15.00, 'Plus de 210 points'),
(3, 3, 3, 3, 10.00, '3-2');


CREATE TABLE `sport` (
  `id_sport` int NOT NULL,
  `nom_sport` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `sport` (`id_sport`, `nom_sport`) VALUES
(1, 'Football'),
(2, 'Basketball'),
(3, 'Tennis');



CREATE TABLE `typepari` (
  `id_typepari` int NOT NULL,
  `description` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `typepari` (`id_typepari`, `description`) VALUES
(1, 'Vainqueur du match'),
(2, 'Nombre de buts'),
(3, 'Score exact');



CREATE TABLE `utilisateur` (
  `id_user` int NOT NULL,
  `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `utilisateur` (`id_user`, `nom`, `prenom`, `email`) VALUES
(1, 'Dupont', 'Marc', 'marc.dupont@gmail.com'),
(2, 'Lopez', 'Sara', 'sara.lopez@gmail.com'),
(3, 'Martin', 'Julie', 'julie.martin@gmail.com');


ALTER TABLE `gain`
  ADD PRIMARY KEY (`id_gain`),
  ADD KEY `id_pari` (`id_pari`);


ALTER TABLE `matchs`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `id_sport` (`id_sport`);



ALTER TABLE `pari`
  ADD PRIMARY KEY (`id_pari`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_match` (`id_match`),
  ADD KEY `id_typepari` (`id_typepari`);


ALTER TABLE `sport`
  ADD PRIMARY KEY (`id_sport`);


ALTER TABLE `typepari`
  ADD PRIMARY KEY (`id_typepari`);


ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);


ALTER TABLE `gain`
  MODIFY `id_gain` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `matchs`
  MODIFY `id_match` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `pari`
  MODIFY `id_pari` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `sport`
  MODIFY `id_sport` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `typepari`
  MODIFY `id_typepari` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `utilisateur`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `gain`
  ADD CONSTRAINT `gain_ibfk_1` FOREIGN KEY (`id_pari`) REFERENCES `pari` (`id_pari`);


ALTER TABLE `matchs`
  ADD CONSTRAINT `matchs_ibfk_1` FOREIGN KEY (`id_sport`) REFERENCES `sport` (`id_sport`);


ALTER TABLE `pari`
  ADD CONSTRAINT `pari_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id_user`),
  ADD CONSTRAINT `pari_ibfk_2` FOREIGN KEY (`id_match`) REFERENCES `matchs` (`id_match`),
  ADD CONSTRAINT `pari_ibfk_3` FOREIGN KEY (`id_typepari`) REFERENCES `typepari` (`id_typepari`);
COMMIT;
