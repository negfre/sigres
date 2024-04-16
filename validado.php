<?php
//Inicio la sesión
session_name("CGR");
session_start();

//COMPRUEBA QUE EL USUARIO ESTA AUTENTIFICADO
if ($_SESSION["valido"] != "SI") {
	//si no existe, envio a la página de autentificacion
	header("Location: index.html");
	//ademas salgo de este script
	exit();
}	
?>
