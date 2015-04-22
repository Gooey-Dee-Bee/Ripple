<?php
	require_once(__DIR__."/dropHelper.php"); // Allow access to the database functions

	$song_id = $_POST['song_id']; // retieve the song ID
	$email = $_POST['email'];	// retrieve user email
	$latitude = $_POST['latitude'];		// retrieve latitude
	$longitude = $_POST['longitude'];	// retrieve longitude

	//use while look to go up the user tree until previous drop id == null?
	if(!sameUserDrop($email, $song_id)){

	}

?>