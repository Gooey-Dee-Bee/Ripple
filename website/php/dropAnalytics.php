<?php
	require_once(__DIR__."/databases.php"); 

	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$dropID = $_GET['dropID'];

	$query = "SELECT user_id, song_id, time_stamp, longitude, latitude
				FROM drops
				WHERE drop_id = $dropID";

	$result = getInfoFromDatabase($query);

	$row =  mysql_fetch_assoc($result);

	$user_id = $row['user_id'];
	$song_id = $row['song_id'];
	$time_stamp = $row['time_stamp'];
	$long = $row['longitude'];
	$lat = $row['low'];

	$info = array(
		'userID' => $user_id,
		'songID' => $song_id, //change to song name using SC??
		'time_stamp' => $time_stamp,
		'longitude' => $long,
		'latitiude' => $lat //change into zipcodes/area covered?
		);

	echo json_encode($info);

	

?>
