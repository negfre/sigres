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
      $sql = " INSERT INTO i016t_dato_matriz(tx_nombre_dato_matriz,co_grupo_matriz,tx_obs_dato_matriz,in_activo)
                VALUES('".$_POST['nombreMatrizDatos']."',".$_POST['GrupoMatriz'].",'".$_POST['obsMatrizDatos']."',1)";
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
          $sql = "UPDATE i016t_dato_matriz SET co_grupo_matriz=".$_POST['GrupoMatriz'].",tx_nombre_dato_matriz='".$_POST['nombreMatrizDatos']."',tx_obs_dato_matriz='".$_POST['obsMatrizDatos']."',in_activo='1'  WHERE co_dato_matriz=".$_POST['codMatrizDatos'];
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