<?php
// Conexión a la Base de Datos (servidor, usuario, contraseña, nombre de la base de datos)
$conn = mysqli_connect("localhost", "root", "password", "restaurant");

// Verificar la conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}
?>