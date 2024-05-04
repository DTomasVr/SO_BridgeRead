<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $category_name = $_POST["category_name"];
    $accessibility_feature = $_POST["accessibility_feature"];
    
    // Validate form data (you can add more validation if needed)
    if (!empty($category_name)) {
        // Make a database connection
        $mysqli = new mysqli("localhost", "root", "password", "bridgeread");

        // Check connection
        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        }

        // Prepare and execute SQL query to insert category into the database
        $sql = "INSERT INTO category (category_name, accessibility_feature) VALUES (?, ?)";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("ss", $category_name, $accessibility_feature);
        if ($stmt->execute()) {
            // Redirect back to add_category.html after successful submission
            header("Location: add_category.html");
            exit();
        } else {
            echo "Error: " . $mysqli->error;
        }

        // Close database connection
        $stmt->close();
        $mysqli->close();
    } else {
        echo "Category name is required.";
    }
} else {
    // Redirect back to the form if accessed directly
    header("Location: add_category.html");
    exit;
}
?>