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
      $sql = " INSERT INTO i019t_tipo_proyecto(co_unidad_negocio,tx_nombre_tipo_proyecto,tx_alias_tipo_proyecto,tx_obs_tipo_proyecto,in_activo)
                VALUES(".$_POST['unidadNegocioTipoProyecto'].",'".$_POST['nombreTipoProyecto']."','".$_POST['aliasTipoProyecto']."','".$_POST['obsTipoProyecto']."',1)";
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
          $sql = "UPDATE i019t_tipo_proyecto SET co_unidad_negocio=".$_POST['unidadNegocioTipoProyecto'].",tx_nombre_tipo_proyecto='".$_POST['nombreTipoProyecto']."',tx_alias_tipo_proyecto='".$_POST['aliasTipoProyecto']."',tx_obs_tipo_proyecto='".$_POST['obsTipoProyecto']."',in_activo='1'  WHERE co_tipo_proyecto=".$_POST['codTipoProyecto'];
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