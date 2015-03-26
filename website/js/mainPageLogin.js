$(function(){
	$('#loginForm').on('submit', function(event){

		event.preventDefault();
		console.log("Sup bitch!");
		var user = new Object();
		user.email = $("#loginEmail").val();
		user.password = $("#loginPassword").val();
			$.ajax({
				type: "POST",
			    url: 'http://private-f89294-ripple3.apiary-mock.com/users/email',
			    content: 'application/json',

			    data: JSON.stringify(user),
			    success: function(data, status, request) {

			    	if(data === "Successfully Logged In"){
			    		alert("Successfully Logged In");
			    		$('#loginFields').fadeOut();
			    		$('#accountInfo').removeAttr("class");
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
}); // end doc.ready