;window.hubbub = window.hubbub || {};
window.hubbub.receive = (function() {

var
	dateLastListened = new Date(),
	buffer = 500,
$$;

function init() {
	who();

	setTimeout(poll, 2000);
}

function who() {
	var
		xhr = new XMLHttpRequest(),
	$$;

	xhr.open("GET", "/who");
	xhr.addEventListener("load", who_load);
	xhr.send();
}

function who_load() {
	var
		obj = JSON.parse(this.responseText),
		i = 0,
		len = obj.length,
		el,
	$$;

	for(; i < len; i++) {
		el = document.querySelector("[data-user='" + obj[i] + "']");
		if(!el) {
			createUser(obj[i]);
		}
	}

	[].forEach.call(document.querySelectorAll("[data-user]"), function(u) {
		var uid = u.getAttribute("data-user");

		if(obj.indexOf(uid) < 0) {
			removeUser(uid);
		}
	});

	setTimeout(who, 5000);
}

function createUser(uid) {
	var nobody = document.querySelector("[data-user='nobody']");
	nobody.setAttribute("data-user", uid);
}

function removeUser(uid) {
	var person = document.querySelector("[data-user='" + uid + "']");
	person.setAttribute("data-user", "nobody");
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

	setTimeout(poll, buffer);
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
	var
		userEl = document.querySelector("[data-user='" + user + "']"),
	$$;

	if(!userEl) {
		userEl = document.querySelector("[data-user='nobody']");
		userEl.setAttribute("data-user", user);
	}

	userEl.classList.add("talking");

	(function(c_userEl) {
		audio.addEventListener("ended", function() {
			c_userEl.classList.remove("talking");
		});
	})(userEl);
}

return {
	init: init,
};

})();