<?php
	require_once(__DIR__."/databases.php"); //Access to db fns

	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$dropID = $_GET['dropID']; //Primary key for table.

	//Gets user id to credit original dropper.
	$user_id = getInfoFromDatabase("SELECT user_id FROM drops WHERE drop_id = $dropID");
	$user_id = mysqli_fetch_assoc($user_id);
	$user_id = $user_id['user_id'];


	//Gets song id from drops table. Can be used to pull name from SC.
	$song_id = getInfoFromDatabase("SELECT song_id FROM drops WHERE drop_id = $dropID");
	$song_id = mysqli_fetch_assoc($song_id);
	$song_id = $song_id['song_id'];

	//Gets date/time that the drop was created.
	$time_stamp = getInfoFromDatabase("SELECT time_stamp FROM drops WHERE drop_id = $dropID");
	$time_stamp = mysqli_fetch_assoc($time_stamp);
	$time_stamp = $time_stamp['time_stamp'];

	//Get longitude and latitude. Translate into area covered??
	$long = getInfoFromDatabase("SELECT longitude FROM drops WHERE drop_id = $dropID");
	$long = mysqli_fetch_assoc($long);
	$long = $long['longitude'];

	$lat = getInfoFromDatabase("SELECT latitiude FROM drops WHERE drop_id = $dropID");
	$lat = mysqli_fetch_assoc($lat);
	$lat = $lat['latitiude'];

	$info = array(
		'userID' => $user_id,
		'songID' => $song_id, //change to song name using SC??
		'time_stamp' => $time_stamp,
		'longitude' => $long,
		'latitiude' => $lat //change into zipcodes/area covered?
		);

	echo json_encode($info);

?>

