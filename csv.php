<?php

$file = fopen('listaProyectos.csv', 'r');
while (($line = fgetcsv($file)) !== FALSE) {
  //$line is an array of the csv elements
  $arrResult[] = $line;
}
  //print_r($arrResult);
fclose($file);

foreach ($arrResult as $l)
{
  if ( $l[1] == "PGO FLANCO NORANDINO ESTE" )
   print_r($l[0]);
}
/*$arrResult = array();
$arrLines = file( 'listaProyectos.csv' );
foreach( $arrLines as $line ) {
    $arrResult[] = explode( ',', $line );
}
print_r $arrResult;*/



?>
