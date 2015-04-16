SC.initialize({
	client_id: 'dafab2de81f874d25715f0e225e7c71a'
});

function showSongSearch() {
	document.getElementById('searchBox').style.display = "block";
	document.getElementById('dropBox').style.display = "none";
	document.getElementById('songSearchSuggest').style.display = "none";
	document.getElementById('urlSearchSuggest').style.display = "block";
	document.getElementById("songId").value="";
	document.getElementById("searchQuery").value="";	
	console.log('show Song Search');
}

function showURLSearch() {
	document.getElementById('dropBox').style.display = "block";
	document.getElementById('searchBox').style.display = "none";
	document.getElementById('urlSearchSuggest').style.display = "none";
	document.getElementById('songSearchSuggest').style.display = "block";
	document.getElementById("songId").value="";
	document.getElementById("searchQuery").value="";
	console.log('show URL Search');
}

/*Strings to get Soundcloud players on the page*/
var beginPlayer = '<div class="songPlayerSearch" id="song';
var secondPlayer= '"> <div class="songText"><iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/';
var midPlayer = '"></iframe></div><div><img class="dropFromSearch" src="images/dropItIcon.png" onClick="bumpSong(this.id)" id="';
var endPlayer = '"/></div></div>';


function search(query) {
	SC.get('/tracks', { q: query }, function(tracks) {
		// will insert top 10 songs returned by SoundCloud into search modal
		for (i=0; i<10; i++) {
			var newcontent = beginPlayer+tracks[i].id+secondPlayer+tracks[i].id+midPlayer+tracks[i].id+endPlayer;
		    $('#searchModal').append(newcontent);
		}
		window.location.replace("#openModal");
	});
}


$( document ).ready( function() {
	showSongSearch();

	$('#search').on('submit', function(event){
		event.preventDefault();
		var query = $("#searchQuery").val();
		search(query);
	});

	//search("Swimming Pools");
});




