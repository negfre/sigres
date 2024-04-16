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
      $sql = " INSERT INTO i004t_usuario(co_gerencia,tx_indicador_usuario,tx_nombre_usuario,tx_apellido_usuario,tx_cargo_usuario,tx_telefono_usuario,tx_ubicacion_usuario,in_activo)
                VALUES(".$_POST['gerenciaUsuario'].",'".$_POST['indicadorUsuario']."','".$_POST['nombreUsuario']."','".$_POST['apellidoUsuario']."','".$_POST['cargoUsuario']."','".$_POST['telefonoUsua']."','".$_POST['ubicacionUsua']."',1)";
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
          $sql = "UPDATE i004t_usuario SET co_gerencia=".$_POST['gerenciaUsuario'].",tx_indicador_usuario='".$_POST['indicadorUsuario']."',tx_nombre_usuario='".$_POST['nombreUsuario']."',tx_apellido_usuario='".$_POST['apellidoUsuario']."',tx_cargo_usuario='".$_POST['cargoUsuario']."',tx_telefono_usuario='".$_POST['telefonoUsua']."',tx_ubicacion_usuario='".$_POST['ubicacionUsua']."',in_activo=1 WHERE co_usuario=".$_POST['codUsuario'];
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
