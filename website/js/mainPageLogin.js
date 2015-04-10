$(function(){
	$('#loginForm').on('submit', function(event){

		event.preventDefault();
		console.log("Sup bitch!");
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
			    success: function(data, status, request) {

			    	if(data == 100){
			    	
			    		console.log('the session stuff is: '+sessionStorage.getItem('name'));
			    		
			    		alert("Successfully Logged In, check the console");
			    		showAccountInfo();
			    		if(sessionStorage.getItem('location') != null)
			    			{
			    			showLoggedInPage();
			    			window.location.replace("index.html");
			    			}
			    		
			    		
			    	}
			    	else
			    		alert("Account not found.");
			    },
			    error: function(something, var1) {
			    	console.log(something);
			    	console.log(var1);
	         		alert('An error occurred');
	      		}

			}); // end of ajax
	}); // end submit function
	$('#logout').on("click", function(){
		$('#accountInfo').attr("class", "hidden");
		$('#loginFields').fadeIn();
		
		disallowDrops();
		
		
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('password');
		
	}); // end logout on click
}); // end doc.ready


function showAccountInfo() {
		getUserPoints();
		
		$('#loginFields').fadeOut();
		$('#accountInfo').removeAttr("class");
		document.getElementById('userName').innerHTML = sessionStorage.getItem('name');
		document.getElementById('dropNumber').innerHTML = sessionStorage.getItem('points');
		console.log("SESSION NAME: " + sessionStorage.getItem("name"));
}