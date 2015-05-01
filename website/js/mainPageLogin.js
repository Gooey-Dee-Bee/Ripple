$(function(){
	$('#loginForm').on('submit', function(event){

		event.preventDefault();
		console.log("Sup bitch!");
		var user = new Object();
		user.email = $("#loginEmail").val();
		user.password = $("#loginPassword").val();
		
		
		
			    		
			    		
			$.post('/ripple/php/login.php', {email: user.email, password: user.password},
 					function(data, status, request) {

			    	if(data == 100){
			    		sessionStorage.name = user.email;
						sessionStorage.password = user.password;

			    		showAccountInfo();
			    		if(sessionStorage.getItem('location') != null){
			    			showLoggedInPage();
			    			window.location.replace("index.html");
			    		}	
			    	}
			    	else
			    		alert("Account not found.");
			}); // end of post
	}); // end submit function
	$('#logout').on("click", function(){
		
		$('#popup').hide();
		$('#accountInfo').hide();
		$('#loginFields').fadeIn();
		disallowDrops();
		
		
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('password');
		window.location.replace("index.html");
		
	}); // end logout on click
}); // end doc.ready


function showAccountInfo() {
		getUserPoints();
		
		$('#loginFields').fadeOut();
	//	$('#accountInfo').removeAttr("class");
		$('#accountInfo').show();
		document.getElementById('userName').innerHTML = sessionStorage.getItem('name');
		document.getElementById('dropNumber').innerHTML = sessionStorage.getItem('drops');
		console.log("SESSION NAME: " + sessionStorage.getItem("name"));
}