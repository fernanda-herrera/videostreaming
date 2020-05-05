//general vars

//objeto rtc
var rtc = {
  client: null,
  joined: false,
  published: false,
  localStream: null,
  remoteStreams: [],
  params: {}
};


//opciones del canal
var option = {
	//numero de app en el back de agora
  appID: "d805a632eaef4bd88cca4dc5083a383d",
  //nombre de la sala para que se coencte el grupo
  channel: "Lab",
  //nombre del usuario debe se runico podria definirse dinamicamente
  uid: null,
  //token de seguridad aun investigando
  token: null
}

// set log level:
// -- .DEBUG for dev
// -- .NONE for prod
AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE);

createClientFn('rtc','h264');


//inicializar cliente

//chanelmodedebe ser un string
//live for broadcast
// rtc for chat
//codectype es un string
// vp8 para general y antes de safari 12
//h264 para 12 o mas  nuevos
function createClientFn( chanelmode, codectype){
	console.log('cliente Creado')
	rtc.client = AgoraRTC.createClient({mode: chanelmode, codec: codectype});
}

//inicializar cliente
function initializeClient(){
	console.log(option.appID);
	rtc.client.init(option.appID, function(){
		console.log("init success");
		//call join chanel
		joinChannel();
		}, (err) => {
			console.error(err);
		});
}

//definir rol del cliente
//rol debe ser un string
// 'host' para el anfitrion en broadcast
// 'audience' para los que ven la transmicion
// 'rtc' para chat

function setClientRole(role){
	rtc.client.setClientRole(role)
}


//unirse al canal

function joinChannel(){
	rtc.client.join(option.token ? option.token : null, option.channel, option.uid ? option.uid : null, function (uid) {
		console.log("join channel: " + option.channel + " success, uid: " + uid);
		rtc.params.uid = uid;

		createLocalStream();

	}, function(err) {
		console.error("client join failed", err)
	})
}



//cliente events

rtc.client.on('stream-published', function(evt){
	console.log("Publish local stream successfully");
});

//show mute icon whenever a remote has muted their mic
rtc.client.on("mute-audio",function (evt){
	console.log("Remote stream: " + evt.uid + "has mute audio");
	toggleVisibility('#' + evt.uid + '_mute', true);
});

rtc.client.on("unmute-audio", function (evt){
	console.log("Remote stream: " + evt.uid + "has un-muted audio");
	toggleVisibility('#' + evt.uid + '_mute', false);
});


// show user icon whenever a remote has disabled their video
rtc.client.on("mute-video", function(evt){
	console.log("Remote stream: " + evt.uid + "has muted video");
	var remoteId = evt.uid;
  // if the main user stops their video select a random user from the list
  if (remoteId != mainStreamId) {
    // if not the main vidiel then show the user icon
    toggleVisibility('#' + remoteId + '_no-video', true);
  }
});

rtc.client.on("unmute-video",function(evt){
	console.log("Remote stream: " + evt.uid + "has un-muted video");
	toggleVisibility('#' + evt.uid + '_no-video', false);
});

