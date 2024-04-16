<?php

include ("validado.php");
include_once ("bd.php");
session_name("CGR");
session_start();
$coAnalista=$_SESSION["coAnalista"];
$fechaRegistro = date("d/m/y");
$operacion = '';
if ( isset($_POST['operacion']) ){ //and isset($_POST['colsJson'])
  $operacion = $_POST['operacion'];
}

$sql='';
switch($operacion){
  case 'NUEVO':
      $sql = " INSERT INTO i005t_proceso(tx_nombre_proceso,tx_obs_proceso,in_activo)
                VALUES('".$_POST['nombreProceso']."','".$_POST['obsProceso']."',1)";
       if (!$rs=consultas($sql))
      {
        echo '{"success": false, "errors":{"reason": "Error al momento de grabar"}}';
       }
     else
      {
        echo '{"success":true, "message":{"reason": "Registro ingresado satisfactoriamente"}}';
      }
     break;
  case 'ACTUALIZAR':
          $sql = "UPDATE i005t_proceso SET tx_nombre_proceso='".$_POST['nombreProceso']."',tx_obs_proceso='".$_POST['obsProceso']."',in_activo=1 WHERE co_proceso=".$_POST['codProceso'];
      if (!$rs=consultas($sql))
      {
        echo '{"success": false, "errors":{"reason": "Error al momento de grabar"}}';
       }
     else
      {
        echo '{"success":true, "message":{"reason": "Registro actualizado satisfactoriamente"}}';
      }
     break;
  default:
    echo '{"failure":true,"success": false, "errors":{"reason": "Operacion no especificada."}}';
    break;
}

?>