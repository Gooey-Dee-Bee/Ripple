
$( document ).ready( function() {

	/* Login Function */
	$("#loginForm").submit( function(event) {
		event.preventDefault();
		var user = new Object();
		user.email = $("#loginEmail").val();
		user.password = $("#loginPassword").val();
		// user now has email and password stored in it

		$.ajax({
			type: "POST",
			url: '/ripple/php/login.php',
		    contentType: 'application/json',
		    data: JSON.stringify(user),
		    success: function(data, status, request) {
		    	if(data === "Successfully Logged In")
		    		alert("Successfully Logged In");
		    	else
		    		alert("Account not found.");
		    	// Redirect to index 
		    	window.location.replace("index.html");
		  	},
		    error: function(something, var1) {
		    	console.log(something);
		    	console.log(var1);
         		alert('An error occurred');
      		}
	    }); // end of ajax
	}); // end of login function

	
	/* Sign Up Function */
	$("#signUpForm").submit( function(event) {
		event.preventDefault();
		var user = new Object();
		user.email = $("#signupEmail").val();
		user.password = $("#signupPassword").val();
		user.confirmPassword = $("#signupConfirmPassword").val();

		if (user.password === user.confirmPassword) {
			$.ajax({
				type: "POST",
				url: '/ripple/php/createAccount.php', 
			    contentType: 'application/json',
			    data: JSON.stringify(user),
			    success: function(data, status, request) {
			    	if(data === "success") {
			    		alert("Successfully Created Account");
			    		// Redirect to index 
		    			window.location.replace("index.html");
			    	}
			    	else
			    		document.getElementById("errorMessage").innerHTML = "Account already exisits with that email address.";
			    },
			    error: function(something, var1) {
			    	alert('An error occurred creating the account');
	      		}
			}); // end of ajax
		} // end of if
		else { // passwords are not the same
			document.getElementById("errorMessage").innerHTML = "Passwords are not the same.";
		}
	}); // end of sign up
	
}); // end of document ready func