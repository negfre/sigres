<?php
	header("Content-Type: text/plain"); 
	
	$start = isset($_POST['start'])?$_POST['start']:0;
	$limit = isset($_POST['limit'])?$_POST['limit']:5;
	
	$data = array(
			array('title'=>'G-Force','year'=>2009,'weekend'=>32.2,'allTime'=>32.2,'img'=>'images/gforce.jpg'),
			array('title'=>'Harry Potter and the Half-Blood Prince','year'=>2009,'weekend'=>30,'allTime'=>222,'img'=>'images/hpotter.jpg'),
			array('title'=>'The Ugly Truth','year'=>2009,'weekend'=>27,'allTime'=>27,'img'=>'images/ugly.jpg'),
			array('title'=>'Orphan','year'=>2009,'weekend'=>12.8,'allTime'=>12.8,'img'=>'images/orphan.jpg'),
			array('title'=>'Ice Age: Dawn of the Dinosaurs ','year'=>2009,'weekend'=>8.2,'allTime'=>171,'img'=>'images/ice.jpg'),
			array('title'=>'Transformers: Revenge of the Fallen','year'=>2009,'weekend'=>8,'allTime'=>379,'img'=>'images/transformers.jpg'),
			array('title'=>'The Hangover','year'=>2009,'weekend'=>6.46,'allTime'=>247,'img'=>'images/hangover.jpg'),
			array('title'=>'The Proposal','year'=>2009,'weekend'=>6.42,'allTime'=>140,'img'=>'images/proposal.jpg'),
			array('title'=>'Public Enemies','year'=>2009,'weekend'=>4.17,'allTime'=>88.1,'img'=>'images/public.jpg'),
			array('title'=>'Brüno','year'=>2009,'weekend'=>2.72,'allTime'=>56.5,'img'=>'images/bruno.jpg')
			
	);
	
	$paging = array(
		'success'=>true,
		'total'=>count($data),
		'data'=> array_splice($data,$start,$limit)
	);
	
	
	echo json_encode($paging);
?>