"use strict";

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
		showVideoPlayers();
		setTimeout(fn, delay);
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
}