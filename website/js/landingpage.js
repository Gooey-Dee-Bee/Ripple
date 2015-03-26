
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
<<<<<<< HEAD
		    url: 'http://private-f89294-ripple3.apiary-mock.com/users/email', // php/login.php
		    contentType: 'application/json',
		    data: JSON.stringify(user),
		    success: function(data, status, request) {
		    	if(data === "Successfully Logged In")
		    		alert("Successfully Logged In");
		    	else
		    		alert("Account not found.");
		    	// Redirect to index 
		    	//window.location.replace("index.html");
=======
		    url: '/ripple/php/login.php',
		    content: 'application/json',
		    data: JSON.stringify(user),
		    success: function(data) {
		    	alert(data);
		        //Error Checking
		        // if($.isNumeric(data)){
		        //     if(data==400) {
		        //         alert("success logging in");
		        //     } 
		        //     else {
		                
		        //     } 
		        // }
		        // else if(!jQuery.isEmptyObject(data)){
		        //     var obj = JSON.parse(data);
		        //     if(obj.Email.length>0){
		        //         $.cookie.json = true;
		        //         $.cookie("data", data); 
		        //         //redirect user
		        //         $("#loginMessage").hide();
		        //         $(location).attr('href', "search.html");
		        //     }
		        // }
>>>>>>> origin/landing-page
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

		if (user.password != user.confirmPassword) {
			alert("passwords not the same");
			return;
		}
		else {
			$.ajax({
				type: "POST",
<<<<<<< HEAD
			    url: 'http://private-f89294-ripple3.apiary-mock.com/newuser/email', //php/createAccount.php
			    contentType: 'application/json',
			    data: JSON.stringify(user),
			    success: function(data, status, request) {
			    	if(data === "success") {
			    		alert("Successfully Created Account");
			    		// Redirect to index 
		    			//window.location.replace("index.html");
			    	}
			    	else
			    		document.getElementById("errorMessage").innerHTML = "Account already exisits with that email address.";
			    },
			    error: function(something, var1) {
			    	alert('An error occurred creating the account');
	      		}
			}); // end of ajax
		} // end of if
		else {
			document.getElementById("errorMessage").innerHTML = "Passwords are not the same.";
		}
	}); // end of sign up
	
}); // end of document ready func
=======
				url: '/ripple/php/createAccount.php',
				content: 'application/json',
				data: JSON.stringify(user),
				success: function(data) {
					if(data === "email") {
						alert("This email is already in use.");
					}
					else {
						alert("Account Created Successfully");
					}
				} // end of success
			}); // end of ajax
	 	} // end of 'else' statement
	 }); // end of signup function

}); // end of document ready func
>>>>>>> origin/landing-page
