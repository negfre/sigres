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
      $sql = " INSERT INTO i002t_gerencia(tx_nombre_gerencia,co_unidad_negocio,tx_obs_gerencia,in_activo)
                VALUES('".$_POST['nombreGerenciaNegocio']."',".$_POST['unidadNegocio'].",'".$_POST['obsGerenciaNegocio']."',1)";
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
          $sql = "UPDATE i002t_gerencia SET co_unidad_negocio=".$_POST['unidadNegocio'].",tx_nombre_gerencia='".$_POST['nombreGerenciaNegocio']."',tx_obs_gerencia='".$_POST['obsGerenciaNegocio']."',in_activo='1'  WHERE co_gerencia=".$_POST['codGerenciaNegocio'];
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