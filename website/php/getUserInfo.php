<?php
	
	require_once(__DIR__."/databases.php");	//Access to the database functions

	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $post['email'];

	$points = getInfoFromDatabase("SELECT points FROM users WHERE email = '$email'");	//points
	
	$user_id = getInfoFromDatabase("SELECT user_id FROM users WHERE email = '$email'"); //user_id

	$array = array();
	array_push($array, $email, $user_id, $points);	//push back variables to array

	echo json_encode($array);

?>