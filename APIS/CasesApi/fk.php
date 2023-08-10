<?php
// Database configuration
$servername = "localhost:3306";
$dbname = "gp_database";
$username = "root";
$password = "";

// Connect to the database
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

// Execute the ALTER TABLE statement to add the user_id column
$sql = "ALTER TABLE cases ADD COLUMN user_id INT NOT NULL REFERENCES users(id)";
$stmt = $conn->prepare($sql);
$stmt->execute();

echo "User ID column added to cases table.";
?>