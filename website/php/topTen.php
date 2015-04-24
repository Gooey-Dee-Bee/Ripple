<?php

	require_once(__DIR__."/databases.php");


	$query = "SELECT song_id, count(song_id) as c
				FROM drops
				GROUP BY song_id
				ORDER BY c desc
				limit 10";

	$result = getInfoFromDatabase($query);

	$rows = array();

	$i = 0;

	foreach($result as $r){
		$songID = $r['song_id'];
		$count = $r['c'];
		$rows[$i] = array('songID' => $songID, 'count' => $count);

		$i++;
	}


echo json_encode($rows);

?>