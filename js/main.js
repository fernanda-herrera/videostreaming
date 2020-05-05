var name;
var videoContainer;
var muteMic = false;
var muteCam = false;

function entrarAlChat(){
	name = document.getElementById("myInput").value;
	console.log(name);
	videoContainer = document.getElementById("vid-list");
   	initializeClient();
}



//add dom local streaming
function addVidContainer(idElement,local){
	var div = document.createElement("div");
	var nametxt = document.createTextNode(name);
	div.appendChild(nametxt);
	if(local)
	{
		muteMic = true;
		muteCam = false;
		var mic = document.createElement("BUTTON");
		mic.innerHTML = "mic";
		mic.setAttribute("onclick",'muteLocalMic()');
		var cam = document.createElement("BUTTON");
		cam.innerHTML = "cam";
		cam.setAttribute("onclick",'muteLocalVideo()');
		var leave = document.createElement("BUTTON");
		leave.innerHTML = "leave"
		leave.setAttribute("onclick",'leaveChanelLocal()');
		div.appendChild(mic);
		div.appendChild(cam);
		div.appendChild(leave);
	}
	div.classList.add('video-Container');
	div.setAttribute("id",'uid:' + idElement);
	videoContainer.appendChild(div);

}

function removeVidContainer(idElement){
	console.log(idElement);
	document.getElementById(idElement).remove();
}


function muteLocalMic(){
	if(muteMic == false){
		muteMic = true;
		rtc.localStream.disableAudio();
	}else{
		muteMic = false;
		rtc.localStream.enableAudio();

	}
}

function muteLocalVideo(){
	if(muteCam == false){
		muteCam = true;
		rtc.localStream.disableVideo();
	}else{
		muteCam = false;
		rtc.localStream.enableVideo();

	}
}