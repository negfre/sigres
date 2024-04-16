<?php
$host = "localhost";
$port = "5433";
$dbname = "sigres";
$user = "postgres";
$password = "12345";

// Intenta establecer la conexión
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

// Verifica si la conexión fue exitosa
if (!$conn) {
    echo "Error: No se pudo conectar a la base de datos.\n";
} else {
    echo "Conexión exitosa a la base de datos.\n";
    
    // Cierra la conexión
    pg_close($conn);
}
?>
