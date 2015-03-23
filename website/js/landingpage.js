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
<<<<<<< HEAD
		    data: {email: user.email, password: user.password},
		    success: function(data){
=======
		    data: JSON.stringify(user),
		    success: function(data, status, request) {
>>>>>>> 61016e42039ed4ea3fa18dc80a57fb7ebb513c32
		    	if(data === "Successfully Logged In")
		    		alert("Successfully Logged In");
		    	else
		    		alert("Account not found.");
<<<<<<< HEAD
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
		    }
=======
		    },
		    error: function(something, var1) {
		    	console.log(something);
		    	console.log(var1);
         		alert('An error occurred');
      		}
>>>>>>> 61016e42039ed4ea3fa18dc80a57fb7ebb513c32
		}); // end of ajax
	}); // end of login function

	

	/* Sign Up Function */
<<<<<<< HEAD
	// $("#signUpForm").submit( function(event) {
	// 	event.preventDefault();
	// 	var user = new Object();
	// 	user.email = $("#signupEmail").val();
	// 	user.password = $("#signupPassword").val();
	// 	user.confirmPassword = $("#signupConfirmPassword").val();
	// 	if (user.password != user.confirmPassword) {
	// 		alert("passwords not the same");
	// 		return;
	// 	}
	// 	else {
	// 		$.ajax({
	// 			type: "POST",
	// 			url: 'php/createAccount.php',
	// 			content: 'application/json',
	// 			data: JSON.stringify(user),
	// 			success: function(data) {
				    // Error Checking
					// if($.isNumeric(data)){
					//     if(data==400) {
					//         alert("success creating account in");
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
// 				}
// 			}); // end of ajax
// 		}

// 	}); // end of sign up

=======
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
	
>>>>>>> 61016e42039ed4ea3fa18dc80a57fb7ebb513c32
}); // end of document ready func

