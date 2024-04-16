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
      $sql = " INSERT INTO i025t_grupo_matriz(tx_nombre_grupo_matriz,tx_obs_grupo_matriz,in_activo)
                VALUES('".$_POST['nombreGrupoMatriz']."','".$_POST['obsGrupoMatriz']."',1)";
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
          $sql = "UPDATE i025t_grupo_matriz SET tx_nombre_grupo_matriz='".$_POST['nombreGrupoMatriz']."',tx_obs_grupo_matriz='".$_POST['obsGrupoMatriz']."',in_activo=1 WHERE co_grupo_matriz=".$_POST['codGrupoMatriz'];
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