-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2025 a las 09:48:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecoexperience`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(3, 1747522554890, 'InitSchema1747522554890');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` varchar(255) NOT NULL,
  `asistentes` int(11) NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `clienteId` int(11) DEFAULT NULL,
  `guiaId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `fecha`, `hora`, `asistentes`, `observaciones`, `clienteId`, `guiaId`) VALUES
(1, '2025-06-05', '09:00', 4, 'Asistentes con movilidad reducida', 1, NULL),
(2, '2025-06-05', '09:00', 15, '', 3, 11),
(3, '2025-06-07', '10:00', 4, '', 1, NULL),
(4, '2025-06-08', '11:30', 25, '', 10, NULL),
(5, '2025-06-04', '09:00', 1, 'Vamos con niños', 2, 9),
(6, '2025-06-05', '10:30', 4, 'Ruta con niños', 2, NULL),
(7, '2025-06-06', '09:00', 2, 'Vamos con un niño pequeño', 2, NULL),
(8, '2025-06-06', '11:30', 1, '', 2, NULL),
(9, '2025-06-06', '11:30', 1, '', 2, NULL),
(10, '2025-06-27', '13:00', 14, '', 2, NULL),
(11, '2025-06-27', '13:30', 1, '', 2, NULL),
(12, '2025-06-27', '13:30', 1, '', 2, NULL),
(13, '2025-06-20', '13:00', 1, '', 2, NULL),
(14, '2025-06-13', '13:00', 1, '', 2, NULL),
(15, '2025-06-18', '20:30', 1, '', 2, NULL),
(16, '2025-06-20', '17:00', 1, '', 2, 9),
(17, '2025-06-13', '17:00', 1, '', 2, NULL),
(18, '2025-06-13', '13:00', 1, '', 2, NULL),
(19, '2025-06-05', '11:00', 1, '', 1, NULL),
(20, '2025-06-07', '12:30', 1, '', 1, NULL),
(21, '2025-06-13', '13:00', 1, '', 1, NULL),
(22, '2025-06-21', '15:00', 1, '', 1, NULL),
(23, '2025-06-27', '13:00', 1, 'probando ', 1, NULL),
(24, '2025-06-27', '11:00', 1, '', 1, NULL),
(25, '2025-06-13', '17:00', 4, '', 2, NULL),
(26, '2025-06-05', '13:00', 3, '', 2, NULL),
(27, '2025-06-06', '13:00', 4, 'Presentacion', 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `descripcion`) VALUES
(1, 'Admin'),
(2, 'Cliente'),
(3, 'Guía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles_asignados`
--

