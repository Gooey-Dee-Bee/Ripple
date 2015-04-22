SC.initialize({
	client_id: 'dafab2de81f874d25715f0e225e7c71a'
});

function dropSong(songID) {
	$.post(
		'/ripple/php/insertDrop.php', 
		{song_id: songID, email: sessionStorage.getItem('name'), latitude: sessionStorage.getItem("latitude"),
		 longitude: sessionStorage.getItem("longitude")}, 
		function(returnedData){
			console.log(returnedData);
		})
	.done(function() { 
		// this should reload the page so the new dropped song will be at the top of the list 
		window.location.replace("index.html");
	});
}

/*Strings to get Soundcloud players on the page*/
var beginPlayer = '<div class="songPlayerSearch" id="song';
var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayer = '"></iframe></div><div><img class="dropFromSearch" src="images/dropItIcon.png" onClick="dropSong(this.id)" id="';
var endPlayer = '"/></div></div>';


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





