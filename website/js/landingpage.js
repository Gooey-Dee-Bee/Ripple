
$( document ).ready( function() {
	document.getElementById('loginForm').style.display ="none";
	/* Login Function */
	$('#loginForm').on('submit', function(event){

		event.preventDefault();
		console.log("Generic Login");
		var user = new Object();
		user.email = $("#loginEmail").val();
		user.password = $("#loginPassword").val();
		
		sessionStorage.name = user.email;
		sessionStorage.password = user.password;
	
			    		
			    		
			$.ajax({
				type: "POST",
			    url: '/ripple/php/login.php',
			    content: 'application/json',

			    data: JSON.stringify(user),
			    success: function(data) {

			    	if(data == 100){
			    		
			    		alert("Successfully Logged In, check the console");
			    		$('#loginFields').fadeOut();
			    		$('#accountInfo').removeAttr("class");
			    		
			    		console.log("SESSION NAME" + sessionStorage.getItem("name"));
			    		
			    		if(document.getElementById("userName"))
			    			document.getElementById("userName").innerHTML = user.email;
			    			
			    
			    		window.location.replace("index.html");
			    		
			    	}
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
	}); // end submit function
	
	/* Sign Up Function */
	$("#signUpForm").submit( function(event) {
		event.preventDefault();
		var user = new Object();
		user.email = $("#signupEmail").val();
		user.password = $("#signupPassword").val();
		user.confirmPassword = $("#signupConfirmPassword").val();


		sessionStorage.name=user.email;
		console.log("sessionStorage"+sessionStorage.getItem("name"));
		
		if (user.password === user.confirmPassword) {
			// url should be /ripple/php/createAccount.php
			// url for apiary http://private-f89294-ripple3.apiary-mock.com/newuser/email
			$.post("/ripple/php/createAccount.php", JSON.stringify(user), function( data ) {
				// success function
				if(data == 100) {
		    		document.getElementById("errorMessage").innerHTML = "Account created successfully";
		    		alert("Successfully Created Account");
		    		// Redirect to index 
		    		
	    			window.location.replace("index.html");
		    	}
		    	else {
		    		alert("no go");
		    		document.getElementById("errorMessage").innerHTML = "Account already exisits with that email address.";
		    		
		    	
		    	}
			})
			.fail( function() {
				alert("Error occured creating an account");
				window.location.replace("index.html");
			});
		} // end of if
		else { // passwords are not the same
			document.getElementById("errorMessage").innerHTML = "Passwords are not the same.";
		}
	}); // end of sign up
	
}); // end of document ready function




function showAccount() {
	document.getElementById('createAccount').style.display = "compact";
	document.getElementById('loginForm').style.display = "none";
	document.getElementById('accountSuggest').style.display = "none";
	document.getElementById('loginSuggest').style.display = "block";
	
}


function showLogin() {
	document.getElementById('loginForm').style.display = "block";
	document.getElementById('createAccount').style.display = "none";
	document.getElementById('loginSuggest').style.display = "none";
	document.getElementById('accountSuggest').style.display= "block";
}