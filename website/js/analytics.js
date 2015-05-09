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
			'</table></div>';

	$('#songAnalytics').html(htmlString);
					
				});
	
	
	
	});
	
						
						
	
}


function top10Songs() {
var htmlString = "<div id='analyticTitle'>Top Ten Songs</div>"+
					"<div id='info'><table id='genTable'>"+
				'<tr style="font-weight:bold;"><td>Rank</td><td>Drops</td><td>Song Title</td><td>Soundcloud ID</td></tr>';
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
	htmlString+='</table></div>';
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
					+"<br><input type='text' id='songId' placeholder='SONG ID'></input>"+
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
$('#info').remove();

var htmlString = "<div id='analyticTitle'>Search By Location</div>"+
					"<div id='info'>"+
					"<div ><select id ='distanceChoice' onChange='getSongsForLocation(this.options[this.selectedIndex].value)'>"+
					"<option value=''>Select a Distance</option>"+
					"<option value='0.5'>0.5 Miles</option>"+
					"<option value='1'> 1 Mile </option>"+
					"<option value='5'> 5 Miles </option>"+
					"<option value = '10'> 10 Miles </option>"+
					"<option value = '25'> 25 Miles </option>"+
					"<option value = '50'> 50 Miles </option>"+
					"<option value = '100'> 100 Miles </option>"+
					"<option value = '2725'> All of United States (or most of europe)</option>"+
					"</select></div><div id='map' class='map'></div>";




$('#songAnalytics').html(htmlString);

}


function getSongsForLocation(chosenDistance, html) {

	var longLats = new Array();
	html='';
	$.get('php/locationStats.php', {latitude:sessionStorage.getItem('latitude'), longitude:sessionStorage.getItem('longitude'), distance:chosenDistance},function(data,status) {
		data = JSON.parse(data);
		for(var i = 0; i < data.length; i ++) {
			//html+= data[i]["song_id"];
			
			//var coords = '['+parseFloat(data[i]['longitude'])+', '+parseFloat(data[i]['latitude'])+']';
			var coordinatePair = new Array();
			coordinatePair.push('[ '+data[i]['longitude'], data[i]['latitude']+' ]');
			
			longLats.push(coordinatePair);
		}
		html+= "</div>";


		var zoomNumber;
		switch(chosenDistance) {
			case '0.5':
				zoomNumber = 14;
				break;
			case '1':
				zoomNumber = 12;
				break;
			case '5':
				zoomNumber = 10;
				break;
			case '10':
				zoomNumber = 9;
				break;
			case '25':
				zoomNumber = 8;
				break;
			case '50':
				zoomNumber = 7;
				break;
			case '100':
				zoomNumber = 6;
				break;
			case '2725':
				zoomNumber = 4;
				break;
			default:
				zoomNumber = 5;
		}
		
		console.log(zoomNumber);
		setUpMap(longLats, zoomNumber);
		$('#songAnalytics').append(html);
	console.log('DATA FROM LOCATION '+JSON.stringify(data));
	});




}

function setUpMap (songCoords, zoomNumber) {
var longitude = parseFloat(sessionStorage.getItem('longitude'));
var latitude = parseFloat(sessionStorage.getItem('latitude'));

$('#map').html('');


var icon_features = [];

$.each(songCoords, function(index, item){
	var tempLong = parseFloat(item[0].substr(1, item[0].length));
	var tempLat = parseFloat(item[1].substr(0, item[1].length-1));
	var coordinatingBitches = [tempLong, tempLat];

   var point = new ol.geom.Point(coordinatingBitches);
   point.transform('EPSG:4326', 'EPSG:900913');
   // I tried it the other way too, but doesn't seem to work

   var iconFeature = new ol.Feature({
       geometry: point,
       name: item.name
   });
   
	icon_features.push(iconFeature);
   
});


var iconStyle = new ol.style.Style({
  	image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: 'images/dropItIconMarker.png'
  }))
});


var vectorSource = new ol.source.Vector({
  features: icon_features
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: iconStyle
});

var rasterLayer = new ol.layer.Tile({
  source: new ol.source.MapQuest({layer: 'osm'
  })
});

var map = new ol.Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new ol.View({
    center: ol.proj.transform([longitude, latitude],  'EPSG:4326', 'EPSG:3857'),
    zoom: zoomNumber
  })
});

var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false
});
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    popup.setPosition(coord);
    $(element).popover({
      'placement': 'top',
      'html': true,
      'content': feature.get('name')
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
 

}


function showFrequency() {
$('#info').remove();

var htmlString = "<div id='analyticTitle'>Frequency of Drops Over Time</div>"+
					"<div id='info'><div id='chart' style='width: 100%; height: 500px;'>xxx</div></div>";
$('#songAnalytics').html(htmlString);
getDataPoints();
	
}

function getDataPoints() {
	var date1s= '2015-04-24';
	var date2s= '2015-05-8';
	
	var firstDateJS = fromMtoJSDates(date1s);
	var secondDateJS = fromMtoJSDates(date2s);
	
	var dateRange = (parseFloat(secondDateJS) - parseFloat(firstDateJS));
	
	$.get('php/dateRange.php', {date1:date1s, date2:date2s},function(data,status) {
		data = JSON.parse(data);
		console.log(data);
		var allTheDays = new Array();
		
		allTheDays.push(['Date', 'Users', 'Drops']);
		for(var i=0; i < data.length; i++) {
			var oneDay = new Array();
		
 			oneDay.push(parseInt(i), [data[i]['userCount']], [data[i]['dropCount']]);
			allTheDays.push(oneDay);
		}
		console.log(allTheDays);

		
		chartValues(allTheDays);
   });

}

function fromMtoJSDates(sqlDate){
var sqlDateArr1 = sqlDate.split("-");
    var sYear = sqlDateArr1[0];
    var sMonth = sqlDateArr1[1];
    var sDay = sqlDateArr1[2];
    
    var dateString = sYear+''+sMonth+''+sDay;
    console.log(dateString);

	return dateString;
}

function chartValues(dataPoints) {
        var data = google.visualization.arrayToDataTable(dataPoints);

        var options = {
          hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: dataPoints[0][1]}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart'));
        chart.draw(data, options);
        console.log('inside of draw chart');

}


showGeneral();

