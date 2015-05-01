SC.initialize({
	client_id: 'dafab2de81f874d25715f0e225e7c71a'
});

function dropSong(songID) {
	console.log('dropping song');
	// check to see if song already dropped in the area before dropping it
	var inCurrentList = false;
	console.log("songsInDB");
	for (var i=0; i < songsInDB.length; i++) {
		//console.log(songsInDB[i]);
		if (songsInDB[i] === songID) {
			bumpSong('song'+songID);
			inCurrentList = true;
			window.location.replace("#close");
			$('#searchModal').html("");
			return;
		}
	}

	if (!inCurrentList) {
		$.post(
			'/ripple/php/drop.php', 
			{song_id: songID, email: sessionStorage.getItem('name'), latitude: sessionStorage.getItem("latitude"),
			 longitude: sessionStorage.getItem("longitude")}, 
			function(returnedData){
				if(returnedData == 200) // The user doesn't have enough points to drop the song
					alert("You do not have enough points to drop this song!");
				// alert(returnedData);
				// alert("success");
			})
		.done(function() { 
			// this should reload the page so the new dropped song will be at the top of the list 
			addSong(songID);
			window.location.replace("#close");
			$('#searchModal').html("");
		});
	}
}



function search(query) {
	console.log("SEARCH!!!!!");
	//check if it is a soundcloud url first
	var pattern = /https:\/\/soundcloud.com\/*\w*\/.*/;
	if (pattern.test(query)) {
		//alert("SC url");
		grabSong();
	}
	else {
		//alert("not a url");
		$("#queryString").html(query);
		if (query == "nickleback" || query == "Nickleback") {
			alert("Why would you want to listen to that crap?");
		}
		var beginPlayer = '<div class="songPlayerSearch" id="song';
		var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
		var midPlayer = '"></iframe></div><div><img class="dropFromSearch" src="images/dropItIcon.png" onClick="dropSong(this.id)" id="';
		var endPlayer = '"/></div></div>';

		SC.get('/tracks', { q: query }, function(tracks) {
			// will insert top 10 songs returned by SoundCloud into search modal
			if (tracks.length > 10) {
				for (i=0; i<10; i++) {
					var newcontent = beginPlayer+tracks[i].id+secondPlayer+tracks[i].id+midPlayer+tracks[i].id+endPlayer;
				    $('#searchModal').append(newcontent);
				}
			}
			else if (tracks.length == 0){
				$('#searchModal').append("No results");
				$('.modalDialog').css('bottom', '-1000px');
			}
			else {
				for (i=0; i<tracks.length; i++) {
					var newcontent = beginPlayer+tracks[i].id+secondPlayer+tracks[i].id+midPlayer+tracks[i].id+endPlayer;
				    $('#searchModal').append(newcontent);
				}
			}
			window.location.replace("#openModal");
		});
	}	
}


$( document ).ready( function() {

	$('#search').on('submit', function(event){
		event.preventDefault();
		var query = $("#searchQuery").val();
		search(query);
	});

	$('#close').click(function() {
		// clear the search results when clicked
		$('#searchModal').html("");
	});

});





