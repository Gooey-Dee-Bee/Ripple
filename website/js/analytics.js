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
					+"<br><input type='text' id='songId' placeholder='SONG ID'></input>'";

$('#songAnalytics').html(htmlString);

}

function searchByUser() {
var htmlString = "<div id='analyticTitle'>Search By User</div>"
				+"<br><input type='text' id='songId' placeholder='USER EMAIL'></input>'";

$('#songAnalytics').html(htmlString);

}

function searchByLocation() {
var htmlString = "<div id='analyticTitle'>Search By Location</div>";

$('#songAnalytics').html(htmlString);

}