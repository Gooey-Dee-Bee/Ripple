<?php
	$email = $_POST['email'];
	$pword = $_POST['password'];


	if(getInfoFromDatabase("SELECT password FROM users WHERE email = '".$email."'") == $pword) {
		echo "Successfully Logged In";
	}

	else {
		echo "Account not found";
	}


	function getInfoFromDatabase($query) {
		$con = mysqli_connect('localhost', 'root', 'mysqlpassword', 'Ripple');
		if (!$con) {
    		die('Could not connect: ' . mysqli_error($con));
		}

		$result = mysqli_query($con, $query);
		mysqli_close($con);

		return $result // This will return FALSE if the query fails
	}


?>
