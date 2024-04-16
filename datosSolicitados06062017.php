<?php
  include ("validado.php");
  include_once ("bd.php");

  session_name("CGR");
  session_start();

  $apoyo=$_SESSION["apoyo"];
  $sProceso=$_SESSION["subproceso"];
  $coAnalista=$_SESSION["coAnalista"];

  $start = isset($_POST['start'])?$_POST['start']:0;
  $limit = isset($_POST['limit'])?$_POST['limit']:50;

  $hoy = date('d/m/Y');
 
	$opcion1="";
	$opcion2="";

  if (isset($_POST['datos']) ) 
    $opcion1 = $_POST['datos'];
  if ( isset($_GET['datos'])  )
    $opcion2 = $_GET['datos'];

  switch ($opcion1) {
    case 'un':
      cargar_un();
    break;
    case 'gerencia':
      cargar_gerencia();
    break;
    case 'usuario':
     cargar_usuario();
    break;
    case 'proyecto':
     cargar_proyecto($hoy);
    break;
    case 'servicio':
     cargar_servicio();
    break;
    case 'allServicio':
     cargar_allservicio();
    break;  
    case 'actividad':
     cargar_actividad();
    break;
    case 'subactividad':
     cargar_subactividad();
    break;   
    case 'medida':
     cargar_medida();
    break; 
    case 'proveedor':
     cargar_proveedor();
    break;
    case 'aplicacion':
     cargar_aplicacion();
    break;
    case 'estatus':
     cargar_estatus();
    break;
    case 'listaRequerimiento':
     cargar_lista_requerimiento();
     break;
    case 'listaUsuarios':
     cargar_lista_usuarios(); 
    break;
    case 'gerenciaUN':
     cargar_gerenciaUN(); 
    break;    
    case 'listaProyecto':
     cargar_lista_proyecto(); 
    break;
    case 'division':
     cargar_division(); 
    break;
    case 'tipoProyecto':
     cargar_tipo_proyecto(); 
    break;
    case 'grupoProyecto':
     cargar_grupo_proyecto(); 
    break;
    case 'listaAnalistas':
     cargar_lista_analistas(); 
    break;
    case 'listaUnidadNegocio':
     cargar_lista_unidad_negocio(); 
    break;
    case 'listaGerenciaNegocio':
     cargar_lista_gerencia_negocio(); 
    break;
    case 'listaDivision':
     cargar_lista_division(); 
    break;
    case 'listaTipoProyecto':
     cargar_lista_tipo_proyecto(); 
    break;
    case 'listaGrupoProyecto':
     cargar_lista_grupo_proyecto(); 
    break;
    case 'listaProceso':
     cargar_lista_proceso(); 
    break;
    case 'listaSubProceso':
     cargar_lista_subproceso(); 
    break;
    case 'proceso':
     cargar_proceso(); 
    break;
    case 'perfil':
      cargar_perfil();
    break;
    case 'subproceso':
      cargar_sub_proceso();
    break;
    case 'analista':
      cargar_analista();
    break;
    case 'listaServicio':
     cargar_lista_servicio(); 
    break;
    case 'listaActividad':
     cargar_lista_actividad(); 
    break;
    case 'listaMedida':
     cargar_lista_medida(); 
    break;
    case 'listaProveedor':
     cargar_lista_proveedor(); 
    break;
    case 'listaAplicacion':
     cargar_lista_aplicacion(); 
    break;
    case 'indicador':
      cargar_indicador();
    break;
    case 'datoMatriz':
      cargar_dato_matriz();
    break;
    case 'listaSubactividad':
     cargar_lista_subactividad(); 
    break;
    case 'listaGrupoMatriz':
     cargar_lista_grupomatriz(); 
    break;  
    case 'listaGrupoIndicador':
     cargar_lista_grupoindicador(); 
    break;    
    case 'listaMatrizDatos':
     cargar_lista_matrizdatos(); 
    break;
    case 'grupoMatriz':
      cargar_grupomatriz();
    break;
    case 'listaProcesoServicio':
      cargar_proceso_servicio();
    break;
    case 'allMedida':
      cargar_allmedida();
    break;
    case 'listaSubactividadMedida':
      cargar_medida_subactividad();
    break;
    case 'lsubactividad':
     cargar_lsubactividad();  
    case 'grupoIndicador':
      cargar_grupoindicador();
    break;
    case 'listaIndicador':
     cargar_lista_indicador(); 
    break;  
    
  }

  switch ($opcion2) {
    case 'resumenIndicadorGestion':
     cargar_resumen_indicador_gestion(); 
    break;     
    case 'resumenIndicadores': 
     cargar_resumen_indicadores(); 
    break;     
    case 'resumenMatriz': 
     cargar_resumen_matriz(); 
    break;     
    case 'lista_reporte_analistas': 
     cargar_lista_reporte_analista(); 
    break;    
  }

  function cargar_un(){
    $sql = "SELECT co_unidad_negocio, tx_nombre_unidad_negocio FROM i001t_unidad_negocio WHERE in_activo='1' ORDER BY tx_nombre_unidad_negocio";
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
    //$id_gerencia = $_POST['co_gerencia'];
    $sql = "SELECT 
        i004t_usuario.co_usuario,( i004t_usuario.tx_nombre_usuario || ' ' || i004t_usuario.tx_apellido_usuario || ' (' || i004t_usuario.tx_indicador_usuario || ' - ' || i001t_unidad_negocio.tx_nombre_unidad_negocio || ')') as tx_nombre
         FROM 
          public.i004t_usuario, 
          public.i002t_gerencia, 
          public.i001t_unidad_negocio
         WHERE 
          i004t_usuario.co_gerencia = i002t_gerencia.co_gerencia AND
          i002t_gerencia.co_unidad_negocio = i001t_unidad_negocio.co_unidad_negocio
         ORDER BY  tx_nombre";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_proyecto($fecha){
    //$id_ger = $_POST['co_gerencia'];
    $sql = "SELECT 
        i003t_proyecto.co_proyecto, 
        (i003t_proyecto.tx_nombre_proyecto || '  (' || i019t_tipo_proyecto.tx_alias_tipo_proyecto || ' - ' || i001t_unidad_negocio.tx_nombre_unidad_negocio || ')') AS tx_nombre
      FROM 
        public.i019t_tipo_proyecto, 
        public.i003t_proyecto, 
        public.i002t_gerencia, 
        public.i001t_unidad_negocio
      WHERE 
        i003t_proyecto.co_gerencia = i002t_gerencia.co_gerencia AND
        i003t_proyecto.co_tipo_proyecto = i019t_tipo_proyecto.co_tipo_proyecto AND
        i002t_gerencia.co_unidad_negocio = i001t_unidad_negocio.co_unidad_negocio   AND '".$fecha."' <= i003t_proyecto.fe_fin_proyecto AND
        i003t_proyecto.in_activo = '1'         
      ORDER BY tx_nombre ASC";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }
  
  function cargar_servicio(){
    if ($_SESSION["apoyo"] == '1')
     $sql = "SELECT co_servicio, tx_nombre_servicio FROM i007t_servicio ORDER BY tx_nombre_servicio";
    else
      $sql = "select co_servicio, tx_nombre_servicio from i007t_servicio where co_servicio IN (
              select i020t_proceso_servicio.co_servicio from i020t_proceso_servicio
              where  i020t_proceso_servicio.co_proceso = (SELECT
              i005t_proceso.co_proceso
              FROM  i006t_subproceso
              INNER JOIN i005t_proceso ON i006t_subproceso.co_proceso = i005t_proceso.co_proceso
              WHERE i006t_subproceso.co_subproceso=".$_SESSION["subproceso"]."))  ORDER BY i007t_servicio.tx_nombre_servicio";
    //echo "sql:".$sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_actividad(){
    $id_servi = $_POST['co_servicio'];
    $sql = "SELECT co_actividad, co_servicio, tx_nombre_actividad FROM i008t_actividad WHERE co_servicio = ".$id_servi." AND in_activo ='1' ORDER BY tx_nombre_actividad";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }
  
  function cargar_subactividad(){
    $id_acti = $_POST['co_actividad'];
    $sql = "SELECT co_subactividad, co_actividad, tx_nombre_subactividad FROM i009t_subactividad WHERE co_actividad = ".$id_acti." AND in_activo ='1'   ORDER BY tx_nombre_subactividad";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }  

  function cargar_medida(){
    $id_subacti = $_POST['co_subactividad'];
    $sql = "select co_unidad_medida, tx_nombre_medida from i014t_unidad_medida
            where i014t_unidad_medida.co_unidad_medida IN (select i021t_medida_subactividad.co_unidad_medida 
            FROM i021t_medida_subactividad
            WHERE i021t_medida_subactividad.co_subactividad = ".$id_subacti.") ORDER BY i014t_unidad_medida.tx_nombre_medida";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }  

  function cargar_proveedor(){
    $sql = "SELECT co_proveedor, tx_nombre_proveedor FROM i011t_proveedor ORDER BY tx_nombre_proveedor";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }
  
  function cargar_aplicacion(){
    //$id_prove = $_POST['co_proveedor'];
    $sql = "SELECT co_aplicacion, (tx_nombre_aplicacion || ' (' || tx_nombre_proveedor || ')') as tx_nombre
            FROM i012t_aplicacion, i011t_proveedor
            WHERE i012t_aplicacion.co_proveedor=i011t_proveedor.co_proveedor ORDER BY tx_nombre";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }    

  function cargar_estatus(){
    $sql = "SELECT co_estatus, tx_nombre_estatus FROM i013t_estatus ORDER BY tx_nombre_estatus";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }
  
  function cargar_lista_requerimiento(){
    $sql = "SELECT 
      c001t_requerimiento.co_requerimiento,
      c001t_requerimiento.tx_obs_requerimiento, 
      c001t_requerimiento.fe_ingreso_requerimiento, 
      c001t_requerimiento.nu_tiempo_efectivo, 
      to_char(c001t_requerimiento.fe_inicio_requerimiento,'dd/mm/yyyy') as fecha_ini, 
      to_char(c001t_requerimiento.fe_fin_requerimiento,'dd/mm/yyyy') as fecha_fin,  
      c001t_requerimiento.nu_volumen, 
      c001t_requerimiento.co_estatus, 
      c001t_requerimiento.co_aplicacion, 
      c001t_requerimiento.co_unidad_medida, 
      c001t_requerimiento.co_subactividad, 
      c001t_requerimiento.co_analista, 
      c001t_requerimiento.co_proyecto, 
      c001t_requerimiento.co_usuario, 
      c001t_requerimiento.co_requerimiento, 
      c001t_requerimiento.in_estado, 
      i013t_estatus.tx_nombre_estatus, 
      i007t_servicio.co_servicio, 
      i003t_proyecto.co_proyecto, 
      (i004t_usuario.tx_nombre_usuario || ' ' || i004t_usuario.tx_apellido_usuario) as tx_nombre, 
      i009t_subactividad.tx_nombre_subactividad, 
      i003t_proyecto.tx_nombre_proyecto, 
      i014t_unidad_medida.tx_nombre_medida, 
      i001t_unidad_negocio.tx_nombre_unidad_negocio, 
      i002t_gerencia.co_gerencia, 
      i009t_subactividad.co_subactividad, 
      i009t_subactividad.co_actividad
    FROM 
      public.c001t_requerimiento, 
      public.i013t_estatus, 
      public.i007t_servicio, 
      public.i008t_actividad, 
      public.i009t_subactividad, 
      public.i003t_proyecto, 
      public.i002t_gerencia, 
      public.i001t_unidad_negocio, 
      public.i004t_usuario, 
      public.i014t_unidad_medida
    WHERE 
      c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
      c001t_requerimiento.co_usuario = i004t_usuario.co_usuario AND
      c001t_requerimiento.co_unidad_medida = i014t_unidad_medida.co_unidad_medida AND
      i013t_estatus.co_estatus = c001t_requerimiento.co_estatus AND
      i007t_servicio.co_servicio = i008t_actividad.co_servicio AND
      i008t_actividad.co_actividad = i009t_subactividad.co_actividad AND
      i003t_proyecto.co_gerencia = i002t_gerencia.co_gerencia AND
      i003t_proyecto.co_proyecto = c001t_requerimiento.co_proyecto AND
      i002t_gerencia.co_unidad_negocio = i001t_unidad_negocio.co_unidad_negocio AND 
      c001t_requerimiento.in_estado='1' AND
      c001t_requerimiento.co_analista=".$_SESSION['coAnalista']." ORDER BY co_requerimiento DESC";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
   $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
    //echo '{"success":true, "data":'.json_encode($arr).'}';
  }
    
  function cargar_lista_usuarios(){
    $sql = "SELECT 
      i002t_gerencia.co_gerencia, 
      i002t_gerencia.tx_nombre_gerencia, 
      i001t_unidad_negocio.tx_nombre_unidad_negocio, 
      i004t_usuario.co_usuario, 
      i004t_usuario.co_gerencia, 
      i004t_usuario.tx_indicador_usuario, 
      i004t_usuario.tx_nombre_usuario, 
      i004t_usuario.tx_apellido_usuario, 
      i004t_usuario.tx_cargo_usuario, 
      i004t_usuario.tx_telefono_usuario, 
      i004t_usuario.tx_ubicacion_usuario, 
      i004t_usuario.in_activo
    FROM 
      public.i004t_usuario, 
      public.i002t_gerencia, 
      public.i001t_unidad_negocio
    WHERE 
      i004t_usuario.co_gerencia = i002t_gerencia.co_gerencia AND
      i001t_unidad_negocio.co_unidad_negocio = i002t_gerencia.co_unidad_negocio AND
      i004t_usuario.in_activo='1'
    ORDER BY tx_indicador_usuario";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
    //echo '{"success":true, "data":'.json_encode($arr).'}';
  }    
 
   function cargar_gerenciaUN(){
    $sql = "SELECT 
        (i002t_gerencia.tx_nombre_gerencia || ' (' || i001t_unidad_negocio.tx_nombre_unidad_negocio  || ')') as tx_nombre, 
        i002t_gerencia.co_gerencia
      FROM 
        public.i002t_gerencia, 
        public.i001t_unidad_negocio
      WHERE 
        i002t_gerencia.co_unidad_negocio = i001t_unidad_negocio.co_unidad_negocio AND 
        i002t_gerencia.in_activo='1'
      ORDER BY tx_nombre_gerencia";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }   

  function cargar_lista_proyecto(){
    $sql = "SELECT 
        i001t_unidad_negocio.tx_nombre_unidad_negocio, 
        i003t_proyecto.co_gerencia, 
        i002t_gerencia.tx_nombre_gerencia, 
        i022t_grupo_proyecto.tx_nombre_grupo_proyecto, 
        i003t_proyecto.co_grupo_proyecto, 
        i003t_proyecto.tx_obs_proyecto,
        to_char(i003t_proyecto.fe_inicio_proyecto,'dd/mm/yyyy') as fecha_ini, 
        to_char(i003t_proyecto.fe_fin_proyecto,'dd/mm/yyyy') as fecha_fin,          
        i003t_proyecto.in_activo, 
        i003t_proyecto.tx_alias_proyecto, 
        i003t_proyecto.tx_nombre_proyecto, 
        i003t_proyecto.co_division, 
        i003t_proyecto.co_tipo_proyecto, 
        i003t_proyecto.co_proyecto, 
        i017t_division.tx_nombre_division, 
        i019t_tipo_proyecto.tx_nombre_tipo_proyecto,
        i001t_unidad_negocio.co_unidad_negocio
      FROM 
        i003t_proyecto, 
        i002t_gerencia, 
        i001t_unidad_negocio, 
        i017t_division, 
        i019t_tipo_proyecto, 
        i022t_grupo_proyecto
      WHERE 
        i003t_proyecto.co_gerencia = i002t_gerencia.co_gerencia AND
        i002t_gerencia.co_unidad_negocio = i001t_unidad_negocio.co_unidad_negocio AND
        i017t_division.co_division = i003t_proyecto.co_division AND
        i019t_tipo_proyecto.co_tipo_proyecto = i003t_proyecto.co_tipo_proyecto AND
        i022t_grupo_proyecto.co_grupo_proyecto = i003t_proyecto.co_grupo_proyecto
      ORDER BY tx_nombre_proyecto";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
    //echo '{"success":true, "data":'.json_encode($arr).'}';
  } 


  function cargar_division(){
    $sql = "SELECT 
        i017t_division.co_division, 
        i017t_division.tx_nombre_division
      FROM 
         i017t_division
      WHERE in_activo='1'
      ORDER BY tx_nombre_division";

    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_tipo_proyecto(){
    $id_un = $_POST['co_unidad_negocio'];
    $sql = "SELECT 
        i019t_tipo_proyecto.co_tipo_proyecto, 
        i019t_tipo_proyecto.tx_nombre_tipo_proyecto
      FROM 
        i019t_tipo_proyecto
      WHERE co_unidad_negocio=$id_un AND in_activo='1'
      ORDER BY tx_nombre_tipo_proyecto";
      
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_grupo_proyecto(){
    $sql = "SELECT 
        i022t_grupo_proyecto.co_grupo_proyecto, 
        i022t_grupo_proyecto.tx_nombre_grupo_proyecto
      FROM 
        public.i022t_grupo_proyecto
      WHERE in_activo='1'
      ORDER BY tx_nombre_grupo_proyecto";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }  

  function cargar_lista_analistas(){
    $sql = "SELECT
        w.co_analista,
        w.tx_nombre_analista,
        w.tx_apellido_analista,
        (w.tx_nombre_analista || ' ' || w.tx_apellido_analista) as tx_nombre, 
        w.tx_indicador_analista,  
        w.tx_cedula_analista,
        w.co_supervisor,
        to_char(w.fe_nacimiento_analista,'dd/mm/yyyy') as fecha_nacimiento, 
        (i010t_analista.tx_nombre_analista || ' ' || i010t_analista.tx_apellido_analista) as tx_supervisor,  
        w.tx_extension_analista, 
        w.tx_celular_analista, 
        w.tx_oficina_analista,
        w.in_apoyo_subprocesos,
        CASE WHEN w.in_apoyo_subprocesos='1' THEN 'Si'
             WHEN w.in_apoyo_subprocesos='0' THEN 'No'
        END as apoyo,
        CASE WHEN w.in_activo='1' THEN 'Activo'
             WHEN w.in_activo='0' THEN 'Inactivo'
        END as activo,
        w.co_subproceso,
        i006t_subproceso.tx_nombre_subproceso,
        w.co_perfil,
        i018t_perfil.tx_nombre_perfil
        
      FROM 
        public.i010t_analista, 
        public.i010t_analista w, 
        public.i006t_subproceso,
        public.i018t_perfil
      WHERE 
        w.co_supervisor = i010t_analista.co_analista AND
        w.co_subproceso = i006t_subproceso.co_subproceso AND
        w.co_perfil = i018t_perfil.co_perfil
        AND w.co_analista<>42
        AND w.co_analista<>43
      ORDER BY tx_nombre";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
    //echo '{"success":true, "data":'.json_encode($arr).'}';
  } 


  function cargar_resumen_indicador_gestion(){
	 $annio = $_GET['anio']; 
    $sql = "SELECT 
          i022t_grupo_proyecto.co_grupo_proyecto,
          i022t_grupo_proyecto.tx_nombre_grupo_proyecto,
          i015t_indicador_gestion.co_indicador_gestion,
          i015t_indicador_gestion.tx_nombre_indicador_gestion, 
          count(co_requerimiento) as totalservicios,
          (sum(nu_tiempo_efectivo)/60) as totalHH
        FROM 
          public.i009t_subactividad, 
          public.c001t_requerimiento, 
          public.i015t_indicador_gestion, 
          public.i026t_grupo_indicador, 
          public.i003t_proyecto, 
          public.i022t_grupo_proyecto
        WHERE ". 
	       $annio."= extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND 
          i009t_subactividad.co_indicador_gestion = i015t_indicador_gestion.co_indicador_gestion AND
          c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
          i015t_indicador_gestion.co_grupo_indicador = i026t_grupo_indicador.co_grupo_indicador AND
          i003t_proyecto.co_proyecto = c001t_requerimiento.co_proyecto AND
          i022t_grupo_proyecto.co_grupo_proyecto = i003t_proyecto.co_grupo_proyecto and public.i015t_indicador_gestion.co_indicador_gestion <> 1 and public.i022t_grupo_proyecto.co_grupo_proyecto <> 1
        group by i022t_grupo_proyecto.co_grupo_proyecto,i015t_indicador_gestion.tx_nombre_indicador_gestion,i022t_grupo_proyecto.tx_nombre_grupo_proyecto,i015t_indicador_gestion.co_indicador_gestion
        order by i022t_grupo_proyecto.tx_nombre_grupo_proyecto";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> $arr
    );    
    echo json_encode($paging);    
  }
    
    
  function cargar_lista_unidad_negocio(){
    $sql = "SELECT
      i001t_unidad_negocio.co_unidad_negocio,
      i001t_unidad_negocio.tx_nombre_unidad_negocio,
      i001t_unidad_negocio.tx_obs_unidad_negocio
      FROM 
        i001t_unidad_negocio
      ORDER BY tx_nombre_unidad_negocio";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  }      

  function cargar_lista_gerencia_negocio(){
    $sql = "SELECT
      i002t_gerencia.co_gerencia,
      i002t_gerencia.co_unidad_negocio,
      i002t_gerencia.tx_nombre_gerencia,
      i002t_gerencia.tx_obs_gerencia,
      i001t_unidad_negocio.tx_nombre_unidad_negocio
      FROM 
        i002t_gerencia, i001t_unidad_negocio
      WHERE
        i002t_gerencia.co_unidad_negocio=i001t_unidad_negocio.co_unidad_negocio
      ORDER BY tx_nombre_unidad_negocio";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  }    

  function cargar_lista_division(){
    $sql = "SELECT
      i017t_division.co_division,
      i017t_division.tx_nombre_division,
      i017t_division.tx_obs_division
      FROM 
        i017t_division
      ORDER BY tx_nombre_division";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 

  function cargar_lista_tipo_proyecto(){
    $sql = "SELECT
      i019t_tipo_proyecto.co_tipo_proyecto,
      i019t_tipo_proyecto.tx_nombre_tipo_proyecto,
      i019t_tipo_proyecto.co_unidad_negocio,
      i019t_tipo_proyecto.tx_alias_tipo_proyecto,
      i019t_tipo_proyecto.tx_obs_tipo_proyecto,
      i001t_unidad_negocio.tx_nombre_unidad_negocio
      FROM 
        i019t_tipo_proyecto,i001t_unidad_negocio
      WHERE
        i019t_tipo_proyecto.co_unidad_negocio=i001t_unidad_negocio.co_unidad_negocio
      ORDER BY tx_nombre_tipo_proyecto,i019t_tipo_proyecto.co_unidad_negocio";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 

  function cargar_lista_grupo_proyecto(){
    $sql = "SELECT
      i022t_grupo_proyecto.co_grupo_proyecto,
      i022t_grupo_proyecto.tx_nombre_grupo_proyecto,
      i022t_grupo_proyecto.tx_obs_grupo_proyecto
      FROM 
        i022t_grupo_proyecto
      ORDER BY tx_nombre_grupo_proyecto";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 


  function cargar_lista_proceso(){
    $sql = "SELECT
      i005t_proceso.co_proceso,
      i005t_proceso.tx_nombre_proceso,
      i005t_proceso.tx_obs_proceso
      FROM 
        i005t_proceso
      ORDER BY tx_nombre_proceso";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 

  function cargar_lista_subproceso(){
    $sql = "SELECT
      i006t_subproceso.co_subproceso,
      i006t_subproceso.co_proceso,
      i006t_subproceso.tx_nombre_subproceso,
      i006t_subproceso.tx_obs_subproceso,
      i005t_proceso.tx_nombre_proceso
      FROM 
        i006t_subproceso, i005t_proceso
      WHERE
        i006t_subproceso.co_proceso=i005t_proceso.co_proceso
      ORDER BY i006t_subproceso.co_proceso";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  }  


  function cargar_proceso(){
    $sql = "SELECT co_proceso, tx_nombre_proceso FROM i005t_proceso WHERE in_activo='1' ORDER BY tx_nombre_proceso";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_perfil(){
    $sql = "SELECT co_perfil, tx_nombre_perfil FROM i018t_perfil WHERE in_activo='1' ORDER BY tx_nombre_perfil";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_sub_proceso(){
    $sql = "SELECT co_subproceso, (tx_nombre_subproceso || ' (' || tx_nombre_proceso || ')') as tx_nombre_subproc FROM i006t_subproceso, i005t_proceso WHERE i006t_subproceso.co_proceso=i005t_proceso.co_proceso AND i006t_subproceso.in_activo='1' ORDER BY tx_nombre_subproc";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_analista(){
    $sql = "SELECT co_analista, (tx_nombre_analista || ' ' || tx_apellido_analista ) as tx_nombre_supervisor FROM i010t_analista WHERE i010t_analista.in_activo='1' ORDER BY tx_nombre_supervisor";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }


  function cargar_lista_servicio(){
    $sql = "SELECT
      i007t_servicio.co_servicio,
      i007t_servicio.tx_nombre_servicio,
      i007t_servicio.tx_obs_servicio
      FROM 
        i007t_servicio
      ORDER BY tx_nombre_servicio";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 

  function cargar_lista_actividad(){
    $sql = "SELECT
      i008t_actividad.co_actividad,
      i008t_actividad.co_servicio,
      i008t_actividad.tx_nombre_actividad,
      i008t_actividad.tx_obs_actividad,
      i007t_servicio.tx_nombre_servicio
      FROM 
        i008t_actividad, i007t_servicio
      WHERE
        i008t_actividad.co_servicio=i007t_servicio.co_servicio
      ORDER BY tx_nombre_actividad";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  }


  function cargar_lista_medida(){
    $sql = "SELECT
      i014t_unidad_medida.co_unidad_medida,
      i014t_unidad_medida.tx_nombre_medida
      FROM 
        i014t_unidad_medida
      ORDER BY tx_nombre_medida";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 


  function cargar_lista_proveedor(){
    $sql = "SELECT
      i011t_proveedor.co_proveedor,
      i011t_proveedor.tx_nombre_proveedor,
      i011t_proveedor.tx_contacto_proveedor,
      i011t_proveedor.tx_telefono_proveedor,
      i011t_proveedor.tx_obs_proveedor
      FROM 
        i011t_proveedor
      ORDER BY tx_nombre_proveedor";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 

  function cargar_lista_aplicacion(){
    $sql = "SELECT
      i012t_aplicacion.co_aplicacion,
      i012t_aplicacion.co_proveedor,
      i012t_aplicacion.tx_nombre_aplicacion,      
      i011t_proveedor.tx_nombre_proveedor,
      i012t_aplicacion.tx_obs_aplicacion
      FROM 
        i012t_aplicacion,i011t_proveedor
      WHERE
         i012t_aplicacion.co_proveedor=i011t_proveedor.co_proveedor
      ORDER BY tx_nombre_proveedor";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 

  function cargar_indicador(){
    $sql = "SELECT co_indicador_gestion, tx_nombre_indicador_gestion FROM i015t_indicador_gestion WHERE i015t_indicador_gestion.in_activo='1' ORDER BY tx_nombre_indicador_gestion";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }


  function cargar_dato_matriz(){
    $sql = "SELECT co_dato_matriz, tx_nombre_dato_matriz FROM i016t_dato_matriz WHERE i016t_dato_matriz.in_activo='1' ORDER BY tx_nombre_dato_matriz";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_lista_subactividad(){
    $sql = "SELECT 
      i009t_subactividad.co_actividad,
      i008t_actividad.co_servicio,
      i009t_subactividad.co_dato_matriz, 
      i009t_subactividad.co_indicador_gestion, 
      i009t_subactividad.co_subactividad, 
      i009t_subactividad.tx_nombre_subactividad, 
      i009t_subactividad.tx_obs_subactividad, 
      CASE WHEN i009t_subactividad.in_activo='1' THEN 'Activo'
           WHEN i009t_subactividad.in_activo='0' THEN 'Inactivo'
      END as activo,
      i008t_actividad.tx_nombre_actividad, 
      i007t_servicio.tx_nombre_servicio, 
      i016t_dato_matriz.tx_nombre_dato_matriz, 
      i015t_indicador_gestion.tx_nombre_indicador_gestion
    FROM 
      public.i009t_subactividad, 
      public.i007t_servicio, 
      public.i008t_actividad, 
      public.i015t_indicador_gestion, 
      public.i016t_dato_matriz
    WHERE 
      i009t_subactividad.co_actividad = i008t_actividad.co_actividad AND
      i009t_subactividad.co_dato_matriz = i016t_dato_matriz.co_dato_matriz AND
      i009t_subactividad.co_indicador_gestion = i015t_indicador_gestion.co_indicador_gestion AND
      i008t_actividad.co_servicio = i007t_servicio.co_servicio
    ORDER BY
       i009t_subactividad.tx_nombre_subactividad";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  }

  function cargar_lista_grupomatriz(){
    $sql = "SELECT
      i025t_grupo_matriz.co_grupo_matriz,
      i025t_grupo_matriz.tx_nombre_grupo_matriz,
      i025t_grupo_matriz.tx_obs_grupo_matriz
      FROM 
        i025t_grupo_matriz
      ORDER BY tx_nombre_grupo_matriz";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 

  function cargar_lista_grupoindicador(){
    $sql = "SELECT
      i026t_grupo_indicador.co_grupo_indicador,
      i026t_grupo_indicador.tx_nombre_grupo_indicador,
      i026t_grupo_indicador.tx_obs_grupo_indicador
      FROM 
        i026t_grupo_indicador
      ORDER BY tx_nombre_grupo_indicador";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  } 

  function cargar_lista_matrizdatos(){
    $sql = "SELECT
      i016t_dato_matriz.co_dato_matriz,
      i016t_dato_matriz.co_grupo_matriz,
      i016t_dato_matriz.tx_nombre_dato_matriz,
      i016t_dato_matriz.tx_obs_dato_matriz,
      i025t_grupo_matriz.tx_nombre_grupo_matriz
      FROM 
        i016t_dato_matriz, i025t_grupo_matriz
      WHERE
        i016t_dato_matriz.co_grupo_matriz=i025t_grupo_matriz.co_grupo_matriz
      ORDER BY tx_nombre_dato_matriz";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  }

  function cargar_grupomatriz(){
    $sql = "SELECT co_grupo_matriz, tx_nombre_grupo_matriz FROM i025t_grupo_matriz WHERE in_activo='1' ORDER BY tx_nombre_grupo_matriz";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }


  function cargar_allservicio(){
    $sql = "SELECT co_servicio,tx_nombre_servicio FROM i007t_servicio WHERE in_activo='1' ORDER BY tx_nombre_servicio";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_proceso_servicio(){
    $id_proceso=$_POST['co_proceso'];
    $sql = "SELECT co_proceso_servicio,co_servicio,co_proceso FROM i020t_proceso_servicio WHERE co_proceso=".$id_proceso." AND in_activo='1'";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }


  function cargar_allmedida(){
    $sql = "SELECT co_unidad_medida,tx_nombre_medida FROM i014t_unidad_medida WHERE in_activo='1' ORDER BY tx_nombre_medida";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_medida_subactividad(){
    $id_subactividad=$_POST['co_subactividad'];
    $sql = "SELECT co_medida_subactividad,co_unidad_medida,co_subactividad FROM i021t_medida_subactividad WHERE co_subactividad=".$id_subactividad." AND in_activo='1'";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_lsubactividad(){
    $sql = "SELECT co_subactividad, tx_nombre_subactividad FROM i009t_subactividad WHERE in_activo='1' ORDER BY tx_nombre_subactividad";
    //echo $sql;
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  } 

  function cargar_lista_indicador(){
    $sql = "SELECT
      i015t_indicador_gestion.co_indicador_gestion,
      i015t_indicador_gestion.co_grupo_indicador,
      i015t_indicador_gestion.tx_nombre_indicador_gestion,
      i015t_indicador_gestion.tx_obs_indicador_gestion,
      i026t_grupo_indicador.tx_nombre_grupo_indicador
      FROM 
        i015t_indicador_gestion, i026t_grupo_indicador
      WHERE
        i015t_indicador_gestion.co_grupo_indicador=i026t_grupo_indicador.co_grupo_indicador
      ORDER BY tx_nombre_indicador_gestion";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$_POST['start'],$_POST['limit'])
    );    
    echo json_encode($paging);
  }

  function cargar_grupoindicador(){
    $sql = "SELECT co_grupo_indicador, tx_nombre_grupo_indicador FROM i026t_grupo_indicador WHERE in_activo='1' ORDER BY tx_nombre_grupo_indicador";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "datos":'.json_encode($arr).'}';
  }

  function cargar_resumen_indicadores(){
	$annio = $_GET['anio'];  
    $sql = "SELECT 
          i015t_indicador_gestion.tx_nombre_indicador_gestion as indicador,
          count(co_requerimiento)  as servicios,
          to_char((sum(nu_tiempo_efectivo)/60), '99999.99') as hh
        FROM 
          public.i009t_subactividad, 
          public.c001t_requerimiento, 
          public.i015t_indicador_gestion, 
          public.i026t_grupo_indicador, 
          public.i003t_proyecto, 
          public.i022t_grupo_proyecto
        WHERE ". 
	      $annio."= extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	      i009t_subactividad.co_indicador_gestion = i015t_indicador_gestion.co_indicador_gestion AND
          c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
          i015t_indicador_gestion.co_grupo_indicador = i026t_grupo_indicador.co_grupo_indicador AND
          i003t_proyecto.co_proyecto = c001t_requerimiento.co_proyecto AND
          i022t_grupo_proyecto.co_grupo_proyecto = i003t_proyecto.co_grupo_proyecto AND 
          public.i015t_indicador_gestion.co_indicador_gestion <> 1 AND 
          public.i022t_grupo_proyecto.co_grupo_proyecto <> 1 AND
	  c001t_requerimiento.co_estatus = 2
        group by 
                 i015t_indicador_gestion.tx_nombre_indicador_gestion
        order by i015t_indicador_gestion.tx_nombre_indicador_gestion";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "data":'.json_encode($arr).'}';
  }

  function cargar_resumen_matriz(){
	$annio = $_GET['anio'];  
    $sql = "SELECT 
  i016t_dato_matriz.tx_nombre_dato_matriz AS Item_Matriz, 
  SUM(c001t_requerimiento.nu_volumen) AS Volumen
	FROM 
	  public.i003t_proyecto, 
	  public.c001t_requerimiento, 
	  public.i009t_subactividad, 
	  public.i005t_proceso, 
	  public.i010t_analista, 
	  public.i006t_subproceso, 
	  public.i022t_grupo_proyecto, 
	  public.i025t_grupo_matriz, 
	  public.i016t_dato_matriz
    WHERE ". 
	      $annio."= extract(year from c001t_requerimiento.fe_fin_requerimiento)::int AND
	  i003t_proyecto.co_grupo_proyecto = i022t_grupo_proyecto.co_grupo_proyecto AND
	  c001t_requerimiento.co_proyecto = i003t_proyecto.co_proyecto AND
	  c001t_requerimiento.co_subactividad = i009t_subactividad.co_subactividad AND
	  i009t_subactividad.co_dato_matriz = i016t_dato_matriz.co_dato_matriz AND
	  i010t_analista.co_analista = c001t_requerimiento.co_analista AND
	  i010t_analista.co_subproceso = i006t_subproceso.co_subproceso AND
	  i006t_subproceso.co_proceso = i005t_proceso.co_proceso AND
	  i025t_grupo_matriz.co_grupo_matriz = i016t_dato_matriz.co_grupo_matriz AND
	  i025t_grupo_matriz.tx_nombre_grupo_matriz NOT LIKE 'NO APLICA'
	GROUP BY
	  i016t_dato_matriz.tx_nombre_dato_matriz
	ORDER BY
	  i016t_dato_matriz.tx_nombre_dato_matriz";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "data":'.json_encode($arr).'}';
  }  

  function cargar_lista_reporte_analista(){
	//$coAnalista
    $sql = "WITH RECURSIVE Supervisados (co_analista, tx_nombre_analista, tx_apellido_analista, co_supervisor) AS
			(
			 SELECT co_analista, tx_nombre_analista, tx_apellido_analista, co_supervisor
				FROM i010t_analista
				WHERE co_analista = '".$_SESSION['coAnalista']."'

			 UNION ALL
			 
			 SELECT e.co_analista, e.tx_nombre_analista, e.tx_apellido_analista, e.co_supervisor
				FROM i010t_analista AS e JOIN Supervisados AS m
					ON e.co_supervisor = m.co_analista
			)
			SELECT co_analista, (tx_nombre_analista || ' ' || tx_apellido_analista) as nombre_analista FROM Supervisados";
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    echo '{"success":true, "data":'.json_encode($arr).'}';
  }  

//*******
?> 
