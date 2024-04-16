<?php

/*Incluir clase para validar si esta logueado

/** Error reporting */
error_reporting(E_ALL);

//date_default_timezone_set('Europe/London');

/** PHPExcel */

require_once 'Classes/PHPExcel/IOFactory.php';
// include 'Classes/PHPExcel/Writer/Excel2007.php';
// require_once 'Classes/PHPExcel/IOFactory.php';
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
            ->setTitle("Reporte de Indicadores")
            ->setSubject("Reporte de Indicadores")
            ->setDescription("GODD")
            ->setKeywords("office 2007 openxml php")
            ->setCategory("Reporte SIG_CGR v2");

$annio = $_GET['anio'];
//*************************
    $sql = "SELECT 
		  i007t_servicio.tx_nombre_servicio as PROCESO, 
		  i008t_actividad.tx_nombre_actividad as SERVICIO,
		  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
		  COUNT(c001t_requerimiento.co_requerimiento) AS TOTAL_REQ,
		  SUM(c001t_requerimiento.nu_tiempo_efectivo)/60 as TOTAL_HH  
	FROM 
		  public.c001t_requerimiento, 
		  public.i003t_proyecto, 
		  public.i010t_analista, 
		  public.i009t_subactividad, 
		  public.i015t_indicador_gestion, 
		  public.i022t_grupo_proyecto, 
		  public.i008t_actividad, 
		  public.i007t_servicio
	WHERE 
		  $annio = extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
		  c001t_requerimiento.fe_fin_requerimiento >= '2017-07-01 00:00:00' AND
		  c001t_requerimiento.co_analista = i010t_analista.co_analista AND
		  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
		  i003t_proyecto.co_proyecto = c001t_requerimiento.co_proyecto AND
		  i009t_subactividad.co_actividad = i008t_actividad.co_actividad AND
		  i015t_indicador_gestion.co_indicador_gestion = i009t_subactividad.co_indicador_gestion AND
		  i022t_grupo_proyecto.co_grupo_proyecto = i003t_proyecto.co_grupo_proyecto AND
		  i008t_actividad.co_servicio = i007t_servicio.co_servicio AND 
		  (i007t_servicio.co_servicio > 12 AND i007t_servicio.co_servicio < 16) AND
		  	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto NOT LIKE 'NO APLICA' AND
			  i015t_indicador_gestion.tx_nombre_indicador_gestion  NOT LIKE 'NO APLICA' AND
			  c001t_requerimiento.co_estatus = 2 

	GROUP BY
		  i007t_servicio.tx_nombre_servicio,
		  i008t_actividad.tx_nombre_actividad, 
		  i015t_indicador_gestion.tx_nombre_indicador_gestion,
		  ANIO_MES  
	ORDER BY
	  PROCESO ASC";
 //fin sentencia sql
