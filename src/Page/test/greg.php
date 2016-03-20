<?php
namespace App\Page\test;

class Greg extends \Gt\Page\Logic {

public function go() {
	while(count($this->document->head->childNodes) > 0) {
		$this->document->head->childNodes[0]->remove();

	}
}

}#