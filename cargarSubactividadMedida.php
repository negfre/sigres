<?php

include ("validado.php");
include_once ("bd.php");
session_name("CGR");
session_start();

$operacion = '';
if ( isset($_POST['operacion']) ){ //and isset($_POST['colsJson'])
  $operacion = $_POST['operacion'];
}

$subactividad=$_POST['subactividad'];
$medidas = split(",", $_POST['listaMedida']);


$sql='';
switch($operacion){
  case 'CARGAR':
    
      $sql = "update i021t_medida_subactividad set in_activo=0 where co_subactividad=".$subactividad;
      if (!$rs=consultas($sql))
      {
        echo '{"success": false, "errors":{"reason": "Error al momento de actualziar registros"}}';
      }
     else
      {
          $error=0;
          $longitud=count($medidas);
          for($i=0;$i<$longitud;$i++){
            $sql = "select co_medida_subactividad from i021t_medida_subactividad where co_subactividad=".$subactividad." and co_unidad_medida=".$medidas[$i];
            if (!$rs=consultas($sql)){
              echo '{"success": false, "errors":{"reason": "Error al momento de consultar registros"}}';
              $error=1;
            }
           else{
              if (pg_num_rows($rs)<1){
                  $sql = "insert into i021t_medida_subactividad(co_subactividad,co_unidad_medida,in_activo) values(".$subactividad.",".$medidas[$i].",1)";
                  if (!$rs=consultas($sql))
                    {
                      echo '{"success": false, "errors":{"reason": "Error al momento de actualziar registros"}}';
                      $error=1;
                    }
                    
              }
              else{
                $sql = "update i021t_medida_subactividad set in_activo=1 where co_subactividad=".$subactividad." and co_unidad_medida=".$medidas[$i];
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