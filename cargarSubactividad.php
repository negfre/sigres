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
      $sql = " INSERT INTO i009t_subactividad(tx_nombre_subactividad,co_actividad,co_indicador_gestion,co_dato_matriz,tx_obs_subactividad,in_activo)
                VALUES('".$_POST['nombreSubactividad']."',".$_POST['actividad'].",".$_POST['indicador'].",".$_POST['matriz'].",'".$_POST['obsSubactividad']."',1)";
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
          $sql = "UPDATE i009t_subactividad SET co_actividad=".$_POST['actividad'].",co_indicador_gestion=".$_POST['indicador'].",co_dato_matriz=".$_POST['matriz'].",tx_nombre_subactividad='".$_POST['nombreSubactividad']."',tx_obs_subactividad='".$_POST['obsSubactividad']."',in_activo='1'  WHERE co_subactividad=".$_POST['codSubactividad'];
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