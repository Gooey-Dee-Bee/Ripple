<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	$id = $_POST['id']; // retieve the song ID
	$email = $_POST['email'];	// retreive user email
	$defaultPoints = 10;

	$query = 'SELECT * FROM song WHERE song_id = $id';
	if(!existsInDatabase($query)) {
		$query = "INSERT INTO song VALUES($id, 1, 'filler', 'filler.com')"; // Lots of filler stuff that will hopefully be fixed
		addToDatabase($query);

		// Subtract DEFAULT value of points from user
		$points = getInfoFromDatabase("SELECT points FROM users WHERE email = '$email'");
		$points = $points - $defaultPoints;
		if ($points < 0) {
			$points = 0;
		}
		$sql = "UPDATE users SET points=$points WHERE email='$email'";
		addToDatabase($sql);
	}

	$query = "INSERT INTO drops(user_id, song_id) VALUES(1, $id)";
	addToDatabase($query);

	echo $id;


?>