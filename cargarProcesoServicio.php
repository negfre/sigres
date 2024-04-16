<?php

include ("validado.php");
include_once ("bd.php");
session_name("CGR");
session_start();

$operacion = '';
if ( isset($_POST['operacion']) ){ //and isset($_POST['colsJson'])
  $operacion = $_POST['operacion'];
}

$proceso=$_POST['proceso'];
$servicios = split(",", $_POST['listaServicio']);


$sql='';
switch($operacion){
  case 'CARGAR':
    
      $sql = "update i020t_proceso_servicio set in_activo=0 where co_proceso=".$proceso;
      if (!$rs=consultas($sql))
      {
        echo '{"success": false, "errors":{"reason": "Error al momento de actualziar registros"}}';
      }
     else
      {
          $error=0;
          $longitud=count($servicios);
          for($i=0;$i<$longitud;$i++){
            $sql = "select co_proceso_servicio from i020t_proceso_servicio where co_proceso=".$proceso." and co_servicio=".$servicios[$i];
            if (!$rs=consultas($sql)){
              echo '{"success": false, "errors":{"reason": "Error al momento de consultar registros"}}';
              $error=1;
            }
           else{
              if (pg_num_rows($rs)<1){
                  $sql = "insert into i020t_proceso_servicio(co_proceso,co_servicio,in_activo) values(".$proceso.",".$servicios[$i].",1)";
                  if (!$rs=consultas($sql))
                    {
                      echo '{"success": false, "errors":{"reason": "Error al momento de actualziar registros"}}';
                      $error=1;
                    }
                    
              }
              else{
                $sql = "update i020t_proceso_servicio set in_activo=1 where co_proceso=".$proceso." and co_servicio=".$servicios[$i];
                if (!$rs=consultas($sql))
                  {
                    echo '{"success": false, "errors":{"reason": "Error al momento de actualziar registros"}}';
                    $error=1;
                  }                
              }
              
            }
          }
          if ($error == 0)
              echo '{"success":true, "message":{"reason": "Registros actualizados satisfactoriamente"}}';
      }      

     break;
  default:
    echo '{"failure":true,"success": false, "errors":{"reason": "Operacion no especificada."}}';
    break;
}

?>