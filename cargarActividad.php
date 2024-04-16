<?php

include ("validado.php");
include_once ("bd.php");
session_name("CGR");
session_start();

$operacion = '';
if ( isset($_POST['operacion']) ){ //and isset($_POST['colsJson'])
  $operacion = $_POST['operacion'];
}

$sql='';
switch($operacion){
  case 'NUEVO':
      $sql = " INSERT INTO i008t_actividad(tx_nombre_actividad,co_servicio,tx_obs_actividad,in_activo)
                VALUES('".$_POST['nombreActividad']."',".$_POST['servicio'].",'".$_POST['obsActividad']."',1)";
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
          $sql = "UPDATE i008t_actividad SET co_servicio=".$_POST['servicio'].",tx_nombre_actividad='".$_POST['nombreActividad']."',tx_obs_actividad='".$_POST['obsActividad']."',in_activo='1'  WHERE co_actividad=".$_POST['codActividad'];
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