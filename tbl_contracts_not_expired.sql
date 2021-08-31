-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2021 at 07:24 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contracts_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contracts`
--

CREATE TABLE `tbl_contracts` (
  `client_name` varchar(250) NOT NULL,
  `contract_no` int(255) NOT NULL,
  `project_title` varchar(250) NOT NULL,
  `contract_fees` varchar(200) NOT NULL,
  `begin_date` date NOT NULL,
  `end_date` date NOT NULL,
  `possible_extension` varchar(3) NOT NULL,
  `extension_date_end` date NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_contracts`
--

INSERT INTO `tbl_contracts` (`client_name`, `contract_no`, `project_title`, `contract_fees`, `begin_date`, `end_date`, `possible_extension`, `extension_date_end`, `remarks`) VALUES
('Jones Smith', 1, 'Project A', '1000000', '2021-08-01', '2021-08-31', '2', '0000-00-00', ''),
('Nahla Dixon', 2, 'Project B', '500000', '2021-08-10', '2021-08-30', '1', '2021-09-03', 'start asap'),
('Alanna Stuart', 3, 'Project C', '1200000', '2021-07-05', '2021-09-20', '2', '0000-00-00', ''),
('Gavin Russo', 4, 'Project D', '650000', '2021-10-06', '2021-10-29', '2', '0000-00-00', ''),
('Emelia Wise', 7, 'Project G', '5600000', '2021-06-07', '2021-09-16', '2', '0000-00-00', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_contracts`
--
ALTER TABLE `tbl_contracts`
  ADD PRIMARY KEY (`contract_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_contracts`
--
ALTER TABLE `tbl_contracts`
  MODIFY `contract_no` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
