<?php

	// ADDS INFO TO THE DATABASE BASED ON THE INPUT QUERY
	function addToDatabase($query) {
		$con = establishConnection();
		mysqli_query($con, $query);
		mysqli_close($con);
	}

	// RETURNS TRUE IF THE QUERY RETURNS ANY NUMBER OF RESULTS, FALSE OTHERWISE
	function existsInDatabase($query) {
		$con = establishConnection();

		$result = mysqli_query($con, $query);

		if(mysqli_num_rows($result) != 0) {
			mysqli_close($con);
			return TRUE;
		}

		else {
			mysqli_close($con);
			return FALSE;
		}
	}


	// RETURNS THE RESULT OF SOME QUERY IN THE RIPPLE DATABASE
	function getInfoFromDatabase($query) {
		$con = establishConnection();

		$result = mysqli_query($con, $query);
		mysqli_close($con);

		return $result; 
	}


	// HELPER FUNCTION TO CONNECT TO THE DB
	function establishConnection() {
		$con = mysqli_connect('localhost', 'root', 'mysqlpassword', 'Ripple');
		if (!$con) {
			die('Could not connect: ' . mysqli_error($con));
		}

		return $con;
	}
?>