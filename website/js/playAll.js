SC.initialize({
    client_id: 'dafab2de81f874d25715f0e225e7c71a'
});

// function playAll(){
//   var widgetIframe = document.getElementsByClassName('iframeObj')[0];
//   var widget = SC.Widget(widgetIframe);

//     widget.bind(SC.Widget.Events.READY, function() {
//       widget.bind(SC.Widget.Events.PLAY, function() {
//         // get information about currently playing sound
//         widget.getCurrentSound(function(currentSound) {
//           console.log('sound ' + currentSound.get('') + 'began to play');
//         });
//       });
//     });

// }


function playAll() {
    // get the iframe widget
    // loop through the array songsInDB to play the songs

    var currentSong = songsInDB[0];
    $.('#'+currentSong).each(function () {

    });
}


playAll();