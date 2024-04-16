<?php

/** Error reporting */
//error_reporting(E_ALL);

//date_default_timezone_set('Europe/London');

/** PHPExcel */
require_once 'Classes/PHPExcel.php';
#include 'Classes/PHPExcel/Writer/Excel2007.php';
#require_once 'Classes/PHPExcel/IOFactory.php';
require_once 'bd.php';  


$fe_ini = "'2013-01-01'";
$fe_fin = "'2016-01-01'";
$cad = "";
$cad = "( i010t_analista.co_analista = 44";
$cad = $cad . ")";  
echo "cad:".$cad;
//*******************************************************************************************
  $sql = "SELECT 
  i001t_unidad_negocio.tx_nombre_unidad_negocio as unidad_negocio,
  i002t_gerencia.tx_nombre_gerencia as gerencia,  
  i003t_proyecto.tx_nombre_proyecto as proyecto,   
  (i004t_usuario.tx_nombre_usuario || ' ' || i004t_usuario.tx_apellido_usuario) as usuario,   
  i005t_proceso.tx_nombre_proceso as proceso, 
  i006t_subproceso.tx_nombre_subproceso as subproceso,  
  i007t_servicio.tx_nombre_servicio as servicio, 
  i008t_actividad.tx_nombre_actividad as actividad, 
  i009t_subactividad.tx_nombre_subactividad as subactividad, 
  (i010t_analista.tx_nombre_analista || ' ' || i010t_analista.tx_apellido_analista) as analista, 
  i014t_unidad_medida.tx_nombre_medida as medida, 
  i012t_aplicacion.tx_nombre_aplicacion as aplicacion, 
  c001t_requerimiento.nu_volumen as volumen,   
  i013t_estatus.tx_nombre_estatus as estatus, 
  c001t_requerimiento.fe_inicio_requerimiento as fecha_ini, 
  c001t_requerimiento.fe_fin_requerimiento as fecha_fin, 
  c001t_requerimiento.nu_tiempo_efectivo as tiempo_efectivo, 
  c001t_requerimiento.tx_obs_requerimiento as obs

FROM 
  public.i005t_proceso, 
  public.i007t_servicio, 
  public.i008t_actividad, 
  public.i009t_subactividad, 
  public.c001t_requerimiento, 
  public.i010t_analista, 
  public.i003t_proyecto, 
  public.i004t_usuario, 
  public.i014t_unidad_medida, 
  public.i012t_aplicacion, 
  public.i013t_estatus, 
  public.i006t_subproceso, 
  public.i002t_gerencia, 
  public.i001t_unidad_negocio
WHERE ". $cad . " 
   AND  i007t_servicio.co_servicio = i008t_actividad.co_servicio AND
  i008t_actividad.co_actividad = i009t_subactividad.co_actividad AND
  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
  i004t_usuario.co_usuario = c001t_requerimiento.co_usuario AND
  i014t_unidad_medida.co_unidad_medida = c001t_requerimiento.co_unidad_medida AND
  i012t_aplicacion.co_aplicacion = c001t_requerimiento.co_aplicacion AND
  i013t_estatus.co_estatus = c001t_requerimiento.co_estatus AND
  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
  i002t_gerencia.co_gerencia = i003t_proyecto.co_gerencia AND
  i001t_unidad_negocio.co_unidad_negocio = i002t_gerencia.co_unidad_negocio AND
  c001t_requerimiento.fe_fin_requerimiento >= ".$fe_ini." AND c001t_requerimiento.fe_fin_requerimiento <= ".$fe_fin."
ORDER BY
  i001t_unidad_negocio.tx_nombre_unidad_negocio ASC, 
  i002t_gerencia.tx_nombre_gerencia ASC, 
  i003t_proyecto.tx_nombre_proyecto ASC, 
  i007t_servicio.tx_nombre_servicio ASC, 
  i008t_actividad.tx_nombre_actividad ASC, 
  i009t_subactividad.tx_nombre_subactividad ASC";



	$result = consultas($sql);
echo $sql;
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				echo $row['unidad_negocio'];
				echo $row['unidad_negocio'];
				echo $row['gerencia'];
				echo $row['proyecto'];
				echo $row['usuario'];
				echo $row['proceso'];
				echo $row['subproceso'];
				echo $row['servicio'];
				echo $row['actividad'];
				echo $row['subactividad'];
				echo $row['analista'];
				// $medida = $row['medida'];
				// $aplicacion = $row['aplicacion'];
				// $volumen = $row['volumen'];
				// $estatus = $row['estatus'];
				// $fecha_ini = $row['fecha_ini'];
				// $fecha_fin = $row['fecha_fin'];
				// $tiempo_efectivo = $row['tiempo_efectivo'];
				// $obs = $row['obs'];
			}// fin del while

print "paso";
// Se modifican los encabezados del HTTP para indicar que se envia un archivo de Excel.
//header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//header('Content-Disposition: attachment;filename="Requerimientos Cargados.xlsx"');
//header('Cache-Control: max-age=0');
//$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
//$objWriter->save('php://output');
exit;
?>
