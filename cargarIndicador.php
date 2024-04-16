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
      $sql = " INSERT INTO i015t_indicador_gestion(tx_nombre_indicador_gestion,co_grupo_indicador,tx_obs_indicador_gestion,in_activo)
                VALUES('".$_POST['nombreIndicador']."',".$_POST['grupoIndicador'].",'".$_POST['obsIndicador']."',1)";
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
          $sql = "UPDATE i015t_indicador_gestion SET co_grupo_indicador=".$_POST['grupoIndicador'].",tx_nombre_indicador_gestion='".$_POST['nombreIndicador']."',tx_obs_indicador_gestion='".$_POST['obsIndicador']."',in_activo='1'  WHERE co_indicador_gestion=".$_POST['codIndicador'];
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