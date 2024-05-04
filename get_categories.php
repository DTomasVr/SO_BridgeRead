<?php
// Connect to the database
$mysqli = new mysqli("localhost", "root", "password", "bridgeread");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Query to fetch categories
$sql = "SELECT id, category_name FROM category";
$result = $mysqli->query($sql);

if (!$result) {
    echo "Error fetching categories: " . $mysqli->error;
} else {
    // Return categories as JSON
    $categories = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
    }
    echo json_encode($categories);
}

// Close the database connection
$mysqli->close();
?>
