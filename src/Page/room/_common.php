<?php
namespace App\Page\Room;

class _Common extends \Gt\Page\Logic {

public function go() {
	$itemArray = $this->document->querySelectorAll("li.grid-item")->nodeArray;
	shuffle($itemArray);

	foreach($itemArray as $item) {
		$item->parentNode->appendChild($item);
		$item->setAttribute("data-user", "nobody");
	}
}

}#