-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2021 at 06:46 AM
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
('Dione Martins', 5, 'Project E', '2000000', '2021-06-08', '2021-08-03', '1', '2021-09-07', 'need followup'),
('Jett Baker', 6, 'Project F', '900000', '2021-06-14', '2021-07-27', '1', '2021-08-01', 'finalize changes asap');

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
