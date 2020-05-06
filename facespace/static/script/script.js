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

	let delay = 1000; // ms
	function fn() {
		ws.send("ping");
		setTimeout(fn, delay);
	}

	ws.onopen = function(event) {
		setTimeout(fn, delay);
	};
}