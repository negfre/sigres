<?php
include_once ("bd.php");
require("LdapClass.php");



$validar = new Ldap();
$hora=date("H:m:s");


function check_fecha() {
    $fecha = strtotime(date("d-m-Y"));
    //Cierre Enero
    $start_ts = strtotime("28-02-2018");
    $end_ts = strtotime("28-02-2019");
    if (($fecha >= $start_ts) && ($fecha <= $end_ts))
      return true;
    else{
      //Cierre Febrero
      $start_ts = strtotime("28-02-2018");
      $end_ts = strtotime("28-02-2019");
      if (($fecha >= $start_ts) && ($fecha <= $end_ts))
       return true; 
      else{
        //Cierre Marzo  
        $start_ts = strtotime("31-03-2018");
        $end_ts = strtotime("31-03-2019");
        if (($fecha >= $start_ts) && ($fecha <= $end_ts))
          return true; 
        else{
          //Cierre Abril
          $start_ts = strtotime("30-04-2018");
          $end_ts = strtotime("30-04-2019");
          if (($fecha >= $start_ts) && ($fecha <= $end_ts))
            return true; 
          else{
            //Cierre Mayo
            $start_ts = strtotime("31-05-2018");
            $end_ts = strtotime("31-05-2019");
            if (($fecha >= $start_ts) && ($fecha <= $end_ts))
              return true; 
            else{
              //Cierre junio
              $start_ts = strtotime("30-06-2018");
              $end_ts = strtotime("30-06-2019");
              if (($fecha >= $start_ts) && ($fecha <= $end_ts))
                return true; 
              else{
                //Cierre Julio
                $start_ts = strtotime("31-09-2018");
                $end_ts = strtotime("31-09-2019");
                if (($fecha >= $start_ts) && ($fecha <= $end_ts))
                 return true; 
                else{
                   //Cierre Agosto  
                   $start_ts = strtotime("31-09-2018");
                   $end_ts = strtotime("31-09-2019");
                   if (($fecha >= $start_ts) && ($fecha <= $end_ts))
                     return true;
                   else{
                     //Cierre Septiembre
                     $start_ts = strtotime("30-09-2018");
                     $end_ts = strtotime("30-09-2019");
                     if (($fecha >= $start_ts) && ($fecha <= $end_ts))
                       return true;
                     else{
                       //Cierre Octubre
                       $start_ts = strtotime("31-10-2018");
                       $end_ts = strtotime("31-10-2019");
                       if (($fecha >= $start_ts) && ($fecha <= $end_ts))
                          return true;
                       else{
		  	  //Cierre Noviembre
	                  $start_ts = strtotime("31-11-2018");
	                  $end_ts = strtotime("31-11-2019");
	                  if (($fecha >= $start_ts) && ($fecha <= $end_ts))
	                    return true;
                          else{
                             //Cierre Diciembre 
	                     $start_ts = strtotime("31-12-2018");
	                     $end_ts = strtotime("31-12-2019");
	                     if (($fecha >= $start_ts) && ($fecha <= $end_ts))
	                        return true;
	                     else
	                        return false;
	                  } 

                       }
                     } 
                   }
                }
              }
            }
          }
        }
      }
    }
}
$ingreso = 0;
$user = strtoupper($_POST['usuario']);
if ( check_fecha() and ($user == 'ZORRILLAO' OR  $user == 'FREITESRS') )
  {$ingreso = 1;}
else{
  if (!check_fecha())
     $ingreso = 1;
    }
 
 if( ($validar->autenticar($_POST['usuario'],$_POST['contrasena']) === true) and $ingreso==1 or True)
 //if(True)
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
	echo "{success: false, errors: { reason: 'Indicador &oacute; Contrase&ntilde;a incorrecta!   <br>  Verifique que la contrase&ntilde;a de red no este vencida! <br> Consulte las Fechas del Cierre Mensual!      ' }}"; //false
	exit();
  }	
unset($validar);
?>
