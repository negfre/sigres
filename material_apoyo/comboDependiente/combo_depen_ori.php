<?
	header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
	header("Expires: Thu, 1 Jan 1970 00:00:00 GMT"); // Fecha en el pasado 
	
	require_once ("/var/www/html/lib_php/otros/php/bd.php");
	
	//Conexion a la base de datos postgres
	$fecha=date("Y-m-d H:i:s");
	$psql_host="canopus";
	$psql_base="diegof";
	$conepsql = pg_connect("host=$psql_host dbname=$psql_base");

	@$stdlog=fopen("/tmp/combo_depen.sql","a");

	@extract($_GET);

	@fputs($stdlog,"
	\n
	--------------------------------------------------
	--fecha			:$fecha
	--_dc				:$_dc
	--proce			:$proce
	--cons_pais	:$cons_pais
	--cons_dpto	:$cons_dpto
	--cons_ciud	:$cons_ciud
	");


	if(isset($proce))
	{
  	switch($proce)
	  {
			case "pais":
				pais();
			break;

			case "dpto":
				dpto();
			break;

			case "ciud":
				ciud();
			break;

			default:
			break;
		}
	}
	
	exit(1);


function pais()
{
	global $stdlog, $conepsql;
	$consulta="
	select
		codi_pais,
		nomb_pais
	from
		tab_pais;
	";
	@$rconsulta=conspsql($conepsql, $consulta, $stdlog, $rconsulta);
	$i=0;
	$a=array();
	foreach($rconsulta as $valor)
	{
		extract($valor);
    $a[$i]['codi_pais'] = $codi_pais;
    $a[$i]['nomb_pais'] = $nomb_pais;
		$i++;
	}
	$arreglo['resultado']=$a;
	echo json_encode($arreglo);
}


function dpto()
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


function ciud()
{
	global $stdlog, $conepsql, $cons_dpto;
	$consulta="
	select 
		cons_dpto, 
		codi_ciud, 
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
