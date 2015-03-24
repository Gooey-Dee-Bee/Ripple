
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
		    content: 'application/json',
<<<<<<< HEAD
		    data: JSON.stringify(user),
		    success: function(data) {
=======

		    data: JSON.stringify(user),
		    success: function(data, status, request) {

>>>>>>> 1bed41a15c0de723eeb4dcc261b17b6834825abd
		    	if(data === "Successfully Logged In")
		    		alert("Successfully Logged In");
		    	else
		    		alert("Account not found.");
<<<<<<< HEAD
=======

>>>>>>> 1bed41a15c0de723eeb4dcc261b17b6834825abd
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
<<<<<<< HEAD
=======
		    }

>>>>>>> 1bed41a15c0de723eeb4dcc261b17b6834825abd
		    },
		    error: function(something, var1) {
		    	console.log(something);
		    	console.log(var1);
         		alert('An error occurred');
      		}
<<<<<<< HEAD
=======

>>>>>>> 1bed41a15c0de723eeb4dcc261b17b6834825abd
		}); // end of ajax
	}); // end of login function

	

	/* Sign Up Function */
<<<<<<< HEAD
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
				 //    //Error Checking
=======

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
>>>>>>> 1bed41a15c0de723eeb4dcc261b17b6834825abd
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
<<<<<<< HEAD
				}
=======
// 				}
// 			}); // end of ajax
// 		}

// 	}); // end of sign up

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
>>>>>>> 1bed41a15c0de723eeb4dcc261b17b6834825abd
			}); // end of ajax
		}

	}); // end of sign up

	// $("#signUpForm").submit( function(event) {
	// 	event.preventDefault();
	// 	var user = new Object();
	// 	user.email = $(".signupEmail").val();
	// 	user.password = $(".signupPassword").val();
	// 	var confirmPassword = $(".signupConfirmPassword").val();
	// 	if ( user.password == confirmPassword ) {
	// 		$.ajax({
	// 			type: "POST",
	// 		    url: 'http://private-f89294-ripple3.apiary-mock.com/newuser/email',
	// 		    content: 'application/json',
	// 		    data: JSON.stringify(user),
	// 		    success: function(data, status, request) {
	// 		    	if(data === "success")
	// 		    		alert("Successfully Created Account");
	// 		    	else
	// 		    		alert("Account already exists");
	// 		    },
	// 		    error: function(something, var1) {
	// 		    	alert('An error occurred creating the account');
	//       		}
	// 		}); // end of ajax
	// 	} // end of if
	// 	else {
	// 		html = "Passwords are not the same.";
	// 		document.getElementById("errorMessage").innerHTML = html;
	// 	} // end of else
	// }); // end of sign up
	
<<<<<<< HEAD
=======

>>>>>>> 1bed41a15c0de723eeb4dcc261b17b6834825abd
}); // end of document ready func

