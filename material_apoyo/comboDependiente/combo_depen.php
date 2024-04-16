<?
	require_once ("bd.php");
	
	//Conexion a la base de datos postgres
	@extract($_GET);

	if(isset($proce))
	{
  	switch($proce)
	  {
			case "un":
				un();
			break;

			case "gerencia":
				gerencia();
			break;

			case "usuario":
				usuario();
			break;

			default:
			break;
		}
	}
	
	exit(1);


function un()
{
	$consulta="
	select
		co_unidad_negocio,
		tx_nombre_unidad_negocio
	from
		i001t_unidad_negocio;
	";
	$i=0;
	$rconsulta = consultas($consulta)
	$a=array();
	foreach($rconsulta as $valor)
	{
		extract($valor);
        $a[$i]['cod_un'] = $co_unidad_negocio;
        $a[$i]['nomb_un'] = $tx_nombre_unidad_negocio;
		$i++;
	}
	$arreglo['resultado']=$a;
	echo json_encode($arreglo);
}


function gerencia()
{
	global $stdlog, $conepsql, $cons_pais;
	$consulta="
	select
		cons_pais,
		codi_dpto,
		nomb_dpto
	from
		tab_dpto
	where
		cons_pais='$cons_pais';
	";
	@$rconsulta=conspsql($conepsql, $consulta, $stdlog, $rconsulta);
	$i=0;
	$a=array();
	foreach($rconsulta as $valor)
	{
		extract($valor);
    $a[$i]['cons_pais'] = $cons_pais;
    $a[$i]['codi_dpto'] = $codi_dpto;
    $a[$i]['nomb_dpto'] = $nomb_dpto;
		$i++;
	}
	$arreglo['resultado']=$a;
	echo json_encode($arreglo);
}


function usuario()
{
	$consulta="
	select 
		co_usuario, 
		co_gerencia, 
		trim(split_part(nomb_ciud,'(',1)) as nomb_ciud 
	from 
		tab_ciud
	where
		cons_dpto='$cons_dpto';
	";
	@$rconsulta=conspsql($conepsql, $consulta, $stdlog, $rconsulta);
	$i=0;
	$a=array();
	foreach($rconsulta as $valor)
	{
		extract($valor);
    $a[$i]['cons_dpto'] = $cons_dpto;
    $a[$i]['codi_ciud'] = $codi_ciud;
    $a[$i]['nomb_ciud'] = $nomb_ciud;
		$i++;
	}
	$arreglo['resultado']=$a;
	echo json_encode($arreglo);

}

?>
