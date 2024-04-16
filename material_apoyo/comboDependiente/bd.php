
<?php
//Crear conexión a la BD
function conectarBD(){
  $cnn = pg_connect("host=localhost port=5432 dbname=sigcgr23 user=postgres password=12345") or die("Could not connect");
  return $cnn;
}
//Funcion que ejecuta todas las sentencias SQL
function consultas($sql){
 $dbconn = conectarBD();
 $result = pg_query($dbconn, $sql);
 return $result;
}

?>
