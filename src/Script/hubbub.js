;location.pathname.match(/^\/room\//)
&&window.addEventListener("load", function() {

var
	talkBtn = document.getElementById("talk"),
	audio_context,
	recorder,
$$;

;(function go() {
	hubbub.transmit.init();

	talkBtn.addEventListener("mousedown", mousedown);
	talkBtn.addEventListener("mouseup", mouseup);

	hubbub.transmit.setCallback(complete);
})();

function mousedown() {
	hubbub.transmit.talk_start();
}

function mouseup() {
	console.log("mouse is up!");
	hubbub.transmit.talk_end();
	talkBtn.disabled = true;
}

function complete() {
	talkBtn.disabled = false;
}

});//#