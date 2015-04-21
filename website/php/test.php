<?php
	require_once(__DIR__."/databases.php");

	$query = "SELECT drop_id FROM drops WHERE song_id = 123174830 ORDER BY time_stamp DESC";
	$final = getInfoFromDatabase($query);

	echo json_encode($final);


?>