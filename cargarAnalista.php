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
      $sql = " INSERT INTO i010t_analista(co_perfil,co_supervisor,co_subproceso,tx_indicador_analista,tx_nombre_analista,tx_apellido_analista,tx_cedula_analista,fe_nacimiento_analista,tx_extension_analista,tx_celular_analista,tx_oficina_analista,in_apoyo_subprocesos,in_activo)
                VALUES(".$_POST['perfilAnalista'].",".$_POST['supervisorAnalista'].",".$_POST['subprocesoAnalista'].",'".$_POST['indicador']."','".$_POST['nombre']."','".$_POST['apellido']."',".$_POST['ci'].",'".$_POST['fechaNac']."','".$_POST['extension']."','".$_POST['celAnalista']."','".$_POST['oficAnalista']."',".$_POST['apoyo'].",1)";
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
      $sql = "UPDATE i010t_analista SET co_perfil=".$_POST['perfilAnalista'].",co_supervisor=".$_POST['supervisorAnalista'].",co_subproceso=".$_POST['subprocesoAnalista'].",tx_indicador_analista='".$_POST['indicador']."',tx_nombre_analista='".$_POST['nombre']."',tx_apellido_analista='".$_POST['apellido']."',tx_cedula_analista=".$_POST['ci'].",fe_nacimiento_analista='".$_POST['fechaNac']."',tx_extension_analista='".$_POST['extension']."',tx_celular_analista='".$_POST['celAnalista']."',tx_oficina_analista='".$_POST['oficAnalista']."',in_apoyo_subprocesos='".$_POST['apoyo']."',in_activo=1 wHERE co_analista=".$_POST['codAnalista'];
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
