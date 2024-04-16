<?php
	header("Content-Type: text/plain"); 
	  include_once ("bd.php");
	    session_name("CGR");
              session_start();
	$start = isset($_POST['start'])?$_POST['start']:0;
	$limit = isset($_POST['limit'])?$_POST['limit']:5;
	
	/*$data = array(
			array('city'=>'Mexico city','visits'=>684,'pageVisits'=>4.11,'averageTime'=>'00:06:53'),
			array('city'=>'La Victoria','visits'=>443,'pageVisits'=>4.39,'averageTime'=>'00:07:28'),
			array('city'=>'Madrid','visits'=>380,'pageVisits'=>3.11,'averageTime'=>'00:05:22'),
			array('city'=>'Providencia','visits'=>204,'pageVisits'=>3.83,'averageTime'=>'00:08:20'),
			array('city'=>'Bogota','visits'=>204,'pageVisits'=>3.26,'averageTime'=>'00:04:57'),
			array('city'=>'Puerto Madero','visits'=>192,'pageVisits'=>3.56,'averageTime'=>'00:05:07'),
			array('city'=>'Monterrey','visits'=>174,'pageVisits'=>3.90,'averageTime'=>'00:06:06'),
			array('city'=>'Barcelona','visits'=>145,'pageVisits'=>3.28,'averageTime'=>'00:05:39'),
			array('city'=>'Caracas','visits'=>132,'pageVisits'=>4.55,'averageTime'=>'00:06:27'),
			array('city'=>'Rosario','visits'=>116,'pageVisits'=>2.44,'averageTime'=>'00:04:30'),
			array('city'=>'Oaxaca','visits'=>108,'pageVisits'=>1.73,'averageTime'=>'00:02:37'),
			array('city'=>'Buenos Aires','visits'=>100,'pageVisits'=>5.43,'averageTime'=>'00:07:37'),
			array('city'=>'Galicia','visits'=>96,'pageVisits'=>1.92,'averageTime'=>'00:04:37'),
			array('city'=>'Guadalajara','visits'=>90,'pageVisits'=>5.92,'averageTime'=>'00:03:37')
	);
	echo $data;*/
    $sql = "SELECT co_requerimiento,co_analista,co_proyecto,co_usuario from c001t_requerimiento where co_analista=".$_SESSION['coAnalista'];
    $rs = consultas($sql);
    while($obj = pg_fetch_object($rs)){
      $arr[] = $obj;
    }
    $paging = array(
            'success'=>true,
            'total'=>count($arr),
            'data'=> array_splice($arr,$start,$limit)
    );    
    echo json_encode($paging);

	
	/*$paging = array(
		'success'=>true,
		'total'=>count($data),
		'data'=> array_splice($data,$start,$limit)
	);
	
	
	echo json_encode($paging);*/
?>
