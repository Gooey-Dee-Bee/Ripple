<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions

	$id = $_POST['id']; // retieve the song ID

	$query = 'SELECT * FROM song WHERE song_id = $id';
	if(!existsInDatabase($query)) {
		$query = "INSERT INTO song VALUES($id, 1, 'filler', 'filler.com')"; // Lots of filler stuff that will hopefully be fixed
		addToDatabase($query);
	}

	$query = "INSERT INTO drops(user_id, song_id) VALUES(1, $id)";
	addToDatabase($query);

	echo $id;


?>