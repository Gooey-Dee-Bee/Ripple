SC.initialize({
	client_id: 'dafab2de81f874d25715f0e225e7c71a'
});


function showGeneral() {

var htmlString = "<div id='analyticTitle'>General Statistics</div>"+
					"<div id='info'><table id='genTable'>";
	$.get('php/generalStats.php', function(data, status) {
		data = JSON.parse(data);
	var numOfUsers = data['numUsers'];
	var numOfSongs = data['numSongs'];
	var numOfDrops = data['numDrops'];
	var commonLat = data['popLat'];
	var commonLong = data['popLong'];
	var frequentUser = data['bestUser'];
	var popSong = data['popSong'];
	var popSongID = data['popSongID'];
	var droppedToday = data['dropsToday'];
	
	$.get('http://api.soundcloud.com/tracks/'+popSongID+'.json?client_id=dafab2de81f874d25715f0e225e7c71a', function(fullData, status) {
					var trackTitle = JSON.stringify(fullData["title"]);
					
					
		htmlString+= '<tr><td class="anDescriptor">Songs</td></tr>'+
			'<tr><td># of Songs Dropped Today</td><td>'+droppedToday+'</td></tr>'+
			'<tr><td>Total # of Drops on Site</td><td>'+numOfDrops+'</td></tr>'+
			'<tr><td># of Unique Songs on Site</td><td>'+numOfSongs+'</td></tr>'+
			'<tr><td>Most Dropped Song</td><td>'+trackTitle+'</td></tr>'+
			'<tr><td>    # of Times Dropped</td><td>'+popSong+'</td></tr>'+
			
			'<tr><td class="anDescriptor">Users</td></tr>'+
			'<tr><td>Most Frequent User</td><td>'+frequentUser+'</td></tr>'+
			'<tr><td>Registered Users</td><td>'+numOfUsers+'</td></tr>'+
			'<tr ><td class="anDescriptor">Location</td></tr>'+
			'<tr><td>Most common location</td><td>+'+commonLat+', '+commonLong+'</td></tr>'+
			'<tr><td>More than one location?</td><td>No.</td></tr>'+
			'</table></div>"';

	$('#songAnalytics').html(htmlString);
					
				});
	
	
	
	});
	
						
						
	
}


function top10Songs() {
var htmlString = "<div id='analyticTitle'>Top Ten Songs</div>"+
					"<div id='info'><table id='genTable'>"+
				'<tr style="font-weight:bold;"><td>Rank</td><td>Plays</td><td>Song Title</td><td>Soundcloud ID</td></tr>';
/*INCLUDE PHP FUNCTION REGARDING TOP 10 SONGS*/
var tenSongs = Array();
var songId = Array();
var songPlays = Array();

$.get('php/topTen.php', function(data, status) {
		console.log(JSON.stringify(JSON.parse(data)));
		data = JSON.parse(data);
			for(var i = 0; i < data.length; i++) {
				songId.push(data[i]["song_id"]);
				songPlays.push(data[i]['c']);
				$.get('http://api.soundcloud.com/tracks/'+data[i]["song_id"]+'.json?client_id=dafab2de81f874d25715f0e225e7c71a', function(fullData, status) {
					var trackTitle = JSON.stringify(fullData["title"]);
					tenSongs.push(trackTitle);
					set3HtmlString(songPlays,tenSongs, songId, htmlString);
				});
			}	
		});
console.log('top ten songs');
}

