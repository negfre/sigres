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
      $sql = " INSERT INTO i022t_grupo_proyecto(tx_nombre_grupo_proyecto,tx_obs_grupo_proyecto,in_activo)
                VALUES('".$_POST['nombreGrupoProyecto']."','".$_POST['obsGrupoProyecto']."',1)";
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
          $sql = "UPDATE i022t_grupo_proyecto SET tx_nombre_grupo_proyecto='".$_POST['nombreGrupoProyecto']."',tx_obs_grupo_proyecto='".$_POST['obsGrupoProyecto']."',in_activo=1 WHERE co_grupo_proyecto=".$_POST['codGrupoProyecto'];
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