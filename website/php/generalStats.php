<?php
	require_once(__DIR__."/databases.php");

	//Number of users
	$query1 = getInfoFromDatabase("SELECT count(user_id) as c from users");
	$numUsers = $query1[0]['c'];

	//Total number of drops
	$query2 = getInfoFromDatabase("SELECT count(drop_id) as dc from drops");
	$numDrops = $query2[0]['dc'];

	//Number of distinct songs
	$query3 = getInfoFromDatabase("SELECT count(DISTINCT song_id) as sc from drops");
	$numSongs = $query3[0]['sc'];

	//Most popular song ID
	$query4 = getInfoFromDatabase(
				"SELECT song_id, count(song_id) as mp
				FROM drops
				GROUP BY song_id
				ORDER BY mp desc
				LIMIT 1"
				);
	$popSongID = $query4[0]['song_id'];
	$popSongCt = $query4[0]['mp'];

	//User with the most drops
	$query5 = getInfoFromDatabase(
				"SELECT email, count(email) as au
				FROM drops NATURAL JOIN users
				GROUP BY email
				ORDER BY au desc
				LIMIT 1"
				);
	$bestUser = $query5[0]['email'];

	//Most popular location (in latitude and longitude)
	$query6 = getInfoFromDatabase(
				"SELECT latitude, longitude, count(*) as lo
				FROM drops
				GROUP BY latitude, longitude
				ORDER BY lo desc
				LIMIT 1"
				);
	$popLat = $query6[0]['latitude'];
	$popLong = $query6[0]['longitude'];

	$today = date("Y-m-d");
	$today = $today . "%";
	//echo $today . "\n<br />";
	$query7 = getInfoFromDatabase(
			"SELECT song_id, time_stamp, count(song_id) as sto
				FROM drops
				WHERE time_stamp like '$today'");
	//echo json_encode($query7);
	//echo "\n<br />";
	$dropsToday = $query7[0]['sto'];


	$info = array(
			'numUsers' => $numUsers,
			'numDrops' => $numDrops,
			'dropsToday' => $dropsToday,
			'numSongs' => $numSongs,
			'popSongID' => $popSongID,
			'popSong' => $popSongCt,
			'bestUser' => $bestUser,
			'popLat' => $popLat,
			'popLong' => $popLong
			);

	echo json_encode($info);

?>