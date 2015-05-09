$(function(){

	$('#accountInfo').on("click", function(){
		moduleSetUp();
		$('#accountModule').fadeIn(); 
		console.log('account info clicked');
	});
	
	

});

function moduleSetUp() {
	setBase();
}


function buyMoreDrops(num){
		// alert('This is where we let you give us your money for fake points');
		console.log('buy more drops is being clicked');
		var points = 0;
		if (num == 5) {
			points = 150;
		}
		else if (num == 10) {
			points = 320;
		}
		else {
			points = 700;
		}

		var handler = StripeCheckout.configure({
			key: 'pk_test_Winx331SdphaTbGUtv2qf8OX',
			image: 'images/dropItIcon.png',
			token: function(token) {
			  // Use the token to create the charge with a server-side script.
			  // You can access the token ID with `token.id`
				$.post(
					'/ripple/php/purchasePoints.php', 
					{email: sessionStorage.getItem('name'), amount: num}, 
					function(returnedData){
						
					})
				.done(function() { 
					getUserPoints();
					$('#accountModule').hide();
				});
			}
		});

		handler.open({
			name: 'Ripple',
			description: (points + ' points'),
			amount: (num * 100),
			email: sessionStorage.getItem('name')
		});

		
	}
	
function showPaymentOptions() {
	$('#paymentOptions').html('<a id="buyMoreDrops" href="#" onclick="buyMoreDrops(5)">150 points for $5</a><a id="buyMoreDrops" href="#" onclick="buyMoreDrops(10)">320 points for $10</a><br></br><a id="buyMoreDrops" href="#" onclick="buyMoreDrops(20)">700 points for $20</a>');
	$('#buyButton').hide();
}

function closeModule(){
		$('#accountModule').hide();
	}

function setBase() {

$('#popup').html("<div id='accountModule'><div id='closeButton'></div><div id='info'><div id='accountName'></div><div class='dropNum'"+
					"id='dropsLeft'></div><div class='dropNum' id='dropsUsed'></div><div id='acctLink'>"
					 +"</div></div></div>"); 
var usersName = sessionStorage.getItem('name');
var pointsLeft = sessionStorage.getItem('points');
var totalDrops = sessionStorage.getItem('drops');

console.log('session points '+pointsLeft);
console.log('session drops made '+totalDrops);


$('#closeButton').html("<a id='closeAccountModule' href='#' onClick='closeModule()'>X</a>");
$('#accountName').html(usersName);
$('#dropsLeft').html(pointsLeft +"<div class='yourDropText'>Points Remaining</div>"); 
$('#dropsUsed').html(totalDrops +"<div class='yourDropText'>Drops All Time</div>"); 


$('#acctLink').html("<a id='buyMoreDrops' href='#' onClick='goToPersonalPlaylist()'>View Drop History</a><br></br><div id='buyButton'><a id='buyMoreDrops' href='#'' onClick='showPaymentOptions()'>Buy More Points</a><br></br></div><div id='paymentOptions'></div>"); 
//$('buyButton').html('<a id="buyMoreDrops" href="#"" onClick="showPaymentOptions()">Buy More Points</a><br></br>');
}


function goToPersonalPlaylist () {
	if(sessionStorage.getItem('name') != null) {
		window.location.replace("personalPlaylist.html");
		getPersonalPlaylist();
		
		
	}
}


function getPersonalPlaylist() {
	$('#songBox').show();
	console.log('ugh, inside the getting the personal playlist bullshit');
	
	//MAKE REQUEST WORKSBUT MAKE USER REQUEST DOES NOT, RETURNS EMPTY DATA SET//
	//makeUserRequest();
	makeRequestForUser();
	console.log('still in personal playlist');

$('#acctLink').html("<a id='buyMoreDrops' href='#' onClick='buyMoreDrops()'>View Drop History</a><br></br><a id='buyMoreDrops' href='#' onClick='buyMoreDrops()'>(Buy more drops)</a>"); 

}


