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
                VALUES('".$_POST['nuevaFechaCierre']."','".$_POST['obsProceso']."',1)";
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
      $sql = "UPDATE i027_t_fecha_cierre SET fe_cierre = '".$_POST['nuevaFechaCierre']."' WHERE co_fe_cierre = 1"; // Suponiendo que el ID de la fecha de cierre es 1


      $sql = "UPDATE i005t_proceso SET tx_nombre_proceso='".$_POST['nuevaFechaCierre']."',tx_obs_proceso='".$_POST['obsProceso']."',in_activo=1 WHERE co_proceso=".$_POST['codProceso'];
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