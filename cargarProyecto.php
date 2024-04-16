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
      $sql = " INSERT INTO i003t_proyecto(co_gerencia,co_tipo_proyecto,co_division,co_grupo_proyecto,tx_nombre_proyecto,tx_alias_proyecto,fe_inicio_proyecto,fe_fin_proyecto,tx_obs_proyecto,in_activo)
                VALUES(".$_POST['gerenciaProyecto'].",".$_POST['tipoProyecto'].",".$_POST['divisionProyecto'].",".$_POST['grupoProyecto'].",'".$_POST['nombreProyecto']."','".$_POST['aliasProyecto']."','".$_POST['inicioProyecto']."','".$_POST['finProyecto']."','".$_POST['obsProyecto']."',1)";
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
          $sql = "UPDATE i003t_proyecto SET co_gerencia=".$_POST['gerenciaProyecto'].",co_tipo_proyecto=".$_POST['tipoProyecto'].",co_division=".$_POST['divisionProyecto'].",co_grupo_proyecto=".$_POST['grupoProyecto'].",tx_nombre_proyecto='".$_POST['nombreProyecto']."',tx_alias_proyecto='".$_POST['aliasProyecto']."',fe_inicio_proyecto='".$_POST['inicioProyecto']."',fe_fin_proyecto='".$_POST['finProyecto']."',tx_obs_proyecto='".$_POST['obsProyecto']."',in_activo='1'  WHERE co_proyecto=".$_POST['codProy'];
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