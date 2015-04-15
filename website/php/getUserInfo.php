<?php
	
	
	require_once(__DIR__."/databases.php");	//Access to the database functions

	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $_GET['email'];

	$points = getInfoFromDatabase("SELECT points FROM users WHERE email = '$email'");	//points
	$points = mysqli_fetch_assoc($points);
	$points = $points['points'];
	
	$user_id = getInfoFromDatabase("SELECT user_id FROM users WHERE email = '$email'"); //user_id
	$user_id = mysqli_fetch_assoc($user_id);
	$user_id = $user_id['user_id'];

	$array = array (
		'email' => $email,
		'userId' => $user_id,
		'points' => $points
	);
	
	echo json_encode($array);

?>