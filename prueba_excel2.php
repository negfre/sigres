<?php
require_once("Classes/PHPExcel.php");
require_once ("Classes/PHPExcel/IOFactory.php");
//require_once("Classes/PHPExcel/Writer/Excel2007.php");
include_once ("bd.php");  
$objPHPExcel = new PHPExcel();

//algunos datos sobre autoría
$objPHPExcel->getProperties()->setCreator("autor");
$objPHPExcel->getProperties()->setLastModifiedBy("autor");
$objPHPExcel->getProperties()->setTitle("titulo del Excel");
$objPHPExcel->getProperties()->setSubject("Asunto");
$objPHPExcel->getProperties()->setDescription("Descripcion");
 
//Trabajamos con la hoja activa principal
$objPHPExcel->setActiveSheetIndex(0);
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
$filas=pg_fetch_array($result);
//iteramos para los resultados
$i=5;
foreach($filas as $row){
    $objPHPExcel->getActiveSheet()->SetCellValue("B".$i, $row["nombre_grupo_proyecto"]);
    $objPHPExcel->getActiveSheet()->SetCellValue("C".$i, $row["nombre_grupo_proyecto"]);
    $objPHPExcel->getActiveSheet()->setCellValue("D".$i, $row["nombre_grupo_proyecto"]);
    $objPHPExcel->getActiveSheet()->setCellValue("E".$i, $row["nombre_grupo_proyecto"]);
    $objPHPExcel->getActiveSheet()->setCellValue("F".$i, $row["nombre_grupo_proyecto"]);
    $i=$i+1;
}
 
//Titulo del libro y seguridad
$objPHPExcel->getActiveSheet()->setTitle('Reporte');
$objPHPExcel->getSecurity()->setLockWindows(true);
$objPHPExcel->getSecurity()->setLockStructure(true);
 
 
// Redirigir la salida hacia el navegador del cliente (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="miarchivo.xls"');
header('Cache-Control: max-age=0');
 
//Creamos el Archivo .xlsx
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output'); 
?>
