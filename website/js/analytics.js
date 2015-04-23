function showGeneral() {
	var numOfUsers;
	var numOfSongs;
	var numOfDrops;
	var numOfLocations;
	
	var mostPopularSong;
	var userWithMostPoints;

	numOfUsers = 3;
	numOfSongs =392;
	numOfDrops =12312312;
	numOfLocations =1;
	
	mostPopularSong = "title of track";
	userWithMostPoints = "Master";
	
	
	var htmlString = "<div id='analyticTitle'>General Statistics</div>"+
						"<table id='genTable' class='anNumber'>"+
						"<tr><td>"+numOfUsers+" Users</td></tr>"+
						"<tr><td>"+numOfSongs+" Songs</td></tr>"+
						"<tr><td>"+numOfDrops+" Drops</td></tr>"+
						"<tr><td>"+mostPopularSong+" (most popular song)</td></tr>"+
						"<tr><td>"+userWithMostPoints+" (user with most points)</td></tr></table>";
						
						
	$('#songAnalytics').html(htmlString);
}


function top10Songs() {
var htmlString = "<div id='analyticTitle'>Top Ten Songs</div>";
/*INCLUDE PHP FUNCTION REGARDING TOP 10 SONGS*/


$.get('php/topTen.php', function(data, status) {
		console.log(JSON.stringify(JSON.parse(data)));
		});




console.log('top ten songs');
$('#songAnalytics').html(htmlString);

}


function top10Users() {
var htmlString = "<div id='analyticTitle'>Top Ten Users</div>";

$('#songAnalytics').html(htmlString);

}

function searchBySong() {
var htmlString = "<div id='analyticTitle'>Search By Song</div>"
					+"<br><input type='text' id='songId' placeholder='SONG ID'></input>'"+
					"<button class='analyticOption' onClick='songSearch()'>Search</button>";


$('#songAnalytics').html(htmlString);

}

function songSearch() {

var songID = $('#songId').val();
console.log("SEARCHING FOR SONG: "+songID);

	$('#info').remove();
	/*INCLUDE PHP FUNCTION REGARDING SONGS*/
		var songDrops = 342;
//# of times the song has been dropped
var songDrops = 342;

//# of users who have dropped the song
var songUsers = 12;

//# first time the song was dropped
var songFirst = "03/4/1293";

//last time the song was dropped
var songLast = "40/12/3423";

//locations where the song has been dropped
var songLocation = "everywhere";


var htmlString= "<table id='genTable' class='anNumber'><tr class='anDescriptor'>"+
				"<td># of Times Dropped</td><td># of Users Dropping</td></tr>"+
				"<tr class='anNumber '><td>"+songDrops+"</td><td>"+songUsers+"</td></tr>"+
				"<tr class='anDescriptor'><td>First Drop</td><td>Most Recent Drop</td></tr>"+
				"<tr class='anNumber '><td>"+songFirst+"</td><td>"+songLast+"</td></tr>";

		$('#songAnalytics').append(htmlString);
	
	}


function searchByUser() {
var htmlString = "<div id='analyticTitle'>Search By User</div>"
				+"<br><input type='text' id='searchQuery' placeholder='USER EMAIL'></input>'"+
					"<button class='analyticOption' onClick='userSearch()'>Search</button>";
//# of times the song has been dropped
$('#songAnalytics').html(htmlString);

}

function userSearch() {
	var userID = $('#searchQuery').val();
	console.log("SEARCHING FOR USER: "+userID);				
	$('#info').remove();



$.get('php/getUserInfo.php', {'email':userID}, function(data, status) {
		console.log(JSON.stringify(JSON.parse(data)));
		data = JSON.parse(data);
			/*INCLUDE PHP FUNCTION REGARDING USERS*/
	var songDrops = data['total_drops'];

	//# of users who have dropped the song
	var userPoints = data['points'];

	//# first time the song was dropped
	var songFirst = "03/4/1293";

	//last time the song was dropped
	var songLast = "40/12/3423";

	//locations where the song has been dropped
	var songLocation = "everywhere";



	var htmlString = "<div id='info'><table id='genTable' class='anNumber'><tr class='anDescriptor'>"+
				"<td># of Songs Dropped </td><td>Points on User's Acount</td></tr>"+
				"<tr class='anNumber '><td>"+songDrops+"</td><td>"+userPoints+"</td></tr>"+
				"<tr class='anDescriptor'><td>First Drop</td><td>Most Recent Drop</td></tr>"+
				"<tr class='anNumber '><td>"+songFirst+"</td><td>"+songLast+"</td></tr></div>";
				


		$('#songAnalytics').append(htmlString);
		});

	
	}

function searchByLocation() {
var htmlString = "<div id='analyticTitle'>Search By Location</div>";

$('#songAnalytics').html(htmlString);

}