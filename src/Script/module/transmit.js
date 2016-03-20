;window.hubbub = window.hubbub || {};
window.hubbub.transmit = (function() {

var
	audio_context,
	recorder,
	callback,
	input,
	audioStream,
$$;

function init() {
	try {
		// webkit shim
		window.AudioContext =
			window.AudioContext || window.webkitAudioContext;
		navigator.getUserMedia =
			navigator.getUserMedia || navigator.webkitGetUserMedia;
		window.URL = window.URL || window.webkitURL;

		audio_context = new AudioContext();

		console.log('Audio context set up.');
		console.log('navigator.getUserMedia '
			+ (navigator.getUserMedia ? 'available.' : 'not present!'));
	}
	catch(e) {
		alert('No web audio support in this browser!');
	}

	navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
		console.log('No live audio input: ' + e);
	});
}

function startUserMedia(stream) {
	audioStream = stream;
	input = audio_context.createMediaStreamSource(audioStream);
	console.log('Media stream created.');

	// Uncomment if you want the audio to feedback directly
	//input.connect(audio_context.destination);

	recorder = new Recorder(input);

	console.log('Recorder initialised.');
}

function talk_start() {
	startUserMedia(audioStream);
	recorder && recorder.record();
	console.log("recording...");
}

function talk_end() {
	recorder && recorder.stop();
	upload();
}

function upload() {
	recorder && recorder.exportWAV(function(blob) {
		var
			fd = new FormData(),
			xhr = new XMLHttpRequest(),
		$$;

		console.log("uploading...");

		fd.append("sound", blob);
		xhr.open("POST", "/transmit");
		xhr.addEventListener("load", upload_cb);
		xhr.send(fd);
	});
}

function upload_cb() {
	console.log("uploaded.");
	callback();
}

function setCallback(cb) {
	callback = cb;
}

return {
	init: init,
	talk_start: talk_start,
	talk_end: talk_end,
	setCallback: setCallback,
}

})();//#