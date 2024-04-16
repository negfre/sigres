<?php
//include ("validado.php");
include_once ("bd.php");  
// estos es una funcion para cambiar el formato de la fecha que entra y poder mostrarla y/o guardarla en la base de datos
function FechaDerecha($fecha){
    list($dia,$mes,$anio)=explode("-",$fecha);
    return $dia."-".$mes."-".$anio;
}
// establesco las variables q voy a utilizar de las fechas
//$fdes = $_GET["entrada"];
//$fhas = $_GET["salida"];
//$fdes1 = FechaDerecha($_GET["entrada"]);
//$fhas1 = FechaDerecha($_GET["salida"]);

// En esta parte hago lo correspondiente para crear la variable de conexion y conectarme a la bd
//$plink=mysql_connect($host,$user,$passw)or die ('Ha fallado una conexion: '.mysql_error()); 
//selecciono mi base de datos
//mysql_select_db($dbname,$plink) or die(mysql_error());

//Sentencia sql (sin limit) para sacar los datos que voy a grabar en el archivo
//$_pagi_sql = "SELECT * FROM $dbtabler WHERE rmbfrecibido BETWEEN '$fdes1' AND '$fhas1'";
    $sql = "SELECT 
          i022t_grupo_proyecto.co_grupo_proyecto as grupo_proyecto,
          i022t_grupo_proyecto.tx_nombre_grupo_proyecto as nombre_grupo_proyecto,
          i015t_indicador_gestion.co_indicador_gestion as indicador_gestion,
          i015t_indicador_gestion.tx_nombre_indicador_gestion as nombre_indicador_gestion, 
          count(co_requerimiento) as totalservicios,
          (sum(nu_tiempo_efectivo)/60) as totalhh
        FROM 
          public.i009t_subactividad, 
          public.c001t_requerimiento, 
          public.i015t_indicador_gestion, 
          public.i026t_grupo_indicador, 
          public.i003t_proyecto, 
          public.i022t_grupo_proyecto
        WHERE 
          i009t_subactividad.co_indicador_gestion = i015t_indicador_gestion.co_indicador_gestion AND
          c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
          i015t_indicador_gestion.co_grupo_indicador = i026t_grupo_indicador.co_grupo_indicador AND
          i003t_proyecto.co_proyecto = c001t_requerimiento.co_proyecto AND
          i022t_grupo_proyecto.co_grupo_proyecto = i003t_proyecto.co_grupo_proyecto and public.i015t_indicador_gestion.co_indicador_gestion <> 1 and public.i022t_grupo_proyecto.co_grupo_proyecto <> 1
        group by i022t_grupo_proyecto.co_grupo_proyecto,i015t_indicador_gestion.tx_nombre_indicador_gestion,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i015t_indicador_gestion.co_indicador_gestion
        order by i022t_grupo_proyecto.tx_nombre_grupo_proyecto";
//$result = mysql_query($_pagi_sql,$plink) or die ('Ha fallado la conexion a la tabla: '.mysql_error());
$result = consultas($sql);

// verifico que hayan datos para grabar y si no hay mando al usuario a la pagina donde inicia la solicitud de grabar archivo
$numeroRegistros = pg_num_rows($result);
echo "cant reg:".$numeroRegistros;
/*if($numeroRegistros==0)
{
  $mensaje = '<SCRIPT name="accion"> alert("No se encontraron resultados");document.location=("qenu.php")</SCRIPT>';
    echo $mensaje;
}
else
{
  $mensaje = '<SCRIPT name="accion"> alert("No se encontraron resultados");document.location=("qenu.php")</SCRIPT>';
    echo $mensaje;
}*/
/**PHPExcel
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    1.7.2, 2010-01-11*/
/** Error reporting */
error_reporting(E_ALL);

/** PHPExcel */
require_once 'Classes/PHPExcel.php';
include 'Classes/PHPExcel/Writer/Excel2007.php';
require_once ("Classes/PHPExcel/IOFactory.php");

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();
// aqui van los datos en concreto, hay q incluirlos en un ciclo para que se muestren todos los datos


        $objPHPExcel->setActiveSheetIndex(0)// comenzar en la primera fila y primera columna
		->SetCellValue('A2', 'GRUPO_PROYECTO')
		->SetCellValue('B2', 'NOMBRE_GRUPO_PROYECTO')
		->SetCellValue('C2', 'INDICADOR_GESTION')
		->SetCellValue('D2', 'NOMBRE_INDICADOR_GESTION')
		->setCellValue('E2', 'TOTAL SERVICIOS')
		->setCellValue('F2', 'TOTAL HH');
		
		