function set2HtmlString(idArray, nameArray, playString, htmlString) {
	
	for(var i =0; i < idArray.length; i++) {
		if(i%2)
			htmlString += '<tr><td style="font-weight:bold;">'+(i+1)+'<td style="font-weight:bold;">'+idArray[i]+'</td><td>'+nameArray[i]+'</td></tr>';
		else
			htmlString += '<tr style="background-color:#BBDFF0;"><td style="font-weight:bold;">'+(i+1)+'<td style="font-weight:bold;">'+idArray[i]+'</td><td>'+nameArray[i]+'</td></tr>';
					
	}
	htmlString+='</table></div>"';
	
	$('#songAnalytics').html(htmlString);
}
	
				
function set3HtmlString(firstArray, secondArray, thirdArray, htmlString) {
	
	for(var i =0; i < firstArray.length; i++) {
		if(i%2)
			htmlString += '<tr><td style="font-weight:bold;">'+(i+1)+'<td style="font-weight:bold;">'+firstArray[i]+'</td><td>'+secondArray[i]+'</td><td>'+thirdArray[i]+'</td></tr>';
		else
			htmlString += '<tr style="background-color:#BBDFF0;"><td style="font-weight:bold;">'+(i+1)+'<td style="font-weight:bold;">'+firstArray[i]+'</td><td>'+secondArray[i]+'</td><td>'+thirdArray[i]+'</td></tr>';
	
	}
	htmlString+='</table></div>"';
	console.log('3 STRING IS'+htmlString);
	$('#songAnalytics').html(htmlString);
}
	

function top10Users() {
var htmlString = "<div id='analyticTitle'>Top Ten Users</div>"+
					"<div id='info'><table id='genTable'>"+
				'<tr style="font-weight:bold;"><td>Rank</td><td>Email</td><td>Number of Drops</td><td>Number of Points</td></tr>';

var drops = Array();
var points = Array();
var email = Array();
$.get('php/topTenUsers.php', function(data, status) {
		console.log(JSON.stringify(JSON.parse(data)));
		data = JSON.parse(data);
		for(var i = 0; i <data.length; i++){
		console.log('in here');
		
			email.push(data[i]['email']);
			points.push(data[i]['points']);
			drops.push(data[i]['numDrops']);
	
		}
		
		
		set3HtmlString(email, drops, points, htmlString);
		});



$('#songAnalytics').html(htmlString);

}

function searchBySong() {
var htmlString = "<div id='analyticTitle'>Search By Song</div>"
					+"<br><input type='text' id='songId' placeholder='SONG ID'></input>'"+
					"<button class='analyticOption' onClick='augmentedSongSearch()'>Search</button>"+
					"<div id='info'>Search for a song by name or artist.";


$('#songAnalytics').html(htmlString);

}

function songSearch(songID) {
//var songID = $('#songId').val();
console.log("SEARCHING FOR SONG: "+songID);
$('#info').remove();

$.get('php/songAnalytics.php', {song_id:songID}, function(data, result) {
		data = JSON.parse(data);
		var songDrops = data['count'];
		//# of times the song has been dropped
		var songUsers = 12;
		var firstDropper = data['firstUser'];
		//# first time the song was dropped
		var songFirst = data['firstTime'];
		//last time the song was dropped
		var songLast = data['lastTime'];
		//locations where the song has been dropped
		var firstSongLocation = data['firstLat']+', '+data['firstLong'];
		var lastSongLocation = data['lastLat']+', '+data['lastLong'];
		var popularLocation = data['popLat']+', '+data['popLong'];
		var originalDrop = data['numOrigDrops'];


	if(songDrops != null){
		var htmlString= "<div id='info'>"+
				'<table id="genTable">'+
				'<tr><td class="anDescriptor">Time</td></tr>'+
				'<tr><td>First Drop</td><td>'+songFirst+'</td></tr>'+
				'<tr><td>Most Recent Drop</td><td>'+songLast+'</td></tr>'+
				'<tr><td class="anDescriptor">Drops</td></tr>'+
				'<tr><td># of Times Dropped</td><td>'+songDrops+'</td></tr>'+
				'<tr><td># of Users Dropping this Song</td><td>'+songUsers+'</td></tr>'+
				'<tr ><td class="anDescriptor">Location</td></tr>'+
				'<tr><td># of Different Locations</td><td>'+originalDrop+'</td></tr>'+
				'<tr><td>First Drop Location</td><td>+'+firstSongLocation+'</td></tr>'+
				'<tr><td>Last Drop Location</td><td>'+lastSongLocation+'</td></tr>'+
				'<tr><td>Most Common Location</td><td>'+popularLocation+'</td></tr>'+
				'</table></div>"';

		$('#songAnalytics').append(htmlString);
	}
	else {
		var htmlString = "<div id='info'>This song hasn't been dropped."+
					" It may have been dropped under a different ID. </div>";
					$('#songAnalytics').append(htmlString);
	}
		window.location.replace("#close");
		$('#searchModal').html("");


});
	
	/*INCLUDE PHP FUNCTION REGARDING SONGS*/
		


	
	}


