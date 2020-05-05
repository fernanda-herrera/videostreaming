//entrar al stream cuando este inicia
//event

rtc.client.on("stream-added", function (evt){
	var remoteStream = evt.stream;

	var id= remoteStream.getId();

	console.log('id: ' + id);
	console.log('uid: ' + rtc.params.uid )

	if (id !== rtc.params.uid) {
		console.log('ENTRO');
	    rtc.client.subscribe(remoteStream, function (err) {
	      console.log("stream subscribe failed", err);
	    });
	  }
	  console.log("stream-added remote-uid: ", id);
});


rtc.client.on("stream-subscribed", function (evt){
	console.log('SUSCRIBIRSE');
	var remoteStream = evt.stream;
  	var id = remoteStream.getId();

  	var tempObj = {
		id: id,
		stream: remoteStream
	}

  	rtc.remoteStreams.push(tempObj);

	//Add a view for the remote stream

	//esta funcion donde esta???

	//addView(id);
	addVidContainer(id,false);

	//despues del play va el id del dom
	remoteStream.play('uid:' + id,{muted: true})

	console.log('stream-subscribed remote-uid: ', id);
});


rtc.client.on('peer-leave',function(evt){
	console.log("Remote stream: " + evt.stream.getId() + "has left");
	var streamId = evt.stream.getId(); // the the stream id
	console.log(rtc.remoteStreams.findIndex(x => x.id === streamId));
	console.log("antes" + rtc.remoteStreams.length);
	var streamIndex = rtc.remoteStreams.findIndex(x => x.id === streamId)
	if(rtc.remoteStreams[streamIndex] != undefined) {
		var stream = rtc.remoteStreams[streamIndex].stream;
		var id = rtc.remoteStreams[streamIndex].id;
    	stream.stop(); // stop playing the feed
    	rtc.remoteStreams.splice (streamIndex);  // remove stream from list
    	removeVidContainer('uid:' + id);
  	}
  	console.log("despues" + rtc.remoteStreams.length);
});

