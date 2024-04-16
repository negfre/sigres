<?php

/*Incluir clase para validar si esta logueado

/** Error reporting */
error_reporting(E_ALL);

//date_default_timezone_set('Europe/London');

/** PHPExcel */

require_once 'Classes/PHPExcel.php';
include 'Classes/PHPExcel/Writer/Excel2007.php';
require_once 'Classes/PHPExcel/IOFactory.php';
require_once 'bd.php';  

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
            ->setCategory("Reporte SIG_CGR");

$annio = 2013;
$incremento=0;

$file = fopen('listaProyectos.csv', 'r');
while (($line = fgetcsv($file)) !== FALSE) {
  //$line is an array of the csv elements
  $arrResult[] = $line;
}
  //print_r($arrResult);
fclose($file);
//***********************************************************************************
//***********************************************************************************
    $sql = "SELECT 
	  i015t_indicador_gestion.tx_nombre_indicador_gestion AS Indicador,
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia, 
	  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
	  i005t_proceso.tx_nombre_proceso AS Proceso, 
	  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
	  COUNT(c001t_requerimiento.co_requerimiento) AS TOTAL_REQ,
	  SUM(c001t_requerimiento.nu_tiempo_efectivo)/60 as TOTAL_HH
	  
	FROM 
	  public.i015t_indicador_gestion, 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto
	WHERE ". 
	  $annio."= extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  c001t_requerimiento.fe_fin_requerimiento >= '2017-03-01 00:00:00' AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_indicador_gestion = i015t_indicador_gestion.co_indicador_gestion AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto NOT LIKE 'NO APLICA' AND
	  i015t_indicador_gestion.tx_nombre_indicador_gestion  NOT LIKE 'NO APLICA' AND
	  c001t_requerimiento.co_estatus = 2 AND
	  i005t_proceso.tx_nombre_proceso LIKE 'SOPORTE A FLUJOS DE DATOS'
	GROUP BY
	  i015t_indicador_gestion.tx_nombre_indicador_gestion, 
	  i003t_proyecto.tx_nombre_proyecto, 
	  i005t_proceso.tx_nombre_proceso, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  ANIO_MES
	  
	ORDER BY
	  i015t_indicador_gestion.tx_nombre_indicador_gestion,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila3 = 9;
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$IndicadorAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);	

	$objPHPExcel->setActiveSheetIndex(0)// comenzar en la primera hoja
	->SetCellValue('A'.$fila, 'INDICADOR DE GESTION')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	
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
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$indicador = $row['indicador'];
				$proceso = $row['proceso'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $proceso . ' ' . $gerencia . ' ' . $proyecto . ' ' . $indicador;
				$totalservicios = $row['total_req'];
				$totalhh = $row['total_hh'];
				// este es el encabezado del archivo
				if ($IndicadorAnt != $indicador)
				 {
					if ($IndicadorAnt != '') 
				      $incremento += 95;
				    $IndicadorAnt = $indicador;
                    $fila3 += $incremento;
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$fila3)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(0)// 
					->SetCellValue('A'.$fila3, $indicador);
					$objPHPExcel->getActiveSheet()->getStyle('A'.$fila3)->getFont()->setBold(true); 
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
				
				$fila=0;
				foreach ($arrResult as $l)
				{
				  if ( $l[1] == $proyecto )
				   $fila = $l[0]+$incremento;
				}
				
				
				if ($cadAct != $cadAnt)
				{
					//$fila++;
					$objPHPExcel->setActiveSheetIndex(0)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
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

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('SFT');

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
//*******************************************************************************************
//*******************************************************************************************
/*
$objPHPExcel->createSheet(1);
$objPHPExcel->setActiveSheetIndex(1);
// Add some data
    $sql = "SELECT 
	  i015t_indicador_gestion.tx_nombre_indicador_gestion AS Indicador,
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia, 
	  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
	  i005t_proceso.tx_nombre_proceso AS Proceso, 
	  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
	  COUNT(c001t_requerimiento.co_requerimiento) AS TOTAL_REQ,
	  SUM(c001t_requerimiento.nu_tiempo_efectivo)/60 as TOTAL_HH
	  
	FROM 
	  public.i015t_indicador_gestion, 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto
	WHERE ". 
	  $annio."= extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_indicador_gestion = i015t_indicador_gestion.co_indicador_gestion AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto NOT LIKE 'NO APLICA' AND
	  i015t_indicador_gestion.tx_nombre_indicador_gestion  NOT LIKE 'NO APLICA' AND
	  c001t_requerimiento.co_estatus = 2 AND
	  i005t_proceso.tx_nombre_proceso LIKE 'MEMORIA CORPORATIVA'
	GROUP BY
	  i015t_indicador_gestion.tx_nombre_indicador_gestion, 
	  i003t_proyecto.tx_nombre_proyecto, 
	  i005t_proceso.tx_nombre_proceso, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  ANIO_MES
	  
	ORDER BY
	  i015t_indicador_gestion.tx_nombre_indicador_gestion,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$IndicadorAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);	

	$objPHPExcel->setActiveSheetIndex(1)// comenzar en la primera hoja
	->SetCellValue('A'.$fila, 'INDICADOR DE GESTION')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	
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
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$indicador = $row['indicador'];
				$proceso = $row['proceso'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $proceso . ' ' . $gerencia . ' ' . $proyecto . ' ' . $indicador;
				$totalservicios = $row['total_req'];
				$totalhh = $row['total_hh'];
				// este es el encabezado del archivo
				if ($IndicadorAnt != $indicador)
				 {
				    $IndicadorAnt = $indicador;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(1)// 
					->SetCellValue('A'.$fila, $indicador);
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
					$objPHPExcel->setActiveSheetIndex(1)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
					->setCellValue($colServ.$fila, $totalservicios)
					->setCellValue($colHH.$fila, $totalhh)
					->setCellValue('AB'.$fila, '=D'.$fila.'+F'.$fila.'+H'.$fila.'+J'.$fila.'+L'.$fila.'+N'.$fila.'+P'.$fila.'+R'.$fila.'+T'.$fila.'+V'.$fila.'+X'.$fila.'+Z'.$fila)
					->setCellValue('AC'.$fila, '=E'.$fila.'+G'.$fila.'+I'.$fila.'+K'.$fila.'+M'.$fila.'+O'.$fila.'+Q'.$fila.'+S'.$fila.'+U'.$fila.'+W'.$fila.'+Y'.$fila.'+AA'.$fila);
                    $objPHPExcel->getActiveSheet()->getStyle('AC'.$fila)->getNumberFormat()->setFormatCode('#,##0.00');					
                    $cadAnt = $cadAct;					
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(1)			
					->setCellValue($colServ.$fila, $totalservicios)
					->setCellValue($colHH.$fila, $totalhh);						
				}
				$objPHPExcel->getActiveSheet()->getStyle($colHH.$fila)->getNumberFormat()->setFormatCode('#,##0.00');
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('MC');
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
//*******************************************************************************************
//*******************************************************************************************
$objPHPExcel->createSheet(2);
$objPHPExcel->setActiveSheetIndex(2);
// Add some data
    $sql = "SELECT 
	  i015t_indicador_gestion.tx_nombre_indicador_gestion AS Indicador,
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia, 
	  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
	  i005t_proceso.tx_nombre_proceso AS Proceso, 
	  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
	  COUNT(c001t_requerimiento.co_requerimiento) AS TOTAL_REQ,
	  SUM(c001t_requerimiento.nu_tiempo_efectivo)/60 as TOTAL_HH
	  
	FROM 
	  public.i015t_indicador_gestion, 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto
	WHERE ". 
	  $annio."= extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_indicador_gestion = i015t_indicador_gestion.co_indicador_gestion AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto NOT LIKE 'NO APLICA' AND
	  i015t_indicador_gestion.tx_nombre_indicador_gestion  NOT LIKE 'NO APLICA' AND
	  c001t_requerimiento.co_estatus = 2 AND
	  i005t_proceso.tx_nombre_proceso LIKE 'SOPORTE A FLUJOS DE DATOS'
	GROUP BY
	  i015t_indicador_gestion.tx_nombre_indicador_gestion, 
	  i003t_proyecto.tx_nombre_proyecto, 
	  i005t_proceso.tx_nombre_proceso, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  ANIO_MES
	  
	ORDER BY
	  i015t_indicador_gestion.tx_nombre_indicador_gestion,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$IndicadorAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);	

	$objPHPExcel->setActiveSheetIndex(2)// comenzar en la primera hoja
	->SetCellValue('A'.$fila, 'INDICADOR DE GESTION')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	
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
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$indicador = $row['indicador'];
				$proceso = $row['proceso'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $proceso . ' ' . $gerencia . ' ' . $proyecto . ' ' . $indicador;
				$totalservicios = $row['total_req'];
				$totalhh = $row['total_hh'];
				// este es el encabezado del archivo
				if ($IndicadorAnt != $indicador)
				 {
				    $IndicadorAnt = $indicador;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(2)// 
					->SetCellValue('A'.$fila, $indicador);
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
					$objPHPExcel->setActiveSheetIndex(2)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
					->setCellValue($colServ.$fila, $totalservicios)
					->setCellValue($colHH.$fila, $totalhh)
					->setCellValue('AB'.$fila, '=D'.$fila.'+F'.$fila.'+H'.$fila.'+J'.$fila.'+L'.$fila.'+N'.$fila.'+P'.$fila.'+R'.$fila.'+T'.$fila.'+V'.$fila.'+X'.$fila.'+Z'.$fila)
					->setCellValue('AC'.$fila, '=E'.$fila.'+G'.$fila.'+I'.$fila.'+K'.$fila.'+M'.$fila.'+O'.$fila.'+Q'.$fila.'+S'.$fila.'+U'.$fila.'+W'.$fila.'+Y'.$fila.'+AA'.$fila);
                    $objPHPExcel->getActiveSheet()->getStyle('AC'.$fila)->getNumberFormat()->setFormatCode('#,##0.00');					
                    $cadAnt = $cadAct;					
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(2)			
					->setCellValue($colServ.$fila, $totalservicios)
					->setCellValue($colHH.$fila, $totalhh);						
				}
				$objPHPExcel->getActiveSheet()->getStyle($colHH.$fila)->getNumberFormat()->setFormatCode('#,##0.00');
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('SFD');
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
//*******************************************************************************************
//*******************************************************************************************
$objPHPExcel->createSheet(3);
$objPHPExcel->setActiveSheetIndex(3);
// Add some data
    $sql = "SELECT 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia, 
	  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
	  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
	  COUNT(c001t_requerimiento.co_requerimiento) AS TOTAL_REQ,
	  SUM(c001t_requerimiento.nu_tiempo_efectivo)/60 as TOTAL_HH
	  
	FROM 
	  public.i015t_indicador_gestion, 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto
	WHERE ". 
	  $annio."= extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_indicador_gestion = i015t_indicador_gestion.co_indicador_gestion AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto NOT LIKE 'NO APLICA' AND
	  i015t_indicador_gestion.tx_nombre_indicador_gestion  NOT LIKE 'NO APLICA' AND
	  c001t_requerimiento.co_estatus = 2 
	GROUP BY
	  i003t_proyecto.tx_nombre_proyecto, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  ANIO_MES
	  
	ORDER BY
	 i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 5;

	//iteramos para los resultados
	$numeroRegistros = pg_num_rows($result);

	$cadAnt = '';
	$cadAct = '';
				
	$objPHPExcel->setActiveSheetIndex(3)// comenzar
	
	->SetCellValue('A'.$fila, 'GERENCIA')
	->SetCellValue('B'.$fila, 'PROYECTO')
	
	->SetCellValue('C'.($fila-1), 'ENERO')
	->mergeCells('C'.($fila-1).':D'.($fila-1))
	->setCellValue('C'.$fila, 'SERV.')
	->setCellValue('D'.$fila, 'H/H')					

	->SetCellValue('E'.($fila-1), 'FEBRERO')
	->mergeCells('E'.($fila-1).':F'.($fila-1))	
	->setCellValue('E'.$fila, 'SERV.')
	->setCellValue('F'.$fila, 'H/H')	
	
	->SetCellValue('G'.($fila-1), 'MARZO')
	->mergeCells('G'.($fila-1).':H'.($fila-1))	
	->setCellValue('G'.$fila, 'SERV.')
	->setCellValue('H'.$fila, 'H/H')	
	
	->SetCellValue('I'.($fila-1), 'ABRIL')
	->mergeCells('I'.($fila-1).':J'.($fila-1))	
	->setCellValue('I'.$fila, 'SERV.')
	->setCellValue('J'.$fila, 'H/H')		
	
	->SetCellValue('K'.($fila-1), 'MAYO')
	->mergeCells('K'.($fila-1).':L'.($fila-1))
	->setCellValue('K'.$fila, 'SERV.')
	->setCellValue('L'.$fila, 'H/H')		
	
	->SetCellValue('M'.($fila-1), 'JUNIO')
	->mergeCells('M'.($fila-1).':N'.($fila-1))
	->setCellValue('M'.$fila, 'SERV.')
	->setCellValue('N'.$fila, 'H/H')	
	
	->SetCellValue('O'.($fila-1), 'JULIO')
	->mergeCells('O'.($fila-1).':P'.($fila-1))
	->setCellValue('O'.$fila, 'SERV.')
	->setCellValue('P'.$fila, 'H/H')	
	
	->SetCellValue('Q'.($fila-1), 'AGOSTO')
	->mergeCells('Q'.($fila-1).':R'.($fila-1))
	->setCellValue('Q'.$fila, 'SERV.')
	->setCellValue('R'.$fila, 'H/H')	
	
	->SetCellValue('S'.($fila-1), 'SEPTIEMBRE')
	->mergeCells('S'.($fila-1).':T'.($fila-1))
	->setCellValue('S'.$fila, 'SERV.')
	->setCellValue('T'.$fila, 'H/H')				
	
	->SetCellValue('U'.($fila-1), 'OCTUBRE')
	->mergeCells('U'.($fila-1).':V'.($fila-1))
	->setCellValue('U'.$fila, 'SERV.')
	->setCellValue('V'.$fila, 'H/H')				
	
	->SetCellValue('W'.($fila-1), 'NOVIEMBRE')
	->mergeCells('W'.($fila-1).':X'.($fila-1))
	->setCellValue('W'.$fila, 'SERV.')
	->setCellValue('X'.$fila, 'H/H')				
	
	->SetCellValue('Y'.($fila-1), 'DICIEMBRE')
	->mergeCells('Y'.($fila-1).':Z'.($fila-1))
	->setCellValue('Y'.$fila, 'SERV.')
	->setCellValue('Z'.$fila, 'H/H')			
			
	->SetCellValue('AA'.($fila-1), 'TOTALES')
	->mergeCells('AA'.($fila-1).':AB'.($fila-1))
	->setCellValue('AA'.$fila, 'SERV.')
	->setCellValue('AB'.$fila, 'H/H');	
	
    	
	$objPHPExcel->getActiveSheet()->getStyle('C'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AB'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $gerencia . ' ' . $proyecto;
				$totalservicios = $row['total_req'];
				$totalhh = $row['total_hh'];
				// este es el encabezado del archivo


				
				$colServ = 'E';
				$colHH = 'F';
                list($anio,$mes) = explode('-',$anio_mes);
				switch ($mes) {
					case '1':
						$colServ = 'C';
						$colHH = 'D';
						break;
					case '2':
						$colServ = 'E';
						$colHH = 'F';					
						break;
					case '3':
						$colServ = 'G';
						$colHH = 'H';
						break;
					case '4':
						$colServ = 'I';
						$colHH = 'J';
						break;
					case '5':
						$colServ = 'K';
						$colHH = 'L';
						break;
					case '6':
						$colServ = 'M';
						$colHH = 'N';
						break;
					case '7':
						$colServ = 'O';
						$colHH = 'P';
						break;
					case '8':
						$colServ = 'Q';
						$colHH = 'R';
						break;
					case '9':
						$colServ = 'S';
						$colHH = 'T';
						break;
					case '10':
						$colServ = 'U';
						$colHH = 'V';
						break;
					case '11':
						$colServ = 'W';
						$colHH = 'X';
						break;
					case '12':
						$colServ = 'Y';
						$colHH = 'Z';
						break;			
				}
				
				if ($cadAct != $cadAnt)
				{
					$fila++;
					$objPHPExcel->setActiveSheetIndex(3)
					->setCellValue('A'.$fila, $gerencia)
					->setCellValue('B'.$fila, $proyecto)				
					->setCellValue($colServ.$fila, $totalservicios)
					->setCellValue($colHH.$fila, $totalhh)
					->setCellValue('AA'.$fila, '=C'.$fila.'+E'.$fila.'+G'.$fila.'+I'.$fila.'+K'.$fila.'+M'.$fila.'+O'.$fila.'+Q'.$fila.'+S'.$fila.'+U'.$fila.'+W'.$fila.'+Y'.$fila)
					->setCellValue('AB'.$fila, '=D'.$fila.'+F'.$fila.'+H'.$fila.'+J'.$fila.'+L'.$fila.'+N'.$fila.'+P'.$fila.'+R'.$fila.'+T'.$fila.'+V'.$fila.'+X'.$fila.'+Z'.$fila);
                    $objPHPExcel->getActiveSheet()->getStyle('AB'.$fila)->getNumberFormat()->setFormatCode('#,##0.00');
                    $cadAnt = $cadAct;	
                    //fomula para los totales
                    				
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(3)			
					->setCellValue($colServ.$fila, $totalservicios)
					->setCellValue($colHH.$fila, $totalhh);						
				}
				$objPHPExcel->getActiveSheet()->getStyle($colHH.$fila)->getNumberFormat()->setFormatCode('#,##0.00');
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('RESUMEN');
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
//*******************************************************************************************
//*******************************************************************************************

*/
// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$objPHPExcel->setActiveSheetIndex(0);
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="Indicadores de Gestión.xls"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output'); 

?>
