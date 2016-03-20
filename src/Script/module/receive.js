;window.hubbub = window.hubbub || {};
window.hubbub.receive = (function() {

var
	dateLastListened = new Date(),
$$;

function init() {
	poll();
}

function poll() {
	var
		xhr = new XMLHttpRequest(),
	$$;

	xhr.open("GET", "/receive?time=" + ~~(+dateLastListened / 1000));
	xhr.addEventListener("load", poll_load);
	xhr.send();
}

function poll_load() {
	var
		obj = JSON.parse(this.responseText),
		i = 0,
		len = obj.length
	$$;

	dateLastListened = new Date();

	console.log(len + " new sounds");

	for(; i < len; i++) {
		play(obj[i].path);
	}

	setTimeout(poll, 2000);
}

function play(path) {
	var
		audio = new Audio(path),
		user,
	$$;

	console.log("PLAYING: " + path);
	user = path.match(/^\/Sound\/.+_(.+)\.wav/)[1];
	showSound(user, audio);

	audio.play();
}

/**
 * @param {string} user User ID
 * @param {Audio} audio The actual playing audio file - get the amplitude?
 */
function showSound(user, audio) {

}

return {
	init: init,
};

})();