CREATE TABLE `roles_asignados` (
  `id_rol` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles_asignados`
--

INSERT INTO `roles_asignados` (`id_rol`, `id_user`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 9),
(2, 10),
(2, 12),
(3, 2),
(3, 3),
(3, 9),
(3, 10),
(3, 11),
(3, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas`
--

CREATE TABLE `rutas` (
  `id` int(11) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `subtitulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `duracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutas`
--

INSERT INTO `rutas` (`id`, `tipo`, `titulo`, `subtitulo`, `descripcion`, `imagen`, `precio`, `duracion`) VALUES
(1, 'Tuk Tuk', 'Tour en Tuk Tuk por Córdoba', 'Recorrido panorámico por los principales monumentos', 'Explora la ciudad de Córdoba desde una perspectiva única a bordo de un tuk-tuk eléctrico. Visita lugares emblemáticos como la Plaza de las Tendillas, el Templo Romano, la Plaza de la Corredera, el Puente Romano, la Torre de la Calahorra y la Puerta del Puente, acompañado por un guía profesional.<br><br>Si quieres conocer Córdoba al detalle, éste es el tour perfecto. Ya que tendrás la oportunidad de visualizar las principales partes del casco histórico así como los lugares icónicos de la ciudad. En este tour disfrutarás de una experiencia completa y detallada. Pero no acaba ahí, te mostraremos la parte más cosmopolita de la ciudad, dónde se concentra la vida y por supuesto en todo momento estaremos asesorándote para lo que necesites.', 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/free-tour.jpg?w=800&ssl=1', 25.00, 75),
(2, 'A pie', 'Free Tour por Córdoba', 'Descubre la historia y cultura de la ciudad', 'Queremos que te sumerjas en una experiencia llena de historia y lugares únicos. <br>Te mostraremos sitios tan icónicos como la Plaza de la Corredera, el patio de los Naranjos de la Mezquita Catedral, el famoso Puente Romano y un sinfín de lugares más.<br> Si quieres tener una experiencia diferente, reserva ya nuestro FREETOUR Paseo por Córdoba. <br><br>Recorrido: Plaza de las Tendillas > Templo Romano > Plaza de la Corredera > Plaza del Potro > Puente Romano > Torre de la Calahorra > Puerta del Puente > Patio de los Naranjos', 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/free-tour.jpg?w=800&ssl=1', 0.00, 90),
(3, 'A pie', 'Visita a la Mezquita-Catedral', 'Explora el monumento más emblemático de Córdoba', 'Realiza una visita guiada por la Mezquita-Catedral de Córdoba, descubriendo su historia, arquitectura y arte. Acompañado por un guía experto, conocerás los detalles de este Patrimonio de la Humanidad.<br>\r\nTe recomendamos nuestra visita guiada a la Mezquita Catedral para descubrir uno de los monumentos más importantes de occidente. Cuenta con un emplazamiento privilegiado a orillas del Guadalquivir.<br> Recorre con nosotros las diferentes naves del interior, así como las capillas principales, el crucero catedralicio, cada parte así como las ampliaciones de época islámica suponen aún más riqueza artística', 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-mezquita.jpg?w=800&ssl=1', 12.00, 60),
(4, 'A pie', 'Visita al Alcázar de los Reyes Cristianos', 'Recorre los jardines y salones del Alcázar', 'Descubre el Alcázar de los Reyes Cristianos, una fortaleza con impresionantes jardines y salones históricos.<br>\r\nEl Alcázar de los Reyes Cristianos se remonta a 1328, debe su nombre a los diferentes reyes que han vivido en la fortaleza desde que la ciudad de Córdoba fue reconquistada por los cristianos en el siglo XIII. Aunque de todos los Reyes que han vivido en el Alcázar los más conocidos han sido los Reyes Católicos; Isabel y Fernando. <br>En nuestra visita al Alcázar de Córdoba podrá descubrir la historia que guarda la fortaleza, así como los impresionantes jardines que se albergan en el interior del monumento.', 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-alcazar.jpg?w=800&ssl=1', 10.00, 60),
(5, 'A pie', 'Ruta de las Tres Culturas', 'Un viaje por la Córdoba judía, cristiana y musulmana', 'Si no quieres perderte detalle alguno de la ciudad debes de realizar la visita guiada a la Mezquita, el Alcázar y la judería de Córdoba. La duración es aproximadamente de tres horas en la que haremos descansos entre monumento y monumento, y te aseguramos que tendrás una visión monumental general de una ciudad con miles de años de historia.<br>Es una visita guiada muy completa, en ella podrás dejarte llevar y despreocuparte por horarios, nosotros te organizamos todo el itinerario. El primer monumento que se visita es la Mezquita Catedral, más tarde continuaremos con la fortaleza medieval por excelencia en Córdoba; el Alcázar. Y culminaremos recorriendo las callejas de la judería de Córdoba, iremos a los puntos más turísticos de este enclave.', 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-tres-culturas.jpg?w=800&ssl=1', 20.00, 120),
(6, 'A pie', 'Visita a Medina Azahara', 'Explora la ciudad palatina del Califato', 'Visita las ruinas de Medina Azahara, la ciudad palatina construida por el califa Abderramán III. Conoce su historia y arquitectura en una visita guiada por este yacimiento arqueológico.<br>\r\nMedina Azahara situada a ocho kilómetros de Córdoba, es la última de las cuatro declaraciones de patrimonio de la humanidad por la Unesco que tiene la ciudad de Córdoba desde el año 2018. En nuestra visita guiada a Medina Azahara podrás descubrir la historia, características, así como los miles de leyendas que guarda la antigua ciudad califal.<br>En esta visita guiada al yacimiento arqueológico de Medina Azahara nuestros guías te darán a conocer como fue la vida de Abderramán III, el califa que ordenó fundar la conocida como ciudad brillante entre los años 936 Y 976 D.c. Allá dónde la montaña se hace valle se emplaza esta ciudad califal de Medina Azahara.\r\n', 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-medina-azahara.jpg?w=800&ssl=1', 15.00, 150),
(7, 'A pie', 'Ruta de los Patios de Córdoba', 'Descubre la tradición de los patios cordobeses', 'Recorre los patios más emblemáticos de Córdoba, conocidos por su belleza y tradición. Aprende sobre su historia y la cultura que los rodea en esta visita guiada.', 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/tour-esencial.jpg?w=800&ssl=1', 8.00, 90),
(8, 'A pie', 'Ruta Gastronómica: Sabores de Córdoba y Espectáculo Ecuestre', 'Degusta los platos típicos cordobeses', 'Disfruta de la gastronomía de Córdoba, degustando platos típicos como el salmorejo, el rabo de toro y los flamenquines. Incluye visitas a tabernas tradicionales y explicaciones sobre la cocina local.<br>\r\nAdemás terminaremos la ruta en un espectáculo ecuestre en las Caballerizas Reales<br>\r\nLas Caballerizas Reales de Córdoba fueron fundadas en 1570 por orden de Felipe II, quien, motivado por su pasión por los caballos, inició un ambicioso proyecto: crear una de las razas equinas más excepcionales de la historia, el Caballo Andaluz Pura Raza Española. Lo que comenzó como un simple deseo del monarca, se convirtió en uno de los proyectos más significativos y queridos de su reinado. El Pura Raza Español, reconocido por su elegancia y habilidades para la monta, llegó a ser un símbolo destacado del imperio español.', 'https://i0.wp.com/cordobaecoexperience.es/wp-content/uploads/2024/06/cordoba-ecuestre.jpg?w=800&ssl=1', 30.00, 120);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas_reserva`
--

CREATE TABLE `rutas_reserva` (
  `id_reserva` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutas_reserva`
--

INSERT INTO `rutas_reserva` (`id_reserva`, `id_ruta`) VALUES
(1, 1),
(2, 6),
(3, 1),
(4, 2),
(5, 2),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 4),
(19, 5),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 5),
(25, 1),
(26, 1),
(27, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tuktuk`
--

CREATE TABLE `tuktuk` (
  `matricula` varchar(255) NOT NULL,
  `capacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tuktuk`
--

INSERT INTO `tuktuk` (`matricula`, `capacidad`) VALUES
('0515MZL', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tuk_tuk_reserva`
--

CREATE TABLE `tuk_tuk_reserva` (
  `id_reserva` int(11) NOT NULL,
  `matricula_tuk_tuk` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tuk_tuk_reserva`
--

INSERT INTO `tuk_tuk_reserva` (`id_reserva`, `matricula_tuk_tuk`) VALUES
(1, '0515MZL'),
(3, '0515MZL'),
(6, '0515MZL'),
(7, '0515MZL'),
(8, '0515MZL'),
(9, '0515MZL'),
(20, '0515MZL'),
(21, '0515MZL'),
(22, '0515MZL'),
(23, '0515MZL'),
(25, '0515MZL'),
(26, '0515MZL'),
(27, '0515MZL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `tlfno` varchar(20) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `pais` varchar(255) NOT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellidos`, `tlfno`, `correo`, `dni`, `pais`, `pass`, `deleted_at`) VALUES
(1, 'Admin', 'User', '666666666', 'admin@nest.com', '3B', 'España', '$2b$10$7l/6MYt2QCljqsLUUSm1KO/FD.2jLusIxVK7zaj1vNOuj2w1uAYr2', NULL),
(2, 'Lucía', 'Rubio Sánchez', '123456789', 'lucia@nest.com', '2C', 'España', '$2b$10$nNS7zuFCtb6STknZ6F.LjeXnZGvc72TooeZdtyuOmgLgYVJD7VC3u', NULL),
(3, 'Manuel', 'De Luca', '12345679', 'manuel@nest.com', '1B', 'España', '$2b$10$onJU2t/xpX6RSD1IE2P35OUhD7MuT3hdhTBJsnnvXnc.4Lkxbr9Ny', NULL),
(4, 'Marciano', 'De la Oz', '1234', 'marciano@nest.com', '2B', 'España', '$2b$10$g7wLzBXbtE5Ip1ZdIDqY5urylwHfIxrxD9IyHTABFINi21rQn4DGK', NULL),
(9, 'Inmaculada', 'Gijón', '147896', 'inma@angular.com', '012305', 'España', '$2b$10$GU8Z1NLVMFDMsaeDQL8OsehW7iSDG5Fno357j13x2TffKSpdWtzW6', NULL),
(10, 'Fernando David', 'Gómez Aranzabe', '111222333', 'fernando@nest.com', '111222333', 'España', '$2b$10$mGQ/dCFy2fwad9karknmG.f0WzaJqnfnzkqizwtMFzNAnwTr5xZO.', NULL),
(11, 'Francisco', 'Alion', '222333444', 'fran@python.com', '222333444', 'España', '$2b$10$4ezJ33.2ipqiv8M7abk6bev21aqmFBa0bD.4of4TNIc4gOwp78R7e', NULL),
(12, 'Luka', 'Polo Rubio', '178145123', 'luka@nest.com', '568', 'España', '$2b$10$H9VKKZNMUFU8qQjsQ.2xXO2RxUeB4Qp7GJLmZONc3YJLI/a3vT0p6', '2025-06-01 19:46:01.000000');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_8ee0c58de71f30301e1b6994695` (`clienteId`),
  ADD KEY `FK_83cd86b407ad89400b3c4d4283e` (`guiaId`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles_asignados`
--
ALTER TABLE `roles_asignados`
  ADD PRIMARY KEY (`id_rol`,`id_user`),
  ADD KEY `IDX_5667a03d4021fa069ea7669539` (`id_rol`),
  ADD KEY `IDX_35e9c57b3302b82320f63e7aaf` (`id_user`);

--
-- Indices de la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutas_reserva`
--
ALTER TABLE `rutas_reserva`
  ADD PRIMARY KEY (`id_reserva`,`id_ruta`),
  ADD KEY `IDX_e6f5eb767b19364830a45def77` (`id_reserva`),
  ADD KEY `IDX_0b8ba620bd6790db793d2bfd02` (`id_ruta`);

--
-- Indices de la tabla `tuktuk`
--
ALTER TABLE `tuktuk`
  ADD PRIMARY KEY (`matricula`);

--
-- Indices de la tabla `tuk_tuk_reserva`
--
ALTER TABLE `tuk_tuk_reserva`
  ADD PRIMARY KEY (`id_reserva`,`matricula_tuk_tuk`),
  ADD KEY `IDX_5274e5e729a26b503944cc1bc8` (`id_reserva`),
  ADD KEY `IDX_e9c5c1a233139d2f671d0061d5` (`matricula_tuk_tuk`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_d3cf8c651c0e94ea522b61ca3a` (`correo`),
  ADD UNIQUE KEY `IDX_5fe9cfa518b76c96518a206b35` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rutas`
--
ALTER TABLE `rutas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `FK_83cd86b407ad89400b3c4d4283e` FOREIGN KEY (`guiaId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8ee0c58de71f30301e1b6994695` FOREIGN KEY (`clienteId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `roles_asignados`
--
ALTER TABLE `roles_asignados`
  ADD CONSTRAINT `FK_35e9c57b3302b82320f63e7aafb` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5667a03d4021fa069ea76695391` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rutas_reserva`
--
ALTER TABLE `rutas_reserva`
  ADD CONSTRAINT `FK_0b8ba620bd6790db793d2bfd02e` FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e6f5eb767b19364830a45def77b` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tuk_tuk_reserva`
--
ALTER TABLE `tuk_tuk_reserva`
  ADD CONSTRAINT `FK_5274e5e729a26b503944cc1bc83` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_e9c5c1a233139d2f671d0061d56` FOREIGN KEY (`matricula_tuk_tuk`) REFERENCES `tuktuk` (`matricula`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
