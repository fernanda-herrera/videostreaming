//si es host o rtc usar esta librerira
//creae el streaming local
function createLocalStream(){
	rtc.localStream = AgoraRTC.createStream({
		streamID: rtc.params.uid,
		audio: true,
		video: true,
		screen: false,
	});
	//console.log(document.getElementById("local_stream"))
	initStream();
}

//inicializar streaming local
//domId es el elemento en el cual se reproducira el streaming
function initStream(){

	rtc.localStream.init(function (){
		console.log("init local stream success");

		addVidContainer(rtc.params.uid,true);
		//ver lo del auto play
		rtc.localStream.play('uid:' + rtc.params.uid,{ muted: true });

		//llamar publicar local stream
		PublicLocalStream();

	}, function (err) {
		console.error("init local stream failed", err);
	});
}

//publicar streaming local
function PublicLocalStream(){
	rtc.client.publish(rtc.localStream, function (err){
		console.log("publish failed");

		console.error(err);
	});

	startLocalStreamEvents();
}


//close  channel
function leaveChanelLocal(){
	rtc.client.leave(function (){
		// Stop playing the local stream
  		rtc.localStream.stop();
  		// Close the local stream
  		rtc.localStream.close();

  		removeVidContainer('uid:' + rtc.params.uid);
  		// Stop playing the remote streams and remove the views
  		console.log("antes: " + rtc.remoteStreams.length);
  		for(var i = 0; i < rtc.remoteStreams.length; i ++){
    		var stream = rtc.remoteStreams[i].stream;
			var id = rtc.remoteStreams[i].id;
    		stream.stop(); // stop playing the feed
    		rtc.remoteStreams.splice (i); // remove stream from list
    		removeVidContainer('uid:' + id);
  		}
  		console.log("despues: " + rtc.remoteStreams.length);
  		console.log("client leaves channel success");
	}, function (err) {
  		console.log("channel leave failed");
  		console.error(err);
	})
}


//local Stream events
function startLocalStreamEvents(){
	rtc.localStream.on("accessAllowed", function() {});

	rtc.localStream.on("accessDenied", function() {});

	rtc.localStream.on("stopScreenSharing", function() {});


	rtc.localStream.on("videoTrackEnded", function() {});


	rtc.localStream.on("audioTrackEnded", function() {});

	rtc.localStream.on("audioMixingPlayed", function() {});

	rtc.localStream.on("audioMixingFinished", function() {});

	rtc.localStream.on("player-status-change", function(evt) {
		if (evt.isErrorState && evt.status === "paused"){
	         console.error(`Stream is paused unexpectedly. Trying to resume...`);
	         stream.resume().then(function(){
	             console.log(`Stream is resumed successfully`);
	         }).catch(function(e){
	             console.error(`Failed to resume stream. Error ${e.name} Reason ${e.message}`);
	         });
	     }
	});

}