for ( $i = 5,$pos=1 ; $pos <= $numeroRegistros ; $i++,$pos++)
	{
// hago el ciclo para que salgan los datos de la bd
	while($row = pg_fetch_array($result))
		{
// convierto en variables los datos que vienen de la base de datos
	$grupo_proyecto = $row['grupo_proyecto'];
	$nombre_grupo_proyecto = $row['nombre_grupo_proyecto'];
	$indicador_gestion = $row['indicador_gestion'];
	$nombre_indicador_gestion = $row['nombre_indicador_gestion'];
	$totalservicios = $row['totalservicios'];
	$totalhh = $row['totalhh'];
    // este es el encabezado del archivo


// aqui muestro los datos segun la variable declarada anteriormente
        $objPHPExcel->setActiveSheetIndex(0)
		->setCellValue('A'.$i, $grupo_proyecto)
		->setCellValue('B'.$i, $nombre_grupo_proyecto)
		->setCellValue('C'.$i, $indicador_gestion)
		->setCellValue('D'.$i, $nombre_indicador_gestion)
		->setCellValue('E'.$i, $totalservicios)
		->setCellValue('F'.$i, $totalhh);
		}// fin del while
	}// fin del for interno

// setear que las celdas autoajusten el ancho
//$objPHPExcel->getActiveSheet()->getColumnDimension('A:P')->setAutoSize(true);

// Renombrando la hoja
//$objPHPExcel->getActiveSheet()->setTitle('Reporte');

// Seteo del Encabezado y pie de pagina
//$objDrawing = new PHPExcel_Worksheet_HeaderFooterDrawing();
//$objDrawing->setName('logo');
//$objDrawing->setPath('imagenes/pdvsa_logo.png');
//$objDrawing->setWidth(400);
//$objDrawing->setHeight(95);
//$objPHPExcel->getActiveSheet()->getHeaderFooter()->addImage($objDrawing, PHPExcel_Worksheet_HeaderFooter::IMAGE_HEADER_LEFT);
//$objPHPExcel->getActiveSheet()->getHeaderFooter()->setOddHeader('&C&H AQUI COLOCA LO QUE QUIERAS Q SE VEA EN EL ENCAENCABEZADO' . '&RDia &D Hora &T');
//$objPHPExcel->getActiveSheet()->getHeaderFooter()->setOddFooter('&L&B' . $objPHPExcel->getProperties()->getTitle() . '&C&H AQUI COLOCAS LO Q QUIERAS Q SE VEA EN EL PIE DE PAGINA'  . '&RPag &P de &N');

//seteo del encabezado de la tabla
$styleArray = array(
	'font' => array(
		'bold' => true,
	),
	'alignment' => array(
		'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
	),
	'borders' => array(
		'allborders' => array(
			'style' => PHPExcel_Style_Border::BORDER_THIN,
		),
	),
	'fill' => array(
		'type' => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,
		'rotation' => 90,
		'startcolor' => array(
			'argb' => 'BDC61C',
		),
		'endcolor' => array(
			'argb' => 'ACFFA9',
		),
	),
);

//$objPHPExcel->getActiveSheet()->getStyle('A4:P4')->applyFromArray($styleArray);

// Seteo del tamanio de la pagina
//$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
//$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_LEGAL);
// tambien reducirla para que se vea completa en la hoja tipo LEGAL
//$objPHPExcel->getActiveSheet()->getPageSetup()->setScale(68);

// Decirle a excel que centre la pagina en la vista preliminar
//$objPHPExcel->getActiveSheet()->getPageSetup()->setHorizontalCentered(true);
//$objPHPExcel->getActiveSheet()->getPageSetup()->setVerticalCentered(false);

// Repetir los encabezados de tabla en cada pagina
//$objPHPExcel->getActiveSheet()->getPageSetup()->setRowsToRepeatAtTopByStartAndEnd(1, 4);

// Seteo como activa la primera hoja por si acaso tienen mas de una a guardar
//$objPHPExcel->setActiveSheetIndex(0);

// Redirigir la salida hacia el navegador del cliente (Excel5)
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Resumen_de_Indicadores.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;
?>
