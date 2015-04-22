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


function buyMoreDrops(){
		// alert('This is where we let you give us your money for fake points');
		console.log('buy more drops is being clicked');

		  var handler = StripeCheckout.configure({
		    key: 'pk_test_Winx331SdphaTbGUtv2qf8OX',
		    image: 'images/dropItIcon.png',
		    token: function(token) {
		      // Use the token to create the charge with a server-side script.
		      // You can access the token ID with `token.id`
		    }
		  });

		    handler.open({
		      name: 'Ripple',
		      description: '50 points',
		      amount: 500
		    });
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
$('#dropsLeft').html(pointsLeft +"<div class='yourDropText'>Drops Left</div>"); 
$('#dropsUsed').html(totalDrops +"<div class='yourDropText'>Past Drops</div>"); 


$('#acctLink').html("<a id='buyMoreDrops' href='#' onClick='goToPersonalPlaylist()'>View Drop History</a><br></br><a id='buyMoreDrops' href='#' onClick='buyMoreDrops()'>Buy More Drops</a>"); 
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
	makeRequest();
	console.log('still in personal playlist');

$('#acctLink').html("<a id='buyMoreDrops' href='#' onClick='buyMoreDrops()'>View Drop History</a><br></br><a id='buyMoreDrops' href='#' onClick='buyMoreDrops()'>(Buy more drops)</a>"); 

}

/*Strings to get Soundcloud players on the user account*/



/*GET SONGS FROM THE DB THEORETICALLY RELATED TO USER
function makeUserRequest(){
$.get("/ripple/php/loadDrops.php",
		{user_id: sessionStorage.getItem('user_id')},
	    function(data, status) {
	    	console.log('data is'+data);
			console.log('adding songs to array');
			addSongsToUserArray(JSON.parse(data));
		});
}


/*ADD SONGS FROM THE DATABSE TO THE ARRAY
function addSongsToUserArray(jsonArray) {

	for(var i = 0; i < jsonArray.length; i++){
		var songId = JSON.stringify(jsonArray[i]["song_id"]);
		songId = songId.substr(1,songId.length-2);
		
		console.log("song id in usr account: "+songId);
		addSongForUser(songId);
		
	}	
}


ADD SONG FRAME TO THE SONG FEED (used for static and dynamic)
function addSongForUser(songId) {
var beginPlayer = '<div class="userSong" id="song';
var secondPlayer= '"> <div class="songText"><iframe src="https://www.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayer ='"></iframe></div><div>';
var endPlayer ='</div></div>';


    var newcontent = document.createElement('div');
    var newSongListing = beginPlayer+songId+secondPlayer+songId+midPlayer+endPlayer;
    //console.log("ADD SONG"+newSongListing);
    console.log('inside adding song for user');
    newcontent.innerHTML = 'fuck everything';
   
    prependElement('dropSongBox', newcontent);
 


}*/


