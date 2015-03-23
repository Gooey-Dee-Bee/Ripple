$( document ).ready(function() {

	/* Login Function */
	$("#loginForm").submit( function(event) {
		event.preventDefault();
		var user = new Object();
		user.email = $("#loginEmail").val();
		user.password = $("#loginPassword").val();
		// user now has email and password stored in it

		$.ajax({
			type: "POST",
		    url: 'http://private-17c6-rippleapi.apiary-mock.com/users/email',
		    content: 'application/json',
		    data: JSON.stringify(user),
		    success: function(data) {
		    	console.log(data);
		    	/*if(data === "Successfully Logged In")
		    		alert("Successfully Logged In");
		    	else
		    		alert("Account not found.");*/
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
		if (user.password != user.confirmPassword) {
			html = "*Passwords are not the same.";
			document.getElementById("errorMessage").innerHTML = html;
			return;
		}
	}; // end of sign up
}); // end of document ready func

