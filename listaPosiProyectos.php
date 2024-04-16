<?php
$arrResult = array();
$arrLines = file( 'listaProyectos.csv' );
foreach( $arrLines as $line ) {
    $arrResult[] = explode( ',', $line );
}

/*filaProyecto($nombre)
{
  for ($arrResult as $valor){
	if ($valor[1] == $nombre){
	   return(int($valor[0]));
	   }
   return(0);
  }
}*/

?>
