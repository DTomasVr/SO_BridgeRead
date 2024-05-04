<?php
// Connect to the database
$mysqli = new mysqli("localhost", "root", "password", "bridgeread");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Query to fetch books
$sql = "SELECT title, author, ISBN, description, price, quantity_available, genre FROM book";
$result = $mysqli->query($sql);

if (!$result) {
    echo "Error fetching books: " . $mysqli->error;
} else {
    // Return books as JSON
    $books = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
    }
    echo json_encode($books);
}

// Close the database connection
$mysqli->close();
?>
