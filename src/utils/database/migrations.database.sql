-- Host: localhost
-- Generation Time: Feb 27, 2022 at 09:40 AM
-- Server version: 10.4.22-MariaDB
--
-- --------------------------------------------------------
--
START TRANSACTION;

--
-- --------------------------------------------------------
--
use pickels --
-- Database: `pickels`
--
-- --------------------------------------------------------
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

--
-- --------------------------------------------------------
--
COMMIT;