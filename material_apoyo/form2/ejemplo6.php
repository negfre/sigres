<?php

header("Content-Type: text/plain"); 
$Servidor="localhost";
$Usuario="root";
$Contra="";
$BD="ejemplo6";

$link = mysql_connect($Servidor,$Usuario,$Contra);
mysql_select_db($BD);
mysql_query("SET NAMES 'utf8'"); 

$task = '';
if ( isset($_POST['task'])){
  $task = $_POST['task'];
}
switch($task){
	case "GRABAR":
			$sql = " INSERT INTO cliente (dni, nombres, ciudad ,fecha, genero, comentario) VALUES(".$_REQUEST['dni'].",'".$_REQUEST['nombres']."','".$_REQUEST['ciudad']."','".$_REQUEST['fecha']."','".$_REQUEST['genero']."','".$_REQUEST['comentario']."')";	
			if (!$rs = mysql_query($sql)) 
			{
				echo '{"success": false, "errors":{"reason": "Error al momento de grabar"}}';
			}else
			{
				echo '{"success":true, "message":{"reason": "Se grabo satisfactoriamente"}}';
			}
		break;
default:
        echo "{failure:true}";
        break;
	}
?>