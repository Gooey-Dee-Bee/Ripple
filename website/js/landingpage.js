
$( document ).ready( function() {

	/* Login Function */
	$("#loginForm").submit( function(event) {
		event.preventDefault();
		var user = new Object();
		user.email = $("#loginEmail").val();
		user.password = $("#loginPassword").val();
		// user now has email and password stored in it

		// url should be /ripple/php/login.php
		// url for apiary: http://private-f89294-ripple3.apiary-mock.com/users/email
	    $.post("/ripple/php/login.php", JSON.stringify(user), function(data) {
	    	if(data === "Successfully Logged In")
	    		alert("Successfully Logged In");
	    	else
	    		alert("Account not found.");
	    	// Redirect to index 
	    	window.location.replace("index.html");
	    })
	    .fail( function() {
	    	alert("An error occured logging you in.");
	    });
	}); // end of login function

	
	/* Sign Up Function */
	$("#signUpForm").submit( function(event) {
		event.preventDefault();
		var user = new Object();
		user.email = $("#signupEmail").val();
		user.password = $("#signupPassword").val();
		user.confirmPassword = $("#signupConfirmPassword").val();

		if (user.password === user.confirmPassword) {
			// url should be /ripple/php/createAccount.php
			// url for apiary http://private-f89294-ripple3.apiary-mock.com/newuser/email
			$.post("/ripple/php/createAccount.php", JSON.stringify(user), function( data ) {
				// success function
				if(data == 100) {
		    		document.getElementById("errorMessage").innerHTML = "";
		    		alert("Successfully Created Account");
		    		// Redirect to index 
	    			window.location.replace("index.html");
		    	}
		    	else
		    		alert("no go");
		    		document.getElementById("errorMessage").innerHTML = "Account already exisits with that email address.";
			})
			.fail( function() {
				alert("Error occured creating an account");
			});
		} // end of if
		else { // passwords are not the same
			document.getElementById("errorMessage").innerHTML = "Passwords are not the same.";
		}
	}); // end of sign up
	
}); // end of document ready func