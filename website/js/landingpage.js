
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
		    data: JSON.stringify(user),
		    success: function(data) {
		    	if(data === "Successfully Logged In")
		    		alert("Successfully Logged In");
		    	else
		    		alert("Account not found.");
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
				
				}
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
	// 	}

	// }); // end of sign up

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
}); // end of document ready func
