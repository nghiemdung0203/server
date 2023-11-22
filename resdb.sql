-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2023 at 03:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `Bill_id` int(11) NOT NULL,
  `Customer_id` int(11) DEFAULT NULL,
  `Order_id` int(11) DEFAULT NULL,
  `Payment_status` enum('Paid','Unpaid') DEFAULT 'Unpaid',
  `Payment_method` enum('Cash','Credit Card') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drinks`
--

CREATE TABLE `drinks` (
  `Drink_id` int(11) NOT NULL,
  `Drink_name` varchar(100) NOT NULL,
  `Drink_size` varchar(10) NOT NULL,
  `Drink_category` varchar(50) NOT NULL,
  `Drink_price` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drinks`
--

INSERT INTO `drinks` (`Drink_id`, `Drink_name`, `Drink_size`, `Drink_category`, `Drink_price`) VALUES
(3, 'Bia Hà Nội', 'L', 'Beer', 40000);

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `Food_id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `DescribeFood` varchar(255) NOT NULL,
  `Expiry` varchar(255) DEFAULT NULL,
  `Food_Price` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`Food_id`, `Name`, `DescribeFood`, `Expiry`, `Food_Price`) VALUES
(2, 'Cơm rang', 'Cơm rang là một món ăn phổ biến trong ẩm thực Đông Á, Đông Nam Á và một số nền văn hóa ẩm thực Nam Á. Món cơm chiên thường được chế biến bằng cách nấu cơm trước đó, sau đó chảo hoặc rán cơm với các thành phần khác như trứng, rau, hải sản hoặc thịt. Món ăn', '1 day', 35000),
(3, 'Phở Gà', 'Phở Gà là một món súp truyền thống của ẩm thực Việt Nam. Sự hòa quyện giữa nước dùng phở thơm ngon, gà tươi ngon và các loại gia vị tạo nên hương vị đặc trưng. Món ăn này thường được ăn kèm với rau sống, giá và bánh phở mềm.', '1 day', 25000),
(4, ' Bánh Mì Xúc Xích', 'Bánh Mì Xúc Xích là một phiên bản độc đáo của bánh mì Việt Nam. Bánh mì mềm thơm, xúc xích giòn và các loại sốt tạo nên một trải nghiệm ăn uống hấp dẫn. Thường được ăn kèm với nước sốt cay và rau sống.', '1 week', 25000),
(5, 'Gỏi Cuốn', 'Bánh Mì Xúc Xích là một phiên bản độc đáo của bánh mì Việt Nam. Bánh mì mềm thơm, xúc xích giòn và các loại sốt tạo nên một trải nghiệm ăn uống hấp dẫn. Thường được ăn kèm với nước sốt cay và rau sống.', '1 day', 25000),
(6, 'Sushi Cá Hồi', 'Sushi Cá Hồi là một món ăn truyền thống của ẩm thực Nhật Bản. Gồm có cơm gạo dính, cá hồi tươi ngon, và rong biển. Thường ăn kèm với gari (cải bắp cải) và nước sốt đặc trưng.', '1 day', 60000),
(7, 'Pad Thai', 'Pad Thai là một món ăn đặc trưng của ẩm thực Thái Lan. Bún gạo xào chín với tảo, hành tây, đậu hủ, và tôm hoặc thịt gà. Thường được ăn kèm với hạt giống và chanh.', '1 day', 50000),
(8, 'Ramen', 'Ramen là một món súp mì truyền thống của Nhật Bản. Mì mềm, nước dùng thơm ngon, thịt heo hoặc gà, rau sống và trứng luộc tạo nên hương vị đặc trưng.', '1 day', 80000),
(9, 'Hamburger', 'Hamburger là một món ăn nhanh phổ biến trên khắp thế giới. Bánh mì, thịt bò, rau sống, sốt mayonnaise và sốt cà chua tạo nên một bữa ăn ngon miệng và no nê.', '1 day', 20000),
(10, 'Lasagna', 'Lasagna là một món ăn Ý truyền thống. Gồm có lớp bánh mì lasagna, thịt bò xào, sốt cà chua và nước sốt besciamella. Món này thường được nướng chín và có lớp phủ phô mai.', '1 day', 40000),
(11, 'Tacos', 'Tacos là một món ăn Mexico phổ biến. Gồm có bánh taco, thịt bò xào hoặc gà, rau sống, sốt salsa và kem tươi. Thường ăn kèm với chanh và rau mùi.', '1 day', 30000);

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `Manager_id` int(11) NOT NULL,
  `Manager_phonenumber` varchar(255) NOT NULL,
  `Profile_id` int(11) NOT NULL,
  `Restaurant_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`Manager_id`, `Manager_phonenumber`, `Profile_id`, `Restaurant_id`) VALUES
