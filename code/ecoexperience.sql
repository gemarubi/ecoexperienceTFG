-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2025 a las 21:43:32
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
(1, 1747522554890, 'InitSchema1747522554890');

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
(2, 2),
(3, 2);

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
(1, 'Tuk Tuk', 'Tour en Tuk Tuk por Córdoba', 'Recorrido panorámico por los principales monumentos', 'Explora la ciudad de Córdoba desde una perspectiva única a bordo de un tuk-tuk eléctrico. Visita lugares emblemáticos como la Plaza de las Tendillas, el Templo Romano, la Plaza de la Corredera, el Puente Romano, la Torre de la Calahorra y la Puerta del Puente, acompañado por un guía profesional.', 'https://cordobaecoexperience.es/images/tuk-tuk-tour.jpg', 25.00, 75),
(2, 'A pie', 'Free Tour por Córdoba', 'Descubre la historia y cultura de la ciudad', 'Disfruta de un recorrido a pie por el centro histórico de Córdoba, visitando lugares como la Plaza de las Tendillas, el Templo Romano, la Plaza de la Corredera, la Plaza del Potro, el Puente Romano, la Torre de la Calahorra y la Puerta del Puente. Finaliza el tour en el Patio de los Naranjos de la Mezquita-Catedral.', 'https://cordobaecoexperience.es/images/free-tour.jpg', 0.00, 90),
(3, 'A pie', 'Visita a la Mezquita-Catedral', 'Explora el monumento más emblemático de Córdoba', 'Realiza una visita guiada por la Mezquita-Catedral de Córdoba, descubriendo su historia, arquitectura y arte. Acompañado por un guía experto, conocerás los detalles de este Patrimonio de la Humanidad.', 'https://cordobaecoexperience.es/images/mezquita-catedral.jpg', 12.00, 60),
(4, 'A pie', 'Visita al Alcázar de los Reyes Cristianos', 'Recorre los jardines y salones del Alcázar', 'Descubre el Alcázar de los Reyes Cristianos, una fortaleza con impresionantes jardines y salones históricos. La visita incluye una guía detallada por las distintas estancias y patios del monumento.', 'https://cordobaecoexperience.es/images/alcazar.jpg', 10.00, 60),
(5, 'A pie', 'Ruta de las Tres Culturas', 'Un viaje por la Córdoba judía, cristiana y musulmana', 'Embárcate en un recorrido que te llevará por los principales monumentos de las tres culturas que convivieron en Córdoba: la Mezquita-Catedral, el Alcázar de los Reyes Cristianos y la Judería.', 'https://cordobaecoexperience.es/images/tres-culturas.jpg', 20.00, 120),
(6, 'A pie', 'Visita a Medina Azahara', 'Explora la ciudad palatina del Califato', 'Visita las ruinas de Medina Azahara, la ciudad palatina construida por el califa Abderramán III. Conoce su historia y arquitectura en una visita guiada por este yacimiento arqueológico.', 'https://cordobaecoexperience.es/images/medina-azahara.jpg', 15.00, 150),
(7, 'A pie', 'Ruta de los Patios de Córdoba', 'Descubre la tradición de los patios cordobeses', 'Recorre los patios más emblemáticos de Córdoba, conocidos por su belleza y tradición. Aprende sobre su historia y la cultura que los rodea en esta visita guiada.', 'https://cordobaecoexperience.es/images/patios.jpg', 8.00, 90),
(8, 'A pie', 'Ruta Gastronómica: Sabores de Córdoba', 'Degusta los platos típicos cordobeses', 'Participa en una ruta gastronómica por Córdoba, degustando platos típicos como el salmorejo, el rabo de toro y los flamenquines. Incluye visitas a tabernas tradicionales y explicaciones sobre la cocina local.', 'https://cordobaecoexperience.es/images/gastronomia.jpg', 30.00, 120);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas_reserva`
--

CREATE TABLE `rutas_reserva` (
  `id_reserva` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tuktuk`
--

CREATE TABLE `tuktuk` (
  `matricula` varchar(255) NOT NULL,
  `capacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tuk_tuk_reserva`
--

CREATE TABLE `tuk_tuk_reserva` (
  `id_reserva` int(11) NOT NULL,
  `matricula_tuk_tuk` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Admin', 'User', '666666633', 'admin@nest.com', '11', 'España', '$2b$10$.U1fXG/H0E/ne686.MEKeO9tT2AvuLoXqJOwMyO8dnl2FJcCGWL2K', NULL),
(2, 'Lucía', 'Rubio Sánchez', '123456789', 'lucia@nest.com', '1A', 'España', '$2b$10$7qDKVcEfc4cM8G7OXIslheNCgmY3FA7s6i34d3rCKR5Dx78L63.Ji', NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
