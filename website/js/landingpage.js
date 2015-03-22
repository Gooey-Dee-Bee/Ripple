$( document ).ready(function() {

	/* Login Function */
	$("#loginForm").submit( function(event) {
		event.preventDefault();
		var user = new Object();
		user.email = $("#loginEmail").val();
		user.password = $("#loginPassword").val();
		// user now has email and password stored in it

		// this url returns a json string of { "password": "password" }
		$.get("http://private-17c6-rippleapi.apiary-mock.com/users/email", function(data, status) {
			console.log("Data: " + data);
			/*var obj = JSON.parse(data);
			console.log("hasdlfkhasdf");
			if (user.password === obj.password) {
	        	alert("success!!");
	        	// redirect to home page
	        }
	        else {
	        	alert("wrong password!");
	        }*/
		});
	}); // end of login function


	/* Sign Up Function */
	/*$("#signUpForm").submit( function(event) {
		event.preventDefault();
		var user = new Object();
		user.email = $("#signupEmail").val();
		user.password = $("#signupPassword").val();
		user.confirmPassword = $("#signupConfirmPassword").val();
		if (user.password != user.confirmPassword) {
			alert("passwords not the same");
			return;
		}
		// else {
		// 	$.ajax({
		// 		type: "POST",
		// 		url: 'php/createAccount.php',
		// 		content: 'application/json',
		// 		data: JSON.stringify(user),
		// 		success: function(data) {
		// 		    // Error Checking
		// 			// if($.isNumeric(data)){
		// 			//     if(data==400) {
		// 			//         alert("success creating account in");
		// 			//     } 
		// 			//     else {
					        
		// 			//     } 
		// 			// }
		// 			// else if(!jQuery.isEmptyObject(data)){
		// 			//     var obj = JSON.parse(data);
		// 			//     if(obj.Email.length>0){
		// 			//         $.cookie.json = true;
		// 			//         $.cookie("data", data); 
		// 			//         //redirect user
		// 			//         $("#loginMessage").hide();
		// 			//         $(location).attr('href', "search.html");
		// 			//     }
		// 			// }
		// 		};
		// 	}); // end of ajax
		// }

	}; // end of sign up
	*/
}); // end of document ready func

