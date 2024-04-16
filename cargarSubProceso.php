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
      $sql = " INSERT INTO i006t_subproceso(tx_nombre_subproceso,co_proceso,tx_obs_subproceso,in_activo)
                VALUES('".$_POST['nombreSubProceso']."',".$_POST['procesoSubProceso'].",'".$_POST['obsSubProceso']."',1)";
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
          $sql = "UPDATE i006t_subproceso SET co_proceso=".$_POST['procesoSubProceso'].",tx_nombre_subproceso='".$_POST['nombreSubProceso']."',tx_obs_subproceso='".$_POST['obsSubProceso']."',in_activo='1'  WHERE co_subproceso=".$_POST['codSubProceso'];
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