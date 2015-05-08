<?php
	require_once(__DIR__."/databases.php"); // Allow access to the database functions
	require_once(__DIR__."/email.php");
	require_once(__DIR__."/encryption.php");
	#require(__DIR__."/PasswordHash.php");

	$email = $_POST['email'];
	$pword = $_POST['password'];

	// $hash_cost_log2 = 8;
	// $hashPortable = FALSE;
	// $hasher = new PasswordHash($hash_cost_log2, $hashPortable);
	// $hash = $hasher->HashPassword($pword);

	// if(strlen($hash) < 20)
	// 	echo "Failed to hash password";

	$encryptedpword = encrypt($pword, ENCRYPTION_KEY);
	#$string = "This is the original data string!";


	$query = "SELECT * FROM users WHERE email = '$email'";
	if(existsInDatabase($query)) {
		echo 200; // 'Error Code' that the email has already been registered.
	}
	else {
		$add_query = "INSERT INTO users(pword, email) VALUES('$encryptedpword', '$email')";
		addToDatabase($add_query);
		echo send_email($email); // 100 on success, 300 on error
	}


	

	// echo $encrypted = encrypt($string, ENCRYPTION_KEY);
	// echo "<br />";
	// echo $decrypted = decrypt($encrypted, ENCRYPTION_KEY);

?>

