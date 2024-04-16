<?php
include_once ("bd.php");
require("LdapClass.php");



$validar = new Ldap();
$hora=date("H:m:s");
$dia=date("l");
//and ($_POST['usuario'] == 'LOPONTEY' OR $_POST['usuario'] == 'BERRAG' OR $_POST['usuario'] == 'RODRIGUEJGRY' OR $_POST['usuario'] == 'ALVAREZFU')
if( $validar->autenticar($_POST['usuario'],$_POST['contrasena']) === true)// and ($_POST['usuario'] == 'GUEVARAEW' OR $_POST['usuario'] == 'BERRAG' OR $_POST['usuario'] == 'ALVAREZFU' OR $_POST['usuario'] == 'ALVAREZFU')) //$validar->autenticar($_POST['usuario'],$_POST['contrasena']) ===
  {

   $usuario = consultas("Select tx_indicador_analista, co_perfil, tx_nombre_analista, tx_apellido_analista, in_apoyo_subprocesos, co_subproceso, co_analista From i010t_analista where tx_indicador_analista ='" . strtoupper($_POST['usuario']) . "' and in_activo='1'");
   $Filas = pg_num_rows($usuario);
    $Filas=1;
    if ($Filas >=1)
       	{
	   session_name("CGR");
           session_start();
           $row = pg_fetch_row($usuario); 
           $_SESSION["valido"] = 'SI';
           $_SESSION["analista"] = (string)$row[2].' '.(string)$row[3];
           $_SESSION["nivel"] = (string)$row[1];
	   $_SESSION["indicador"] = (string)$row[0];
	   $_SESSION["apoyo"] = (string)$row[4];
	   $_SESSION["subproceso"] = (string)$row[5];
	   $_SESSION["coAnalista"] = (string)$row[6];

	       pg_free_result($usuario);
           if (isset( $_SESSION["valido"], $_SESSION["analista"], $_SESSION["nivel"], $_SESSION["indicador"]))
              {
                echo '{success: true}';
                exit();
              }
           else
              {
	         echo "{success: false, errors: { reason: 'Error al crear la sesi&oacute;n!    ' }}";//false
                 exit();
              }
        }
     else
       {             
	echo "{success: false, errors: { reason: 'Usuario no autirizado!    ' }}";//false
        exit();
       }
  }
else 
  {
	echo "{success: false, errors: { reason: 'Indicador &oacute; Contrase&ntilde;a incorrecta!   <br>  Verifique que la contrase&ntilde;a de red no este vencida.    ' }}"; //false
	exit();
  }	
unset($validar);
?>
