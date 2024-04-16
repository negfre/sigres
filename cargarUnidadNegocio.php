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
      $sql = " INSERT INTO i001t_unidad_negocio(tx_nombre_unidad_negocio,tx_obs_unidad_negocio,in_activo)
                VALUES('".$_POST['nombreUnidadNegocio']."','".$_POST['obsUnidadNegocio']."',1)";
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
          $sql = "UPDATE i001t_unidad_negocio SET tx_nombre_unidad_negocio='".$_POST['nombreUnidadNegocio']."',tx_obs_unidad_negocio='".$_POST['obsUnidadNegocio']."',in_activo=1 WHERE co_unidad_negocio=".$_POST['codUnidadNegocio'];
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