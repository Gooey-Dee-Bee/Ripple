$(function(){

	$('#accountInfo').on("click", function(){
		moduleSetUp();
		$('#accountModule').fadeIn(); 
		console.log('account info clicked');
	});
	
	

});

function moduleSetUp() {
	setBase();
	makeUserRequest();

}


function buyMoreDrops(){
		alert('This is where we let you give us your money for fake points');
		console.log('buy more drops is being clicked');
	}
	
function closeModule(){
		$('#accountModule').hide();
	}

function setBase() {

$('#popup').html("<div id='accountModule'><div id='closeButton'></div><div id='info'><div id='accountName'></div><div class='dropNum'"+
					"id='dropsLeft'></div><div class='dropNum' id='dropsUsed'></div><div id='acctLink'>"
					 +"</div><div id='songBoxTitle'></div><div id='dropSongBox'></div></div></div>"); 
var usersName = sessionStorage.getItem('name');
var pointsLeft = sessionStorage.getItem('points');
var totalDrops = sessionStorage.getItem('drops');

$('#closeButton').html("<a id='buyMoreDrops' href='#' onClick='closeModule()'>X</a>");
$('#accountName').html(usersName);
$('#dropsLeft').html(pointsLeft +"<div class='yourDropText'>Drops Left</div>"); 
$('#dropsUsed').html(totalDrops +"<div class='yourDropText'>Past Drops</div>"); 
$('#songBoxTitle').html("<u>Your Drop Playlist:</u> ");
$('#acctLink').html("<a id='buyMoreDrops' href='#' onClick='buyMoreDrops()'>(Buy more drops)</a>"); 
}

/*Strings to get Soundcloud players on the user account*/



/*GET SONGS FROM THE DB THEORETICALLY RELATED TO USER*/
function makeUserRequest(){
$.get("/ripple/php/loadDrops.php",
		{user_id: sessionStorage.getItem('user_id')},
	    function(data, status) {
			console.log('adding songs to array');
			addSongsToUserArray(JSON.parse(data));
		});
}


/*ADD SONGS FROM THE DATABSE TO THE ARRAY*/
function addSongsToUserArray(jsonArray) {

	for(var i = 0; i < jsonArray.length; i++){
		var songId = JSON.stringify(jsonArray[i]["song_id"]);
		songId = songId.substr(1,songId.length-2);
		
		console.log("song id in usr account: "+songId);
		addSongForUser(songId);
		
	}	
}


/*ADD SONG FRAME TO THE SONG FEED (used for static and dynamic)*/
function addSongForUser(songId) {
var beginPlayer = '<div class="userSong" id="song';
var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayer ='"></iframe></div><div>';
var endPlayer ='</div></div>';


    var newcontent = document.createElement('div');
    var newSongListing = beginPlayer+songId+secondPlayer+songId+midPlayer+endPlayer;
    //console.log("ADD SONG"+newSongListing);
    newcontent.innerHTML = newSongListing;
   
    prependElement('dropSongBox', newcontent);
 


}


