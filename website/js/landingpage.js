
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
	
			    		
			    		
			$.post('/ripple/php/login.php', 
				{email: user.email, password: user.password},
			    function(data) {
			    	if(data == 100){
			    		
			    		//alert("Successfully Logged In! Drop wisely. ");
			    		$('#loginFields').fadeOut();
			    		$('#accountInfo').removeAttr("class");
			    		
			    		console.log("SESSION NAME" + sessionStorage.getItem("name"));
			    		
			    		if(document.getElementById("userName"))
			    			document.getElementById("userName").innerHTML = user.email;
			    			
			    
			    		window.location.replace("index.html");
			    		console.log("replaced index");
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
		
		if (user.password == "") {
			document.getElementById("errorMessage").innerHTML = "Please enter a password";
		} // end if
		else if (user.confirmPassword == "") {
			document.getElementById("errorMessage").innerHTML = "Please confirm your password";
		}
		else if (user.password === user.confirmPassword) {
			// url should be /ripple/php/createAccount.php
			// url for apiary http://private-f89294-ripple3.apiary-mock.com/newuser/email
			$.post("/ripple/php/createAccount.php",
					{email: user.email, password: user.password}, function( data ) {
				// success function
				if(data == 100) {
		    		//document.getElementById("errorMessage").innerHTML = "Account created successfully";
		    		//alert("Successfully Created Account");
		    		// Redirect to index 
		    		alert("Account created successfully. Please check your email to confirm your account with Ripple.");
	    			window.location.replace("info.html");
		    	}
		    	else {
		    		//alert("An acount already exists with that email address.");
		    		document.getElementById("errorMessage").innerHTML = "Account already exists with that email address.";
		    		setTimeout(function(){$('#errorMessage').html('');},4000);
		    	}
			})
			.fail( function() {
				document.getElementById("errorMessage").innerHTML = "Error occured creating an account. We can't tell you why it did this, you just failed. Sorry.";
				setTimeout(function(){$('#errorMessage').html('');},4000);
			});
		} // end of if
		else { // passwords are not the same
			document.getElementById("errorMessage").innerHTML = "Passwords are not the same.";
			setTimeout(function(){$('#errorMessage').html('');},4000);
		}
	}); // end of sign up
	
}); // end of document ready function




function showAccount() {
	document.getElementById('createAccount').style.display = "block";
	document.getElementById('loginForm').style.display = "none";
	document.getElementById('accountSuggest').style.display = "none";
	document.getElementById('loginSuggest').style.display = "block";
	console.log('show account');
	
}


function showLogin() {
	document.getElementById('loginForm').style.display = "block";
	document.getElementById('createAccount').style.display = "none";
	document.getElementById('loginSuggest').style.display = "none";
	document.getElementById('accountSuggest').style.display= "block";
	console.log('show login');
}

showAccount();
