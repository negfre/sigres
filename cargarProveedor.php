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
      $sql = " INSERT INTO i011t_proveedor(tx_nombre_proveedor,tx_contacto_proveedor,tx_telefono_proveedor,tx_obs_proveedor,in_activo)
                VALUES('".$_POST['nombreProveedor']."','".$_POST['contacProveedor']."','".$_POST['telProveedor']."','".$_POST['obserProveedor']."',1)";
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
          $sql = "UPDATE i011t_proveedor SET tx_nombre_proveedor='".$_POST['nombreProveedor']."',tx_contacto_proveedor='".$_POST['contacProveedor']."',tx_obs_proveedor='".$_POST['obserProveedor']."',tx_telefono_proveedor='".$_POST['telProveedor']."',in_activo='1'  WHERE co_proveedor=".$_POST['codProveedor'];
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