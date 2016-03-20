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

	xhr.open("GET", "/receive?time=" + (+dateLastListened));
	xhr.addEventListener("load", poll_load);
	xhr.send();
}

function poll_load() {
	var
		obj = JSON.parse(this.responseText),
	$$;
}

return {
	init: init,
};

})();