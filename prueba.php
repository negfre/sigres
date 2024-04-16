<?php
include_once ("bd.php");
require("LdapClass.php");

   $usuario = consultas("Select tx_indicador_analista, co_perfil, tx_nombre_analista, tx_apellido_analista, in_apoyo_subprocesos, co_subproceso, co_analista From i010t_analista where tx_indicador_analista ='ALVAREZFU' and in_activo='1'");
   $Filas = pg_num_rows($usuario);
    $Filas=1;
    if ($Filas >=1)
       	{
    			$row = pg_fetch_row($usuario); 
		print (string)$row[3];
	}
    else
	{
	   print "mal"; 		
        }
 if( ($validar->autenticar("ALVAREZFU","gabi9000") === true) )
  {
   print "Paso ldap";
}
else{
print "No ladp";
}

print "Final";
