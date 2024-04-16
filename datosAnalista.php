<?php

session_name("CGR");
session_start();
if (!empty($_SESSION['indicador'])) {
     	echo " {indicador:'". $_SESSION["indicador"] ."', nombre:'". $_SESSION["analista"] . "', nivel:'". $_SESSION["nivel"] . "'}";
    } 

?>