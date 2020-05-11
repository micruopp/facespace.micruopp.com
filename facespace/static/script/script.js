'use strict';

window.onload = main;

const statusBoxId = ".status.box";
const statusLabelId = ".activity-status";
const contentId = ".container";
const mainId = ".main";
const videoBoxId = ".videobox";

const hiddenClass = "hidden";

function main() {
	socket();
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

	videoBox.classList.remove(hiddenClass);
	mainBox.classList.add(hiddenClass);
	stream();
}

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