//***************************
    $result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$procesoAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);


	//$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);	
    $fila=5;
	$objPHPExcel->setActiveSheetIndex(0)// comenzar en la primera hoja
	->SetCellValue('A'.$fila, 'PROCESO')
	->SetCellValue('B'.$fila, 'SERVICIO')
	//->SetCellValue('C'.$fila, 'PROYECTO')
	
	->SetCellValue('D'.($fila-1), 'ENERO')
	->mergeCells('D'.($fila-1).':E'.($fila-1))
	->setCellValue('D'.$fila, 'SERV.')
	->setCellValue('E'.$fila, 'H/H')					

	->SetCellValue('F'.($fila-1), 'FEBRERO')
	->mergeCells('F'.($fila-1).':G'.($fila-1))	
	->setCellValue('F'.$fila, 'SERV.')
	->setCellValue('G'.$fila, 'H/H')	
	
	->SetCellValue('H'.($fila-1), 'MARZO')
	->mergeCells('H'.($fila-1).':I'.($fila-1))	
	->setCellValue('H'.$fila, 'SERV.')
	->setCellValue('I'.$fila, 'H/H')	
	
	->SetCellValue('J'.($fila-1), 'ABRIL')
	->mergeCells('J'.($fila-1).':K'.($fila-1))	
	->setCellValue('J'.$fila, 'SERV.')
	->setCellValue('K'.$fila, 'H/H')		
	
	->SetCellValue('L'.($fila-1), 'MAYO')
	->mergeCells('L'.($fila-1).':M'.($fila-1))
	->setCellValue('L'.$fila, 'SERV.')
	->setCellValue('M'.$fila, 'H/H')		
	
	->SetCellValue('N'.($fila-1), 'JUNIO')
	->mergeCells('N'.($fila-1).':O'.($fila-1))
	->setCellValue('N'.$fila, 'SERV.')
	->setCellValue('O'.$fila, 'H/H')	
	
	->SetCellValue('P'.($fila-1), 'JULIO')
	->mergeCells('P'.($fila-1).':Q'.($fila-1))
	->setCellValue('P'.$fila, 'SERV.')
	->setCellValue('Q'.$fila, 'H/H')	
	
	->SetCellValue('R'.($fila-1), 'AGOSTO')
	->mergeCells('R'.($fila-1).':S'.($fila-1))
	->setCellValue('R'.$fila, 'SERV.')
	->setCellValue('S'.$fila, 'H/H')	
	
	->SetCellValue('T'.($fila-1), 'SEPTIEMBRE')
	->mergeCells('T'.($fila-1).':U'.($fila-1))
	->setCellValue('T'.$fila, 'SERV.')
	->setCellValue('U'.$fila, 'H/H')				
	
	->SetCellValue('V'.($fila-1), 'OCTUBRE')
	->mergeCells('V'.($fila-1).':W'.($fila-1))
	->setCellValue('V'.$fila, 'SERV.')
	->setCellValue('W'.$fila, 'H/H')				
	
	->SetCellValue('X'.($fila-1), 'NOVIEMBRE')
	->mergeCells('X'.($fila-1).':Y'.($fila-1))
	->setCellValue('X'.$fila, 'SERV.')
	->setCellValue('Y'.$fila, 'H/H')				
	
	->SetCellValue('Z'.($fila-1), 'DICIEMBRE')
	->mergeCells('Z'.($fila-1).':AA'.($fila-1))
	->setCellValue('Z'.$fila, 'SERV.')
	->setCellValue('AA'.$fila, 'H/H')
	
	->SetCellValue('AB'.($fila-1), 'TOTALES')
	->mergeCells('AB'.($fila-1).':AC'.($fila-1))
	->setCellValue('AB'.$fila, 'SERV.')
	->setCellValue('AC'.$fila, 'H/H');																	
		
	$objPHPExcel->getActiveSheet()->getStyle('B'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AC'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);	

	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$proceso = $row['proceso'];
				$servicio = $row['servicio'];
				//$indicador = $row['indicador'];
				$nproceso = 'SOPORTE AL FLUJO DE TRABAJO';#$row['proceso'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $nproceso . ' ' . $proceso . ' ' . $servicio;
				$totalservicios = $row['total_req'];
				$totalhh = $row['total_hh'];
				// este es el encabezado del archivo
				if ($procesoAnt != $proceso)
				 {
				    $procesoAnt = $proceso;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(0)// 
					->SetCellValue('A'.$fila, $proceso);
					$objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->setBold(true); 
				 }				
				$colServ = 'E';
				$colHH = 'F';
                list($anio,$mes) = explode('-',$anio_mes);
				switch ($mes) {
					case '1':
						$colServ = 'D';
						$colHH = 'E';
						break;
					case '2':
						$colServ = 'F';
						$colHH = 'G';					
						break;
					case '3':
						$colServ = 'H';
						$colHH = 'I';
						break;
					case '4':
						$colServ = 'J';
						$colHH = 'K';
						break;
					case '5':
						$colServ = 'L';
						$colHH = 'M';
						break;
					case '6':
						$colServ = 'N';
						$colHH = 'O';
						break;
					case '7':
						$colServ = 'P';
						$colHH = 'Q';
						break;
					case '8':
						$colServ = 'R';
						$colHH = 'S';
						break;
					case '9':
						$colServ = 'T';
						$colHH = 'U';
						break;
					case '10':
						$colServ = 'V';
						$colHH = 'W';
						break;
					case '11':
						$colServ = 'X';
						$colHH = 'Y';
						break;
					case '12':
						$colServ = 'Z';
						$colHH = 'AA';
						break;			
				}

				if ($cadAct != $cadAnt)
				{
					$fila++;
					$objPHPExcel->setActiveSheetIndex(0)
					->setCellValue('B'.$fila, $proceso)
					->setCellValue('C'.$fila, $servicio)				
					->setCellValue($colServ.$fila, $totalservicios)
					->setCellValue($colHH.$fila, $totalhh)
					->setCellValue('AB'.$fila, '=D'.$fila.'+F'.$fila.'+H'.$fila.'+J'.$fila.'+L'.$fila.'+N'.$fila.'+P'.$fila.'+R'.$fila.'+T'.$fila.'+V'.$fila.'+X'.$fila.'+Z'.$fila)
					->setCellValue('AC'.$fila, '=E'.$fila.'+G'.$fila.'+I'.$fila.'+K'.$fila.'+M'.$fila.'+O'.$fila.'+Q'.$fila.'+S'.$fila.'+U'.$fila.'+W'.$fila.'+Y'.$fila.'+AA'.$fila);
                    $objPHPExcel->getActiveSheet()->getStyle('AC'.$fila)->getNumberFormat()->setFormatCode('#,##0.00');					
                    $cadAnt = $cadAct;					
				} 	
				else
				{
					$objPHPExcel->setActiveSheetIndex(0)			
					->setCellValue($colServ.$fila, $totalservicios)
					->setCellValue($colHH.$fila, $totalhh);						
				}
			 $objPHPExcel->getActiveSheet()->getStyle($colHH.$fila)->getNumberFormat()->setFormatCode('#,##0.00');
			}// fin del while

	//*********************
	//**********************

	// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('SFT'); //MD

// Seteo del Encabezado y pie de pagina
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('Logo PDVSA');
$objDrawing->setDescription('LOGO pdvsa');
$objDrawing->setPath('imagenes/header3.png');
$objDrawing->setHeight(40);
$objDrawing->setCoordinates('A1');
$objDrawing->setOffsetX(10);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
$objPHPExcel->getActiveSheet()->getHeaderFooter()->setOddFooter('&L&B SIG_CGR  &C&H' . '&C &D  &T' . '&RPag &P de &N');
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_LETTER);





// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$fileName = "Indicadores de Gestión";
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="' . $fileName . '.xlsx"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');

?>
