<?php
namespace App\Page;

use Gt\Core\Path;
use DateTime;
use DateInterval;
use DirectoryIterator;

class Transmit extends \Gt\Page\Logic {

private $dateTime;

public function go() {
	$this->dateTime = new DateTime();

	if(empty($_SESSION["User"])) {
		$_SESSION["User"] = uniqid();
	}

	$dateString = $this->dateTime->getTimestamp();
	$userString = $_SESSION["User"];
	$fileString = $dateString . "_" . $userString;

	$this->uploadPath = implode("/", [
		Path::get(Path::WWW),
		"Sound"
	]);
	$wwwPath = implode("/", [
		$this->uploadPath,
		$fileString . ".wav",
	]);

	if(!is_dir($this->uploadPath)) {
		mkdir($this->uploadPath, 0775, true);
	}

	if(!empty($_FILES)) {
		move_uploaded_file($_FILES["sound"]["tmp_name"], $wwwPath);
	}

	$this->tidy();
}

/**
 * Delete any uploads older than expiry time.
 */
private function tidy() {
	$expired = clone $this->dateTime;
	$expired->sub(new DateInterval("PT2M"));

	foreach (new DirectoryIterator($this->uploadPath) as $fileInfo) {
		if($fileInfo->isDot()) {
			continue;
		}

		$filename = $fileInfo->getFilename();
		$dateFromFile = strtok($filename, "_");
		$dateTimeFile = new DateTime($dateFromFile);

		if($dateTimeFile < $expired) {
			unlink($fileInfo->getPathname());
		}
	}
}

}#