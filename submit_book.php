<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $title = $_POST["title"];
    $author = $_POST["author"];
    $isbn = $_POST["isbn"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $quantity = $_POST["quantity"];
    $genre = $_POST["genre"];
    $category_id = $_POST["category"];

    // Validate form data (ensure all fields are filled and a category is selected)
    if (!empty($title) && !empty($author) && !empty($isbn) && !empty($description) && !empty($price) && !empty($quantity) && !empty($genre) && !empty($category_id)) {
        // Make a database connection
        $mysqli = new mysqli("localhost", "root", "password", "bridgeread");

        // Check connection
        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        }

        // Prepare and execute SQL query to insert book into the database
        $sql = "INSERT INTO book (title, author, ISBN, description, price, quantity_available, genre, category_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("ssssdiss", $title, $author, $isbn, $description, $price, $quantity, $genre, $category_id);
        if ($stmt->execute()) {
            // Redirect back to add_book.html after successful submission
            header("Location: add_book.html");
            exit();
        } else {
            echo "Error: " . $mysqli->error;
        }

        // Close database connection
        $stmt->close();
        $mysqli->close();
    } else {
        echo "All fields are required and a category must be selected.";
    }
} else {
    // Redirect back to the form if accessed directly
    header("Location: add_book.html");
    exit;
}
?>
