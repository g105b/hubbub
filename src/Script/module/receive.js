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
		i,
	$$;

	for(i = 0, len = obj.length; i < len; i++) {
		play(obj[i].path);
	}

	dateLastListened = new Date();
	setTimeout(poll, 2000);
}

function play(path) {
	console.log("PLAYING: " + path);
}

return {
	init: init,
};

})();