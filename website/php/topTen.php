<?php
	require_once(__DIR__."/databases.php");

	$query = "SELECT song_id, count(song_id) as c
				FROM drops
				GROUP BY song_id
				ORDER BY c desc
				limit 10";

	$result = getInfoFromDatabase($query);

	$rows = array();
	while($r = mysqli_fetch_assoc($result)){
		$rows[] = $r;
	}

	echo json_encode($rows);





?>