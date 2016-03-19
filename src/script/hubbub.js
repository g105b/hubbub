;location.pathname.match(/^\/room\//)
&&window.addEventListener("load", function() {

var
	talkBtn = document.getElementById("talk"),
	audio_context,
	recorder,
$$;

;(function go() {
	talkBtn.addEventListener("mousedown", talk_start);
	talkBtn.addEventListener("mouseup", talk_end);

	try {
		// webkit shim
		window.AudioContext =
			window.AudioContext || window.webkitAudioContext;
		navigator.getUserMedia =
			navigator.getUserMedia || navigator.webkitGetUserMedia;
		window.URL = window.URL || window.webkitURL;

		audio_context = new AudioContext;

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
})();

function startUserMedia(stream) {
	var input = audio_context.createMediaStreamSource(stream);
	console.log('Media stream created.');

	// Uncomment if you want the audio to feedback directly
	//input.connect(audio_context.destination);

	recorder = new Recorder(input);

	console.log('Recorder initialised.');
}

function talk_start() {
	recorder && recorder.record();
	console.log("recording...");
}

function talk_end() {
	recorder && recorder.stop();
	upload();
}

function upload() {
	recorder && recorder.exportWAV(function(blob) {
		console.log(blob);

		var
			fd = new FormData(),
		$$;

		fd.append("sound", blob);
	});
}

});//#