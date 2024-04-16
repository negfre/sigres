<?php

/** Error reporting */
error_reporting(E_ALL);

//date_default_timezone_set('Europe/London');

/** PHPExcel */
require_once 'Classes/PHPExcel.php';
// include 'Classes/PHPExcel/Writer/Excel2007.php';
// require_once 'Classes/PHPExcel/IOFactory.php';
// require_once 'bd.php';  
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
            ->setTitle("Reporte de Matriz de Datos")
            ->setSubject("Reporte de Matriz de Datos")
            ->setDescription("GODD")
            ->setKeywords("office 2007 openxml php")
            ->setCategory("Reporte SIG_CGR");


$annio = $_GET['anio'];
//***********************************************************************************
// 
    $sql = "SELECT 
  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
  i005t_proceso.tx_nombre_proceso AS Proceso, 
  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia,  
  i016t_dato_matriz.tx_nombre_dato_matriz AS ItemMatriz, 
  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
  SUM(c001t_requerimiento.nu_volumen) AS Total
	FROM 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto, 
	  public.i025t_grupo_matriz, 
	  public.i016t_dato_matriz
	WHERE ". 
	  $annio." = extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_dato_matriz = i016t_dato_matriz.co_dato_matriz AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i025t_grupo_matriz.co_grupo_matriz = i016t_dato_matriz.co_grupo_matriz AND
	  i025t_grupo_matriz.tx_nombre_grupo_matriz NOT LIKE 'NO APLICA' AND
	  i005t_proceso.tx_nombre_proceso LIKE 'MANEJO DEL DATO' AND
	  (i016t_dato_matriz.co_grupo_matriz > 3 AND i016t_dato_matriz.co_grupo_matriz < 9)
	GROUP BY
	  i016t_dato_matriz.tx_nombre_dato_matriz, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  i003t_proyecto.tx_nombre_proyecto,
	  i005t_proceso.tx_nombre_proceso,
	  ANIO_MES
	ORDER BY
	  i016t_dato_matriz.tx_nombre_dato_matriz,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$ItemAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
	// este es el encabezado del archivo
	$objPHPExcel->setActiveSheetIndex(0)// comenzar en la primera hoja
	->SetCellValue('A'.$fila, 'CAMPO MATRIZ')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	
	->SetCellValue('D'.($fila-1), 'ENERO')
	->setCellValue('D'.$fila, 'Cant.')					

	->SetCellValue('E'.($fila-1), 'FEBRERO')
	->setCellValue('E'.$fila, 'Cant.')					
	
	->SetCellValue('F'.($fila-1), 'MARZO')
	->setCellValue('F'.$fila, 'Cant.')					
	
	->SetCellValue('G'.($fila-1), 'ABRIL')
	->setCellValue('G'.$fila, 'Cant.')					
	
	->SetCellValue('H'.($fila-1), 'MAYO')
	->setCellValue('H'.$fila, 'Cant.')					
	
	->SetCellValue('I'.($fila-1), 'JUNIO')
	->setCellValue('I'.$fila, 'Cant.')					
	
	->SetCellValue('J'.($fila-1), 'JULIO')
	->setCellValue('J'.$fila, 'Cant.')					
	
	->SetCellValue('K'.($fila-1), 'AGOSTO')
	->setCellValue('K'.$fila, 'Cant.')					
	
	->SetCellValue('L'.($fila-1), 'SEPTIEMBRE')
	->setCellValue('L'.$fila, 'Cant.')					
	
	->SetCellValue('M'.($fila-1), 'OCTUBRE')
	->setCellValue('M'.$fila, 'Cant.')					
	
	->SetCellValue('N'.($fila-1), 'NOVIEMBRE')
	->setCellValue('N'.$fila, 'Cant.')					
	
	->SetCellValue('O'.($fila-1), 'DICIEMBRE')
	->setCellValue('O'.$fila, 'Cant.')					
						
	->SetCellValue('P'.($fila-1), 'TOTAL')
	->setCellValue('P'.$fila, 'Cant.');	
					
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AB'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	$colCant = 'D';
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$itemmatriz = $row['itemmatriz'];
				$proceso = $row['proceso'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $proceso . ' ' . $gerencia . ' ' . $proyecto . ' ' . $itemmatriz;
				$totalvolumen = $row['total'];

				if ($ItemAnt != $itemmatriz)
				 {
				    $ItemAnt = $itemmatriz;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.($fila))->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(0)// 
					->SetCellValue('A'.$fila, $itemmatriz);
					$objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->setBold(true);  	
				 }
				
				$colCant = 'D';
                list($anio,$mes) = explode('-',$anio_mes);
				switch ($mes) {
					case '1':
						$colCant = 'D';
						break;
					case '2':
						$colCant = 'E';				
						break;
					case '3':
						$colCant = 'F';
						break;
					case '4':
						$colCant = 'G';
						break;
					case '5':
						$colCant = 'H';
						break;
					case '6':
						$colCant = 'I';
						break;
					case '7':
						$colCant = 'J';
						break;
					case '8':
						$colCant = 'K';
						break;
					case '9':
						$colCant = 'L';
						break;
					case '10':
						$colCant = 'M';
						break;
					case '11':
						$colCant = 'N';
						break;
					case '12':
						$colCant = 'O';
						break;			
				}
				
				if ($cadAct != $cadAnt)
				{
					$fila++;
					$objPHPExcel->setActiveSheetIndex(0)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
					->setCellValue($colCant.$fila, $totalvolumen)
					->setCellValue('P'.$fila, '=D'.$fila.'+E'.$fila.'+F'.$fila.'+G'.$fila.'+H'.$fila.'+I'.$fila.'+J'.$fila.'+K'.$fila.'+L'.$fila.'+M'.$fila.'+N'.$fila.'+O'.$fila);					
                    $cadAnt = $cadAct;					
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(0)			
					->setCellValue($colCant.$fila, $totalvolumen);			
				}
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('MD (OPER)');

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
$objPHPExcel->createSheet(1);
$objPHPExcel->setActiveSheetIndex(1);
    $sql = "SELECT 
  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
  i005t_proceso.tx_nombre_proceso AS Proceso, 
  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia,  
  i016t_dato_matriz.tx_nombre_dato_matriz AS ItemMatriz, 
  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
  SUM(c001t_requerimiento.nu_volumen) AS Total
	FROM 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto, 
	  public.i025t_grupo_matriz, 
	  public.i016t_dato_matriz
	WHERE ".
	  $annio." = extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_dato_matriz = i016t_dato_matriz.co_dato_matriz AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i025t_grupo_matriz.co_grupo_matriz = i016t_dato_matriz.co_grupo_matriz AND
	  i025t_grupo_matriz.tx_nombre_grupo_matriz NOT LIKE 'NO APLICA' AND
	  i005t_proceso.tx_nombre_proceso LIKE 'MANEJO DEL DATO' AND
	  
	  (i016t_dato_matriz.co_grupo_matriz = 9)
	GROUP BY
	  i016t_dato_matriz.tx_nombre_dato_matriz, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  i003t_proyecto.tx_nombre_proyecto,
	  i005t_proceso.tx_nombre_proceso,
	  ANIO_MES
	ORDER BY
	  i016t_dato_matriz.tx_nombre_dato_matriz,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$ItemAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
	// este es el encabezado del archivo
	$objPHPExcel->setActiveSheetIndex(1)// comenzar en la primera hoja
	->SetCellValue('A'.$fila, 'CAMPO MATRIZ')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	
	->SetCellValue('D'.($fila-1), 'ENERO')
	->setCellValue('D'.$fila, 'Cant.')					

	->SetCellValue('E'.($fila-1), 'FEBRERO')
	->setCellValue('E'.$fila, 'Cant.')					
	
	->SetCellValue('F'.($fila-1), 'MARZO')
	->setCellValue('F'.$fila, 'Cant.')					
	
	->SetCellValue('G'.($fila-1), 'ABRIL')
	->setCellValue('G'.$fila, 'Cant.')					
	
	->SetCellValue('H'.($fila-1), 'MAYO')
	->setCellValue('H'.$fila, 'Cant.')					
	
	->SetCellValue('I'.($fila-1), 'JUNIO')
	->setCellValue('I'.$fila, 'Cant.')					
	
	->SetCellValue('J'.($fila-1), 'JULIO')
	->setCellValue('J'.$fila, 'Cant.')					
	
	->SetCellValue('K'.($fila-1), 'AGOSTO')
	->setCellValue('K'.$fila, 'Cant.')					
	
	->SetCellValue('L'.($fila-1), 'SEPTIEMBRE')
	->setCellValue('L'.$fila, 'Cant.')					
	
	->SetCellValue('M'.($fila-1), 'OCTUBRE')
	->setCellValue('M'.$fila, 'Cant.')					
	
	->SetCellValue('N'.($fila-1), 'NOVIEMBRE')
	->setCellValue('N'.$fila, 'Cant.')					
	
	->SetCellValue('O'.($fila-1), 'DICIEMBRE')
	->setCellValue('O'.$fila, 'Cant.')					
						
	->SetCellValue('P'.($fila-1), 'TOTAL')
	->setCellValue('P'.$fila, 'Cant.');	
					
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AB'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$itemmatriz = $row['itemmatriz'];
				$proceso = $row['proceso'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $proceso . ' ' . $gerencia . ' ' . $proyecto . ' ' . $itemmatriz;
				$totalvolumen = $row['total'];

				if ($ItemAnt != $itemmatriz)
				 {
				    $ItemAnt = $itemmatriz;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.($fila))->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(1)// 
					->SetCellValue('A'.$fila, $itemmatriz);
					$objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->setBold(true);  	
				 }
				
				$colCant = 'D';
                list($anio,$mes) = explode('-',$anio_mes);
				switch ($mes) {
					case '1':
						$colCant = 'D';
						break;
					case '2':
						$colCant = 'E';				
						break;
					case '3':
						$colCant = 'F';
						break;
					case '4':
						$colCant = 'G';
						break;
					case '5':
						$colCant = 'H';
						break;
					case '6':
						$colCant = 'I';
						break;
					case '7':
						$colCant = 'J';
						break;
					case '8':
						$colCant = 'K';
						break;
					case '9':
						$colCant = 'L';
						break;
					case '10':
						$colCant = 'M';
						break;
					case '11':
						$colCant = 'N';
						break;
					case '12':
						$colCant = 'O';
						break;			
				}
				
				if ($cadAct != $cadAnt)
				{
					$fila++;
					$objPHPExcel->setActiveSheetIndex(1)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
					->setCellValue($colCant.$fila, $totalvolumen)
					->setCellValue('P'.$fila, '=D'.$fila.'+E'.$fila.'+F'.$fila.'+G'.$fila.'+H'.$fila.'+I'.$fila.'+J'.$fila.'+K'.$fila.'+L'.$fila.'+M'.$fila.'+N'.$fila.'+O'.$fila);					
                    $cadAnt = $cadAct;					
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(1)			
					->setCellValue($colCant.$fila, $totalvolumen);			
				}
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('MD (PROY)');

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
    $sql = "SELECT 
  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
  i005t_proceso.tx_nombre_proceso AS Proceso, 
  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia,  
  i016t_dato_matriz.tx_nombre_dato_matriz AS ItemMatriz, 
  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
  SUM(c001t_requerimiento.nu_volumen) AS Total
	FROM 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto, 
	  public.i025t_grupo_matriz, 
	  public.i016t_dato_matriz
	WHERE ".
      $annio." = extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND	
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_dato_matriz = i016t_dato_matriz.co_dato_matriz AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i025t_grupo_matriz.co_grupo_matriz = i016t_dato_matriz.co_grupo_matriz AND
	  i025t_grupo_matriz.tx_nombre_grupo_matriz NOT LIKE 'NO APLICA' AND
	  i005t_proceso.tx_nombre_proceso LIKE 'MANEJO DEL DATO' AND
	  (i016t_dato_matriz.co_grupo_matriz = 10)
	GROUP BY
	  i016t_dato_matriz.tx_nombre_dato_matriz, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  i003t_proyecto.tx_nombre_proyecto,
	  i005t_proceso.tx_nombre_proceso,
	  ANIO_MES
	ORDER BY
	  i016t_dato_matriz.tx_nombre_dato_matriz,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$ItemAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
	// este es el encabezado del archivo
	$objPHPExcel->setActiveSheetIndex(2)// comenzar en la primera hoja
	->SetCellValue('A'.$fila, 'CAMPO MATRIZ')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	
	->SetCellValue('D'.($fila-1), 'ENERO')
	->setCellValue('D'.$fila, 'Cant.')					

	->SetCellValue('E'.($fila-1), 'FEBRERO')
	->setCellValue('E'.$fila, 'Cant.')					
	
	->SetCellValue('F'.($fila-1), 'MARZO')
	->setCellValue('F'.$fila, 'Cant.')					
	
	->SetCellValue('G'.($fila-1), 'ABRIL')
	->setCellValue('G'.$fila, 'Cant.')					
	
	->SetCellValue('H'.($fila-1), 'MAYO')
	->setCellValue('H'.$fila, 'Cant.')					
	
	->SetCellValue('I'.($fila-1), 'JUNIO')
	->setCellValue('I'.$fila, 'Cant.')					
	
	->SetCellValue('J'.($fila-1), 'JULIO')
	->setCellValue('J'.$fila, 'Cant.')					
	
	->SetCellValue('K'.($fila-1), 'AGOSTO')
	->setCellValue('K'.$fila, 'Cant.')					
	
	->SetCellValue('L'.($fila-1), 'SEPTIEMBRE')
	->setCellValue('L'.$fila, 'Cant.')					
	
	->SetCellValue('M'.($fila-1), 'OCTUBRE')
	->setCellValue('M'.$fila, 'Cant.')					
	
	->SetCellValue('N'.($fila-1), 'NOVIEMBRE')
	->setCellValue('N'.$fila, 'Cant.')					
	
	->SetCellValue('O'.($fila-1), 'DICIEMBRE')
	->setCellValue('O'.$fila, 'Cant.')					
						
	->SetCellValue('P'.($fila-1), 'TOTAL')
	->setCellValue('P'.$fila, 'Cant.');	
					
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AB'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$itemmatriz = $row['itemmatriz'];
				$proceso = $row['proceso'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $proceso . ' ' . $gerencia . ' ' . $proyecto . ' ' . $itemmatriz;
				$totalvolumen = $row['total'];

				if ($ItemAnt != $itemmatriz)
				 {
				    $ItemAnt = $itemmatriz;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.($fila))->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(2)// 
					->SetCellValue('A'.$fila, $itemmatriz);
					$objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->setBold(true);  	
				 }
				
				$colCant = 'D';
                list($anio,$mes) = explode('-',$anio_mes);
				switch ($mes) {
					case '1':
						$colCant = 'D';
						break;
					case '2':
						$colCant = 'E';				
						break;
					case '3':
						$colCant = 'F';
						break;
					case '4':
						$colCant = 'G';
						break;
					case '5':
						$colCant = 'H';
						break;
					case '6':
						$colCant = 'I';
						break;
					case '7':
						$colCant = 'J';
						break;
					case '8':
						$colCant = 'K';
						break;
					case '9':
						$colCant = 'L';
						break;
					case '10':
						$colCant = 'M';
						break;
					case '11':
						$colCant = 'N';
						break;
					case '12':
						$colCant = 'O';
						break;			
				}
				
				if ($cadAct != $cadAnt)
				{
					$fila++;
					$objPHPExcel->setActiveSheetIndex(2)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
					->setCellValue($colCant.$fila, $totalvolumen)
					->setCellValue('P'.$fila, '=D'.$fila.'+E'.$fila.'+F'.$fila.'+G'.$fila.'+H'.$fila.'+I'.$fila.'+J'.$fila.'+K'.$fila.'+L'.$fila.'+M'.$fila.'+N'.$fila.'+O'.$fila);					
                    $cadAnt = $cadAct;					
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(2)			
					->setCellValue($colCant.$fila, $totalvolumen);			
				}
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('MD (PROY) SISM');

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
    $sql = "SELECT 
  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
  i005t_proceso.tx_nombre_proceso AS Proceso, 
  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia,  
  i016t_dato_matriz.tx_nombre_dato_matriz AS ItemMatriz, 
  (extract(year from c001t_requerimiento.fe_fin_requerimiento)::int || '-' || extract(month from c001t_requerimiento.fe_fin_requerimiento)::int ) as ANIO_MES,
  SUM(c001t_requerimiento.nu_volumen) AS Total
	FROM 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto, 
	  public.i025t_grupo_matriz, 
	  public.i016t_dato_matriz
	WHERE ".
      $annio." = extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND	
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_dato_matriz = i016t_dato_matriz.co_dato_matriz AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i025t_grupo_matriz.co_grupo_matriz = i016t_dato_matriz.co_grupo_matriz AND
	  i025t_grupo_matriz.tx_nombre_grupo_matriz NOT LIKE 'NO APLICA' AND
	  i005t_proceso.tx_nombre_proceso LIKE 'MEMORIA CORPORATIVA' AND
	  (i016t_dato_matriz.co_grupo_matriz > 1 AND i016t_dato_matriz.co_grupo_matriz < 4)
	GROUP BY
	  i016t_dato_matriz.tx_nombre_dato_matriz, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  i003t_proyecto.tx_nombre_proyecto,
	  i005t_proceso.tx_nombre_proceso,
	  ANIO_MES
	ORDER BY
	  i016t_dato_matriz.tx_nombre_dato_matriz,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$ItemAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
	// este es el encabezado del archivo
	$objPHPExcel->setActiveSheetIndex(3)// comenzar en la primera hoja
	->SetCellValue('A'.$fila, 'CAMPO MATRIZ')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	
	->SetCellValue('D'.($fila-1), 'ENERO')
	->setCellValue('D'.$fila, 'Cant.')					

	->SetCellValue('E'.($fila-1), 'FEBRERO')
	->setCellValue('E'.$fila, 'Cant.')					
	
	->SetCellValue('F'.($fila-1), 'MARZO')
	->setCellValue('F'.$fila, 'Cant.')					
	
	->SetCellValue('G'.($fila-1), 'ABRIL')
	->setCellValue('G'.$fila, 'Cant.')					
	
	->SetCellValue('H'.($fila-1), 'MAYO')
	->setCellValue('H'.$fila, 'Cant.')					
	
	->SetCellValue('I'.($fila-1), 'JUNIO')
	->setCellValue('I'.$fila, 'Cant.')					
	
	->SetCellValue('J'.($fila-1), 'JULIO')
	->setCellValue('J'.$fila, 'Cant.')					
	
	->SetCellValue('K'.($fila-1), 'AGOSTO')
	->setCellValue('K'.$fila, 'Cant.')					
	
	->SetCellValue('L'.($fila-1), 'SEPTIEMBRE')
	->setCellValue('L'.$fila, 'Cant.')					
	
	->SetCellValue('M'.($fila-1), 'OCTUBRE')
	->setCellValue('M'.$fila, 'Cant.')					
	
	->SetCellValue('N'.($fila-1), 'NOVIEMBRE')
	->setCellValue('N'.$fila, 'Cant.')					
	
	->SetCellValue('O'.($fila-1), 'DICIEMBRE')
	->setCellValue('O'.$fila, 'Cant.')					
						
	->SetCellValue('P'.($fila-1), 'TOTAL')
	->setCellValue('P'.$fila, 'Cant.');	
					
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AB'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$itemmatriz = $row['itemmatriz'];
				$proceso = $row['proceso'];
				$anio_mes = $row['anio_mes'];
				$cadAct = $proceso . ' ' . $gerencia . ' ' . $proyecto . ' ' . $itemmatriz;
				$totalvolumen = $row['total'];

				if ($ItemAnt != $itemmatriz)
				 {
				    $ItemAnt = $itemmatriz;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.($fila))->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(3)// 
					->SetCellValue('A'.$fila, $itemmatriz);
					$objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->setBold(true);  	
				 }
				
				$colCant = 'D';
                list($anio,$mes) = explode('-',$anio_mes);
				switch ($mes) {
					case '1':
						$colCant = 'D';
						break;
					case '2':
						$colCant = 'E';				
						break;
					case '3':
						$colCant = 'F';
						break;
					case '4':
						$colCant = 'G';
						break;
					case '5':
						$colCant = 'H';
						break;
					case '6':
						$colCant = 'I';
						break;
					case '7':
						$colCant = 'J';
						break;
					case '8':
						$colCant = 'K';
						break;
					case '9':
						$colCant = 'L';
						break;
					case '10':
						$colCant = 'M';
						break;
					case '11':
						$colCant = 'N';
						break;
					case '12':
						$colCant = 'O';
						break;			
				}
				
				if ($cadAct != $cadAnt)
				{
					$fila++;
					$objPHPExcel->setActiveSheetIndex(3)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
					->setCellValue($colCant.$fila, $totalvolumen)
					->setCellValue('P'.$fila, '=D'.$fila.'+E'.$fila.'+F'.$fila.'+G'.$fila.'+H'.$fila.'+I'.$fila.'+J'.$fila.'+K'.$fila.'+L'.$fila.'+M'.$fila.'+N'.$fila.'+O'.$fila);					
                    $cadAnt = $cadAct;					
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(3)			
					->setCellValue($colCant.$fila, $totalvolumen);			
				}
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('MC (MYA)');

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
//*******************************************************************************************MATRIZ_OPER
$objPHPExcel->createSheet(4);
$objPHPExcel->setActiveSheetIndex(4);
    $sql = "SELECT 
  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia,  
  i016t_dato_matriz.tx_nombre_dato_matriz AS ItemMatriz, 
  SUM(c001t_requerimiento.nu_volumen) AS Total
	FROM 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto, 
	  public.i025t_grupo_matriz, 
	  public.i016t_dato_matriz
	WHERE ".
	  $annio." = extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_dato_matriz = i016t_dato_matriz.co_dato_matriz AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i025t_grupo_matriz.co_grupo_matriz = i016t_dato_matriz.co_grupo_matriz AND
	  i025t_grupo_matriz.tx_nombre_grupo_matriz NOT LIKE 'NO APLICA' AND
	  (i016t_dato_matriz.co_grupo_matriz > 1 AND i016t_dato_matriz.co_grupo_matriz < 9)
	GROUP BY
	  i016t_dato_matriz.tx_nombre_dato_matriz, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  i003t_proyecto.tx_nombre_proyecto,
	  i005t_proceso.tx_nombre_proceso
	ORDER BY
	  i016t_dato_matriz.tx_nombre_dato_matriz,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$ItemAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);	
	$objPHPExcel->setActiveSheetIndex(4)// 
	->SetCellValue('A'.$fila, 'CAMPO MATRIZ')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	->SetCellValue('D'.($fila-1), '	TOTAL')
	->setCellValue('D'.$fila, 'Cant.');					
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AB'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);	
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$itemmatriz = $row['itemmatriz'];
				$cadAct = $gerencia . ' ' . $proyecto . ' ' . $itemmatriz;
				$totalvolumen = $row['total'];
				// este es el encabezado del archivo
				if ($ItemAnt != $itemmatriz)
				 {
				    $ItemAnt = $itemmatriz;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
                    $objPHPExcel->setActiveSheetIndex(4)// comenzar en la primera fila y primera columna	
					->SetCellValue('A'.$fila, $itemmatriz);
					$objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->setBold(true); 
				 }
				
				$colCant = 'D';
				if ($cadAct != $cadAnt)
				{
					$fila++;
					$objPHPExcel->setActiveSheetIndex(4)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
					->setCellValue($colCant.$fila, $totalvolumen);					
                    $cadAnt = $cadAct;					
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(4)			
					->setCellValue($colCant.$fila, $totalvolumen);			
				}
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('MATRIZ_OPER');

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
$objPHPExcel->createSheet(5);
$objPHPExcel->setActiveSheetIndex(5);
    $sql = "SELECT 
  i003t_proyecto.tx_nombre_proyecto AS Proyecto, 
  i022t_grupo_proyecto.tx_nombre_grupo_proyecto AS Gerencia,  
  i016t_dato_matriz.tx_nombre_dato_matriz AS ItemMatriz, 
  SUM(c001t_requerimiento.nu_volumen) AS Total
	FROM 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto, 
	  public.i025t_grupo_matriz, 
	  public.i016t_dato_matriz
	WHERE ".
	  $annio." = extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_dato_matriz = i016t_dato_matriz.co_dato_matriz AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i025t_grupo_matriz.co_grupo_matriz = i016t_dato_matriz.co_grupo_matriz AND
	  i025t_grupo_matriz.tx_nombre_grupo_matriz NOT LIKE 'NO APLICA' AND
	  (i016t_dato_matriz.co_grupo_matriz > 8 AND i016t_dato_matriz.co_grupo_matriz < 11)
	GROUP BY
	  i016t_dato_matriz.tx_nombre_dato_matriz, 
	  i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
	  i003t_proyecto.tx_nombre_proyecto,
	  i005t_proceso.tx_nombre_proceso
	ORDER BY
	  i016t_dato_matriz.tx_nombre_dato_matriz,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i003t_proyecto.tx_nombre_proyecto";

	$result = consultas($sql);
	$fila = 4;
	$cadAnt = '';
	$cadAct = '';
	$ItemAnt = '';
	$fila++;
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);	

	$objPHPExcel->setActiveSheetIndex(5)// 
	->SetCellValue('A'.$fila, 'CAMPO MATRIZ')
	->SetCellValue('B'.$fila, 'GERENCIA')
	->SetCellValue('C'.$fila, 'PROYECTO')
	->SetCellValue('D'.($fila-1), '	TOTAL')
	->setCellValue('D'.$fila, 'Cant.');					
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	$objPHPExcel->getActiveSheet()->getStyle('A'.($fila-1).':FF'.($fila-1))->getFont()->setBold(true);  
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':FF'.$fila)->getFont()->setBold(true);
	$objPHPExcel->getActiveSheet()->getStyle('A'.$fila.':AB'.$fila)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);	
	while($row = pg_fetch_array($result))
			{
				// convierto en variables los datos que vienen de la base de datos
				$gerencia = $row['gerencia'];
				$proyecto = $row['proyecto'];
				$itemmatriz = $row['itemmatriz'];
				$cadAct = $gerencia . ' ' . $proyecto . ' ' . $itemmatriz;
				$totalvolumen = $row['total'];
				// este es el encabezado del archivo
				if ($ItemAnt != $itemmatriz)
				 {
				    $ItemAnt = $itemmatriz;
                    $fila+=2;					
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
					$objPHPExcel->setActiveSheetIndex(5)// comenzar en la primera fila y primera columna
					->SetCellValue('A'.$fila, $itemmatriz);
					$objPHPExcel->getActiveSheet()->getStyle('A'.$fila)->getFont()->setBold(true); 
				 }
				
				$colCant = 'D';
				if ($cadAct != $cadAnt)
				{
					$fila++;
					$objPHPExcel->setActiveSheetIndex(5)
					->setCellValue('B'.$fila, $gerencia)
					->setCellValue('C'.$fila, $proyecto)				
					->setCellValue($colCant.$fila, $totalvolumen);					
                    $cadAnt = $cadAct;					
				} 
				else
				{
					$objPHPExcel->setActiveSheetIndex(5)			
					->setCellValue($colCant.$fila, $totalvolumen);			
				}
			}// fin del while

// Rename sheet
$objPHPExcel->getActiveSheet()->setTitle('MATRIZ_PROY');

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

// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$objPHPExcel->setActiveSheetIndex(0);
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="Matriz de Datos.xls"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output'); 

?>
