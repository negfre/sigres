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
    if ($_POST['enddt'] != '' )
      $sql = " INSERT INTO c001t_requerimiento(co_usuario,co_proyecto,co_subactividad,co_unidad_medida,co_aplicacion,co_estatus,nu_volumen,nu_tiempo_efectivo,in_estado,co_analista,fe_ingreso_requerimiento,fe_inicio_requerimiento,fe_fin_requerimiento,tx_obs_requerimiento)
                VALUES(".$_POST['usuario'].",".$_POST['proyecto'].",".$_POST['subactividad'].",".$_POST['medida'].",".$_POST['aplicacion'].",".$_POST['estatus'].",".$_POST['volumen'].",".$_POST['tiempoEfectivo'].",1,".$coAnalista.",'".$fechaRegistro."','".$_POST['startdt']."','".$_POST['enddt']."','".$_POST['observaciones']."')";
    else
      $sql = " INSERT INTO c001t_requerimiento(co_usuario,co_proyecto,co_subactividad,co_unidad_medida,co_aplicacion,co_estatus,nu_volumen,nu_tiempo_efectivo,in_estado,co_analista,fe_ingreso_requerimiento,fe_inicio_requerimiento,tx_obs_requerimiento)
                VALUES(".$_POST['usuario'].",".$_POST['proyecto'].",".$_POST['subactividad'].",".$_POST['medida'].",".$_POST['aplicacion'].",".$_POST['estatus'].",".$_POST['volumen'].",".$_POST['tiempoEfectivo'].",1,".$coAnalista.",'".$fechaRegistro."','".$_POST['startdt']."','".$_POST['observaciones']."')";
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
    if ($_POST['enddt'] != '' )    
      $sql = "UPDATE c001t_requerimiento SET co_usuario=".$_POST['usuario'].",co_proyecto=".$_POST['proyecto'].",co_subactividad=".$_POST['subactividad'].",co_unidad_medida=".$_POST['medida'].",co_aplicacion=".$_POST['aplicacion'].",in_estado=1,nu_volumen=".$_POST['volumen'].",nu_tiempo_efectivo=".$_POST['tiempoEfectivo'].",co_estatus=".$_POST['estatus'].",co_analista=".$coAnalista.",fe_inicio_requerimiento='".$_POST['startdt']."',tx_obs_requerimiento='".utf8_encode($_POST['observaciones'])."',fe_fin_requerimiento='".$_POST['enddt']."' WHERE co_requerimiento=".$_POST['codReq'];
    else
       $sql = "UPDATE c001t_requerimiento SET co_usuario=".$_POST['usuario'].",co_proyecto=".$_POST['proyecto'].",co_subactividad=".$_POST['subactividad'].",co_unidad_medida=".$_POST['medida'].",co_aplicacion=".$_POST['aplicacion'].",in_estado=1,nu_volumen=".$_POST['volumen'].",nu_tiempo_efectivo=".$_POST['tiempoEfectivo'].",co_estatus=".$_POST['estatus'].",co_analista=".$coAnalista.",fe_inicio_requerimiento='".$_POST['startdt']."',tx_obs_requerimiento='".utf8_encode($_POST['observaciones'])."' WHERE co_requerimiento=".$_POST['codReq'];    
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