(1, '0931399988', 21, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `OrderItemID` int(11) NOT NULL,
  `OrderID` int(11) DEFAULT NULL,
  `FoodID` int(11) DEFAULT NULL,
  `DrinkID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`OrderItemID`, `OrderID`, `FoodID`, `DrinkID`, `Quantity`) VALUES
(10, 6, 2, NULL, 3),
(11, 6, 3, NULL, 3),
(12, 6, NULL, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Order_id` int(11) NOT NULL,
  `Customer_id` int(11) DEFAULT NULL,
  `OrderDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Order_id`, `Customer_id`, `OrderDate`) VALUES
(2, NULL, '2023-11-20 07:22:15'),
(3, NULL, '2023-11-20 07:22:38'),
(4, NULL, '2023-11-20 07:22:58'),
(5, NULL, '2023-11-20 07:24:19'),
(6, 34, '2023-11-20 07:24:53');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `RestaurantID` int(11) DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`ID`, `UserID`, `Role`, `RestaurantID`, `PhoneNumber`) VALUES
(21, 3, 'Manager', 2, NULL),
(25, 4, 'Waitress', 2, NULL),
(26, 1, 'Chef', 2, NULL),
(27, 1, 'Waitress', 2, NULL),
(28, 28, 'Waitress', 2, NULL),
(29, 19, 'Cashier', 2, NULL),
(30, 19, 'Cashier', 2, NULL),
(33, 19, 'Customer', NULL, NULL),
(34, 19, 'Customer', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`ID`, `Name`, `Address`, `PhoneNumber`, `Avatar`) VALUES
(2, 'Lẩu tự do', 'Sô 20 Hồ Tùng Mậu', '0931399988', 'https://res.cloudinary.com/dfsucyg30/image/upload/v1690964445/nxuiyqocgn0av3w7uszi.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Avatar` varchar(255) DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Email`, `Password`, `Name`, `Avatar`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 'example@example.com', 'password123', 'John Doe', 'avatar_url', '2023-10-16 03:03:00', '2023-10-16 03:03:00'),
(2, 'dungnghiem0203@gmail.com', '0931399988', 'Quốc Dũng', 'ss', '2023-10-16 03:48:47', '2023-10-16 03:48:47'),
(3, 'xathubanxa@gmail.com', '$2b$10$KdHEb8/Dy3WXN9VdpkSmFuX1I6lKBdOSUEUrdxllWSUkk47JLi/5i', 'Dũng Nghiêm', 'ss', '2023-11-08 01:18:54', '2023-11-08 01:18:54'),
(4, 'nghiemdung0203@gmail.com', '$2b$10$FmDVeOACemFFY2rYyjjDN.9Pocvc8IF.HPC.jHWwc6C1goK.wnN/6', 'Dũng Nghiêm', 'ss', '2023-11-08 01:22:36', '2023-11-08 01:22:36'),
(19, 'ManhTran@gmail.com', '$2b$10$LpaNwT1HEDJRYJR8rgLPUeBTxCxGBHXjh1vU/Lijrjy3p00fjeLWG', 'Manh Tran', 'ss', '2023-11-13 07:26:59', '2023-11-13 07:26:59'),
(28, 'HoangViet@gmail.com', '$2b$10$XUNqQzXxlsA.dsMb1bhLB.8H4P4X7VPo41Jdv6UOPVPM8pi8AX1OC', 'Viet Hoang', 'ss', '2023-11-13 08:09:38', '2023-11-13 08:09:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`Bill_id`),
  ADD KEY `Customer_id` (`Customer_id`);

--
-- Indexes for table `drinks`
--
ALTER TABLE `drinks`
  ADD PRIMARY KEY (`Drink_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`Food_id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`Manager_id`),
  ADD KEY `Profile_id` (`Profile_id`),
  ADD KEY `Restaurant_id` (`Restaurant_id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`OrderItemID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `FoodID` (`FoodID`),
  ADD KEY `DrinkID` (`DrinkID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_id`),
  ADD KEY `Customer_id` (`Customer_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `IDX_Users_Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `Bill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drinks`
--
ALTER TABLE `drinks`
  MODIFY `Drink_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `Food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `Manager_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `OrderItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`Customer_id`) REFERENCES `profile` (`ID`);

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`Profile_id`) REFERENCES `profile` (`ID`),
  ADD CONSTRAINT `manager_ibfk_2` FOREIGN KEY (`Restaurant_id`) REFERENCES `restaurant` (`ID`);

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`Order_id`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`FoodID`) REFERENCES `food` (`Food_id`),
  ADD CONSTRAINT `orderitems_ibfk_3` FOREIGN KEY (`DrinkID`) REFERENCES `drinks` (`Drink_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Customer_id`) REFERENCES `profile` (`ID`);

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
