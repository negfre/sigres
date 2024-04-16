<?php
class Ldap
{
var $servidor;
var $link;

//********************************************************************************

function Ldap($servidor='PDVSA.COM')
 {
 $this->servidor=$servidor;
 }



//********************************************************************************

function autenticar($usuario,$contrasena)
 {
 if($this->conectar())
  {
  $r=$this->validar($usuario,$contrasena);
  $this->desconectar();
  if($r === false) return false;
  else return true;
  }
  else
   return -1;
 }




//********************************************************************************

function validar($usuario,$contrasena)
 {
 if($this->link !== false)
  return @ldap_bind($this->link,$usuario."@".$this->servidor,$contrasena);
  else
   return false;
 }



//********************************************************************************

function conectar()
 {
 $ds = @ldap_connect($this->servidor);
 if($ds !== false)
  {
  $this->link = $ds;
  return true;
  }
  else
   {
   $this->link = false;
   return false;
   }
 }
 


//********************************************************************************

function desconectar()
 {
 @ldap_close($this->link);
 }
}
?>