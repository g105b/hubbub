<?php
namespace App\Page;

use StdClass;
use DirectoryIterator;
use DateTime;
use Gt\Core\Path;

class Receive extends \Gt\Page\Logic {

public function go() {
	$this->uploadPath = implode("/", [
		Path::get(Path::WWW),
		"Sound"
	]);

	$arr = [];

	foreach (new DirectoryIterator($this->uploadPath) as $fileInfo) {
		if($fileInfo->isDot()) {
			continue;
		}

		$filename = $fileInfo->getFilename();
		$details = explode("_", $filename);

		$timeFile = $details[0];

		$obj = new StdClass();
		$obj->time = $timeFile;
		$obj->user = strtok($details[1], ".");

		if($obj->user == $_SESSION["User"]) {
			continue;
		}

		if($obj->time < $_GET["time"]) {
			continue;
		}

		$obj->path = "/Sound/" . $filename;

		$arr []= $obj;
	}

	echo json_encode($arr);
	die();
}

}#