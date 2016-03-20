<?php
namespace App\Page;

use Gt\Core\Path;

class Transmit extends \Gt\Page\Logic {

private $dateTime;

public function go() {
	$this->dateTime = new DateTime();

	$dateString = $this->dateTime->format("Y-m-dTH:i:s");

	$this->uploadPath = implode("/", [
		Path::get(Path::WWW),
		"Upload"
	]);
	$wwwPath = implode("/", [
		$this->uploadPath,
		$dateString . ".wav",
	]);

	if(!is_dir($this->uploadPath)) {
		mkdir($this->uploadPath, 0775, true);
	}

	if(!empty($_FILES)) {
		move_uploaded_file($_FILES["sound"]["tmp_name"], $filePath);
	}

	$this->tidy();
}

/**
 * Delete any uploads older than expiry time.
 */
private function tidy() {
	$expired = (clone)$this->dateTime;
	$expired->sub(new DateInterval("PT10M"));

	foreach (new DirectoryIterator($this->uploadPath) as $fileInfo) {
		$filename = $fileInfo->getFilename();
		$dateFromFile = strtok($filename, ".");
		$dateTimeFile = new DateTime($dateFromFile);

		if($dateTimeFile < $expired) {
			unlink($fileInfo->getPathname());
		}
	}
}

}#