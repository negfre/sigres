<?php

/** Error reporting */
error_reporting(E_ALL);

//date_default_timezone_set('Europe/London');

/** PHPExcel */
require_once 'Classes/PHPExcel.php';
#include 'Classes/PHPExcel/Writer/Excel2007.php';
#require_once 'Classes/PHPExcel/IOFactory.php';
//require_once 'bd.php';  
function conectarBD(){
  $cnn = pg_connect("host=localhost port=5432 dbname=sigcgr23 user=postgres password=12345") or die("No se pudo conectar con el servidor");
  return $cnn;
}
//Funcion que ejecuta todas las sentencias SQL
function consultas($sql){
 $dbconn = conectarBD();
 $result = pg_query($dbconn, $sql);
 return $result;
}

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();
// Set properties
$objPHPExcel->getDefaultStyle()->getFont()->setSize(8);
$objPHPExcel->getProperties()->setCreator("Frank Alvarez")
            ->setLastModifiedBy("Frank Alvarez")
            ->setTitle("Reporte de Reuqerimientos Cargados")
            ->setSubject("Reporte de Requerimientos Cargados")
            ->setDescription("GODD")
            ->setKeywords("office 2007 openxml php")
            ->setCategory("Reporte SIG_CGR");

$lista = explode(",",$_GET['valLista']);

 $fe_ini = $_GET['fechaIni'];
 $fe_fin = $_GET['fechaFin'];
// $fe_ini = str_replace("\\","",$fe_ini);
// $fe_fin = str_replace("\\","",$fe_fin);
$cad = "";
for($i=0;$i<count($lista);$i++)
   if ($cad == "")
    $cad = "( i010t_analista.co_analista = " . $lista[$i];
   else 
     $cad =  $cad ." OR i010t_analista.co_analista = " . $lista[$i]; 
$cad = $cad . ")";  
//echo "cad:".$cad;
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
	$fila = 5;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);	

	$objPHPExcel->setActiveSheetIndex(0)// 
	->SetCellValue('A'.$fila, '	UNIDAD DE NEGOCIO')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	->SetCellValue('D'.$fila, 'USUARIO')
	->SetCellValue('E'.$fila, 'PROCESO')
	->SetCellValue('F'.$fila, 'SUB-PROCESO')
	->SetCellValue('G'.$fila, 'SERVICIO')
	->SetCellValue('H'.$fila, 'ACTIVIDAD')
	->SetCellValue('I'.$fila, 'SUB-ACTIVIDAD')
	->SetCellValue('J'.$fila, 'ANALISTA')
	->SetCellValue('K'.$fila, 'MEDIDA')
	->SetCellValue('L'.$fila, 'APLICACIÓN')
	->SetCellValue('M'.$fila, 'VOLUMEN')
	->SetCellValue('N'.$fila, 'ESTATUS')
	->SetCellValue('O'.$fila, 'FECHA_INI')
	->SetCellValue('P'.$fila, 'FECHA_FIN')
	->SetCellValue('Q'.$fila, 'TIEMPO_EFECTIVO')
	->SetCellValue('R'.$fila, 'OBSERVACIÓN');
	//$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	//$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	 $objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	//$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AB'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);	
	$fila++;
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$unidad_negocio = $row['unidad_negocio'];
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$usuario = $row['usuario'];
				$proceso = $row['proceso'];
				$subproceso = $row['subproceso'];
				$servicio = $row['servicio'];
				$actividad = $row['actividad'];
				$subactividad = $row['subactividad'];
				$analista = $row['analista'];
				$medida = $row['medida'];
				$aplicacion = $row['aplicacion'];
				$volumen = $row['volumen'];
				$estatus = $row['estatus'];
				$fecha_ini = $row['fecha_ini'];
				$fecha_fin = $row['fecha_fin'];
				$tiempo_efectivo = $row['tiempo_efectivo'];
				$obs = $row['obs'];
				
				// este es el encabezado del archivo
				$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue('A'.$fila, $unidad_negocio)
				->setCellValue('B'.$fila, $gerencia)				
				->setCellValue('C'.$fila, $proyecto)
				->setCellValue('D'.$fila, $usuario)
				->setCellValue('E'.$fila, $proceso)
				->setCellValue('F'.$fila, $subproceso)
				->setCellValue('G'.$fila, $servicio)				
				->setCellValue('H'.$fila, $actividad)
				->setCellValue('I'.$fila, $subactividad)
				->setCellValue('J'.$fila, $analista)
				->setCellValue('K'.$fila, $medida)
				->setCellValue('L'.$fila, $aplicacion)
				->setCellValue('M'.$fila, $volumen)
				->setCellValue('N'.$fila, $estatus)
				->setCellValue('O'.$fila, $fecha_ini)
				->setCellValue('P'.$fila, $fecha_fin)
				->setCellValue('Q'.$fila, $tiempo_efectivo)
				->setCellValue('R'.$fila, $obs);					
				
                $fila++;

			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('Requerimientos Cargados');

// Seteo del Encabezado y pie de pagina
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('Logo PDVSA');
$objDrawing->setDescription('LOGO pdvsa');
$objDrawing->setPath('imagenes/header3.gif');
$objDrawing->setHeight(40);
$objDrawing->setCoordinates('A1');
$objDrawing->setOffsetX(10);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
$objPHPExcel->getActiveSheet()->getHeaderFooter()->setOddFooter('&L&B SIG_CGR  &C&H' . '&C &D  &T' . '&RPag &P de &N');
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_LETTER);
//*******************************************************************************************
//*******************************************************************************************

// Set active sheet index to the first sheet, so Excel opens this as the first sheet
// $objPHPExcel->setActiveSheetIndex(0);
// $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
// ob_end_clean();
// header('Content-Type: application/vnd.ms-excel');
// header('Content-Type: application/vnd.openXMLformats-officedocument.spreadsheetml.sheet');
// header('Content-Disposition: attachment;filename="Requerimientos Cargados.xls"');
// header('Cache-Control: max-age=0');
// $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
// $objWriter->save('excel.xls'); 


//Se modifican los encabezados del HTTP para indicar que se envia un archivo de Excel.
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Requerimientos Cargados.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;
?>
