"use strict";

window.onload = main;

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
		console.log("Socket open.");
		console.log(event.data);
		setTimeout(fn, delay);
	};

	ws.onmessage = function(event) {
		console.log(event.data);
	};
}