<?php
namespace App\Page;

use Gt\Core\Path;
use DirectoryIterator;

class Who extends \Gt\Page\Logic {

private $uploadPath;

public function go() {
	$this->uploadPath = implode("/", [
		Path::get(Path::WWW),
		"Sound"
	]);

	$userArray = [];

	foreach (new DirectoryIterator($this->uploadPath) as $fileInfo) {
		if($fileInfo->isDot()) {
			continue;
		}

		$filename = $fileInfo->getFilename();
		$details = explode("_", $filename);

		$user = strtok($details[1], ".");

		if(!in_array($user, $userArray)) {
			$userArray []= $user;
		}
	}

	die(json_encode($userArray));
}

}#