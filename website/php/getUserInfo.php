<?php
	require_once(__DIR__."/databases.php");	//Access to the database functions

	$email = $_GET['email'];

	$points = getInfoFromDatabase("SELECT points FROM users WHERE email = '$email'");	//points
	$points = mysqli_fetch_assoc($points);
	$points = $points['points'];
	
	$user_id = getInfoFromDatabase("SELECT user_id FROM users WHERE email = '$email'"); //user_id
	$user_id = mysqli_fetch_assoc($user_id);
	$user_id = $user_id['user_id'];

	// Gets the total number of drops by the user
	$total_drops = getInfoFromDatabase("SELECT COUNT(drop_id) AS drop_count FROM drops WHERE user_id = $user_id"); 
	$total_drops = mysqli_fetch_assoc($total_drops);
	$total_drops = $total_drops['drop_count'];

	$array = array (
		'email' => $email,
		'userId' => $user_id,
		'points' => $points,
		'total_drops' => $total_drops
	);
	
	echo json_encode($array);

?>