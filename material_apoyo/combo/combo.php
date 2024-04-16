<?php
  include_once ("../../bd.php");
  //mysql_connect("localhost","root","root") or die ("No se pudo conectar con el servidor");
  //mysql_select_db("test") or die;
  $combo = $_POST['combo'];
  switch ($combo) {
    case 'un':
      cargar_un();
    break;
    case 'gerencia':
      cargar_gerencia();
    break;
    case 'usuario':
     cargar_usuario();
    break;
  }

  function cargar_un(){
    $sql = "SELECT co_unidad_negocio, tx_nombre_unidad_negocio FROM i001t_unidad_negocio ORDER BY tx_nombre_unidad_negocio";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }
  
  function cargar_gerencia(){
    $id_un = $_POST['co_unidad_negocio'];
    $sql = "SELECT co_gerencia, co_unidad_negocio, tx_nombre_gerencia FROM i002t_gerencia WHERE co_unidad_negocio = ".$id_un." ORDER BY tx_nombre_gerencia";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_usuario(){
    $id_gerencia = $_POST['co_gerencia'];
    $sql = "SELECT co_usuario, co_gerencia, (tx_nombre_usuario || ' ' || tx_apellido_usuario) as tx_nombre FROM i004t_usuario WHERE co_gerencia = ".$id_gerencia." ORDER BY tx_nombre_usuario";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }  
?> 