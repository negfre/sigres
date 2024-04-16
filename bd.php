
<?php
//Crear conexión a la BD
function conectarBD(){

  $host = "localhost";
  $port = "5433";
  $dbname = "sigres";
  $user = "postgres";
  $password = "12345";
  
  // Intenta establecer la conexión
  $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");


  $cnn = pg_connect("host=localhost port=5433 dbname=sigres user=postgres password=12345") or die("No se pudo conectar con el servidor");
  return $cnn;
}

//Funcion que ejecuta todas las sentencias SQL
function consultas($sql){
 $dbconn = conectarBD();
 $result = pg_query($dbconn, $sql);
 return $result;
}

?>
