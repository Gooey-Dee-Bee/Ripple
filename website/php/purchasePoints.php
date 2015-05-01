<?php 
	require_once(__DIR__."/databases.php"); // Allow the getUserFromEmail
	require_once(__DIR__."/dropHelper.php"); // Allow access to addPoints/addToTotalPoints

	$email = $_POST['email'];	// retrieve user email
	$dollars = $_POST['amount'];	//retrieve amount in dollars from purchase

	$userid = getUserIdFromEmail($email);	//retrieve user_id

	//insert new record in payment
	$query = "INSERT INTO payment (user_id, payment_amount) values ('$userid', '$dollars')";
	addToDatabase($query);

	// *convert payment dollars to points based on our point scale*
	$points  = 0;
	if($dollars == 5){
		$points = 150;
	} else (if $dollars == 10){
		$points = 320;
	} else (if $dollars == 20){
		$points = 700;
	}
	/*
	//get points from users
	$userPoints = getInfoFromDatabase("SELECT points FROM users WHERE email = '$email'");
	$userPoints = $userPoints[0]['points'];
	//get total_points from users
	$totalUserPoints = getInfoFromDatabase("SELECT total_points FROM users WHERE email = '$email'");
	$totalUserPoints = $totalUserPoints[0]['total_points'];

	$userPoints = $userPoints + $points;
	$totalUserPoints = $totalUserPoints + $points;

	//update points AND total_points in users
	$pointsQuery = "UPDATE users SET points = '$userPoints' WHERE email = '$email'";
	addToDatabase($pointsQuery);
	$totalPointsQuery = "UPDATE users SET total_points = '$totalUserPoints' WHERE email = '$email'";
	addToDatabase($totalPointsQuery);
	*/

	//new functions from dropHelper.php
	addPoints($email, $points);
	addToTotalPoints($email, $points);


 ?>