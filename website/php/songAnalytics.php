<?php
	require_once(__DIR__."/databases.php");

	$songID = $_GET['song_id'];
	//$songID = 123063109;

	$result = getInfoFromDatabase(
		"SELECT user_id, latitude, longitude, time_stamp
		FROM drops
		WHERE song_id = '$songID'
		ORDER BY time_stamp");

	$total = count($result);

	$last = $total - 1;


	/*echo json_encode($result);
	echo "\n<br />";
	echo $last;
	echo "\n<br />";
	echo $result[0]['time_stamp'];
	echo "\n<br />";
	echo $result[$last]['time_stamp'];*/

	$info = array(
		'firstUser' => $result[0]['user_id'],
		'firstLat' => $result[0]['latitude'],
		'firstLong' => $result[0]['longitude'],
		'firstTime' => $result[0]['time_stamp'],
		'lastLat' => $result[$last]['latitude'],
		'lastLong' => $result[$last]['longitude'],
		'lastTime' => $result[$last]['time_stamp'],
		'count' => $total);

	//echo "\n<br />";

	echo json_encode($info);
	
?>