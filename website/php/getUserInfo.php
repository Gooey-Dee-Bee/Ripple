<?php
	require_once(__DIR__."/databases.php");	//Access to the database functions

	$email = $_GET['email'];

	$points = getInfoFromDatabase("SELECT points FROM users WHERE email = '$email'");	//points
	$points = $points[0]['points'];
	
	$user_id = getInfoFromDatabase("SELECT user_id FROM users WHERE email = '$email'"); //user_id
	$user_id = $user_id[0]['user_id'];

	// Gets the total number of drops by the user
	$total_drops = getInfoFromDatabase("SELECT COUNT(drop_id) AS drop_count FROM drops WHERE user_id = $user_id"); 
	$total_drops = $total_drops[0]['drop_count'];

	$acct_status = getInfoFromDatabase("SELECT active FROM confirmation WHERE user_id = $user_id");
	$acct_status = $acct_status[0]['active'];

	$array = array (
		'email' => $email,
		'userId' => $user_id,
		'points' => $points,
		'total_drops' => $total_drops,
		'acct_status' => $acct_status
	);
	
	echo json_encode($array);

?>