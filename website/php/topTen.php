<?php

	require_once(__DIR__."/databases.php");


	$query = "SELECT song_id, count(song_id) as c
				FROM drops
				GROUP BY song_id
				ORDER BY c desc
				limit 10";

	$result = getInfoFromDatabase($query);

echo json_encode($result);

?>