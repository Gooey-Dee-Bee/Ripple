<?php
	// DECODE THE INFORMATION (IT IS PASSED IN JSON FORMAT)
	$post_json = file_get_contents("php://input");
	$post = json_decode($post_json, true);

	$email = $post['email'];
	$password = $post['password'];

	if(existsInDatabase("SELECT * FROM users WHERE email = '$email'")) {
		echo "email"; // 'Error Code' that will be tested in the java script and will let the user know the email has already been registered
	}

	else {
		addToDatabase("INSERT INTO users(fname, lname, pword, email) VALUES('TEST', 'USER', '$pword', '$email')");
		echo "success";
	}





	function addToDatabase($query) {
		$con = mysqli_connect('localhost', 'root', 'mysqlpassword', 'Ripple');
		if (!$con) {
    		die('Could not connect: ' . mysqli_error($con));
		}

		mysqli_query($con, $query);

		mysqli_close($con);

	}


	function existsInDatabase($query) {
		$con = mysqli_connect('localhost', 'root', 'mysqlpassword', 'Ripple');
		if (!$con) {
    		die('Could not connect: ' . mysqli_error($con));
		}

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


?>
