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
		    url: 'http://private-f89294-ripple3.apiary-mock.com/users/email',
		    content: 'application/json',
		    data: JSON.stringify(user),
		    success: function(data, status, request) {
		    	if(data === "Successfully Logged In")
		    		alert("Successfully Logged In");
		    	else
		    		alert("Account not found.");
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
		user.email = $(".signupEmail").val();
		user.password = $(".signupPassword").val();
		var confirmPassword = $(".signupConfirmPassword").val();
		if ( user.password == confirmPassword ) {
			$.ajax({
				type: "POST",
			    url: 'http://private-f89294-ripple3.apiary-mock.com/newuser/email',
			    content: 'application/json',
			    data: JSON.stringify(user),
			    success: function(data, status, request) {
			    	if(data === "success")
			    		alert("Successfully Created Account");
			    	else
			    		alert("Account already exists");
			    },
			    error: function(something, var1) {
			    	alert('An error occurred creating the account');
	      		}
			}); // end of ajax
		} // end of if
		else {
			html = "Passwords are not the same.";
			document.getElementById("errorMessage").innerHTML = html;
		} // end of else
	}); // end of sign up
	
}); // end of document ready func

