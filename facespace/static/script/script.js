"use strict";

window.onload = main;

function main() {
	console.log("Hello, FaceSpace!");

	socket();
}

function socket() {
	let addr = 'wss://facespace.micruopp.com';
	let ws = new WebSocket(addr);

	ws.onmessage = event => console.log(event.data);

	let delay = 1.0;
	function fn() {
		ws.send("ping");
		setTimeout(fn, delay);
	}

	ws.onopen = function() {		
		setTimeout(fn, delay);
	};
}