function augmentedSongSearch() {
	var query = $('#songId').val();
	console.log('query is '+query);
	var pattern = /^\d+$/;
	if (pattern.test(query)) {
		//alert("SC url");
		songSearch(query);
	}
	else {
		//alert("not a url");
		$("#queryString").html(query);
		var beginPlayer = '<div class="songPlayerSearch" id="song';
		var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
		var midPlayer = '"></iframe></div><div><div class="dropFromSearch" onClick="songSearch(this.id)" id="';
		var endPlayer = '" style="width:10px; margin:5px; font-weight:bold;">SEARCH FOR THIS SONG</div></div></div>';

		SC.get('/tracks', { q: query }, function(tracks) {
			// will insert top 10 songs returned by SoundCloud into search modal
			for (i=0; i<10; i++) {
				var newcontent = beginPlayer+tracks[i].id+secondPlayer+tracks[i].id+midPlayer+tracks[i].id+endPlayer;
			    $('#searchModal').append(newcontent);
			}
			window.location.replace("#openModal");
		});
	}	




}

function searchByUser() {
var htmlString = "<div id='analyticTitle'>Search By User</div>"
				+"<br><input type='text' id='searchQuery' placeholder='USER EMAIL'></input>'"+
					"<button class='analyticOption' onClick='userSearch()'>Search</button>"+
					"<div id='info'>To search for a user, you must enter their email.</div>";
			
//# of times the song has been dropped
$('#songAnalytics').html(htmlString);

}

function userSearch() {
	var userID = $('#searchQuery').val();
	console.log("SEARCHING FOR USER: "+userID);				
	$('#info').remove();



$.get('php/userStats.php', {'email':userID}, function(data, status) {
		console.log(JSON.stringify(JSON.parse(data)));
		data = JSON.parse(data);
		
		var songDrops = data['total drops'];
		var userName = data['email'];
		var userID = data['userID'];
		//# of users who have dropped the song
		var userPoints = data['points'];
		//# first time the song was dropped
		var songFirst = data['first drop'];
		//last time the song was dropped
		var songLast = data['last drop'];
		
		//locations where the song has been dropped
		var songLocation = data['pop latitude']+', '+data['pop longitude'];
		var multipleLocal;
		if(data['locations'] == false)
			multipleLocal = 'No';
		else
			multipleLocal = 'Yes';
			
	if(userName != null) {
		var htmlString = "<div id='info'>"+
			'<table id="genTable">'+
			'<tr><td class="anDescriptor">User</td></tr>'+
			'<tr><td>Username</td><td>'+userName+'</td></tr>'+
			'<tr><td>First Drop</td><td>'+songFirst+'</td></tr>'+
			'<tr><td>Most Recent Drop</td><td>'+songLast+'</td></tr>'+
			'<tr><td class="anDescriptor">Points</td></tr>'+
			'<tr><td>Bought Drops</td><td>Yes/No</td></tr>'+
			'<tr><td>Number of Songs Dropped</td><td>'+songDrops+'</td></tr>'+
			'<tr><td>Points Since Joining (To Be Figured)</td><td>'+userPoints+'</td></tr>'+
			'<tr><td>Points Left in Account</td><td>'+userPoints+'</td></tr>'+
			'<tr ><td class="anDescriptor">Location</td></tr>'+
			'<tr><td>Most common location</td><td>+'+songLocation+'</td></tr>'+
			'<tr><td>More than one location?</td><td>'+multipleLocal+'</td></tr>'+
			'</table></div>"';
		}
		
		else {
			var htmlString = "<div id='info' style='color:black;'>I'm sorry, we couldn't find that user.</div>"
		}


			$('#songAnalytics').append(htmlString);
		});

	
	}

function searchByLocation() {
var htmlString = "<div id='analyticTitle'>Search By Location</div>";

$.get('php/locationStats.php', {latitude:'+32.8435', longitude:'-96.7841'},function(data,status) {

	console.log(data);


	});


$('#songAnalytics').html(htmlString);

}