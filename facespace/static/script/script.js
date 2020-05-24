'use strict';

window.onload = main;

function main() {

	initializeSocket();
	streamLocalCamera();
	
}

// Camera Access

let localStream = null;
let otherStream = null;

let localVideoElement = null;
let otherVideoElement = null;

function requestCameraAccess() {

	function handleAccessGrant(cameraStream) {
		localVideoElement = document.querySelector('#local-video-player');
		localStream = cameraStream;
		localVideoElement.srcObject = cameraStream;
		localVideoElement.onloadedmetadata = function(e) { localVideoElement.play() };
	}

	function handleAccessDeny(err) {
		console.log(err);
	}

	if (window.isSecureContext) { 
		let constraints = { audio: true, video: true };
		navigator.mediaDevices.getUserMedia(constraints)
			.then(handleAccessGrant)
			.catch(handleAccessDeny);
	} else {
		console.log("Not a secure context. Exiting...");
	}

}

// Socket

let socketAddr = 'wss://facespace.micruopp.com';
let wss = null;

function initializeSocket() {
	wss = new WebSocket(socketAddr);

	// TODO: set binary type
	// wss.binaryType = 'blob' || 'arrayBuffer';

	// TODO: write event handlers
	wss.onopen = handleSocketOpen;
	wss.onmessage = handleSocketReceiveMessage;
	wss.onclose = handleSocketClose;
	wss.onerror = handleSocketError;
}


let delay = 1000; // ms
function fn() {
	wss.send("ping");
	setTimeout(fn, delay);
}

function handleSocketOpen(e) {
	// setTimeout(fn, delay);
}

function handleSocketClose(e) {}

function handleSocketReceiveMessage(e) {
	console.log(e.data);
}

function handleSocketError(e) {}

// Streaming

function streamLocalCamera() {
	requestCameraAccess();
}









































const statusBoxId = ".status.box";
const statusLabelId = ".activity-status";
const contentId = ".container";
const mainId = ".main";
const footerId = ".footer";
const videoBoxId = ".videobox";
const hiddenClass = "hidden";

function __main() {

	function stream() {
		let player1 = document.querySelector('video');

		if (window.isSecureContext) { 
			console.log("Context is secure.");

			let constraints = { audio: true, video: true };

			navigator.mediaDevices.getUserMedia(constraints)
				.then(function(stream) {
				  /* use the stream */
				  console.log("Got stream.");
				  console.log(stream);

				  player1.srcObject = stream;
				  player1.onloadedmetadata = function(e) {
				    player1.play();
				  };
				})
				.catch(function(err) {
				  /* handle the error */
				  console.log("Uh-oh...");
				  console.log(err);
				});

		} else {
			console.log("Not a secure context.");
		}
	}

	function socket() {
		let addr = 'wss://facespace.micruopp.com';
		let ws = new WebSocket(addr);

		let delay = 1000; // ms
		function fn() {
			ws.send("ping");
			setTimeout(fn, delay);
		}

		ws.onopen = function(event) {
			setTimeout(fn, delay);
			showVideoPlayers();
		};

		ws.onmessage = function(event) {
			console.log(event.data);
		};
	}

	function showVideoPlayers() {
		let videoBox = document.querySelector(videoBoxId);
		let mainBox = document.querySelector(mainId);
		let footerBox = document.querySelector(footerId);

		videoBox.classList.remove(hiddenClass);
		mainBox.classList.add(hiddenClass);
		footerBox.classList.add(hiddenClass);

		stream();
	}

	socket();
}


