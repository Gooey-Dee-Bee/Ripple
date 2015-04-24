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

	while($r = mysqli_fetch_assoc($result)){

		$rows[$i] = array(
			'song_id' => $r['song_id'],
			'count' => $r['count']
			);

		$i++;
	}


echo json_encode($rows);





?>