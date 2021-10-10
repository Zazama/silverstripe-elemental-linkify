<?php

namespace Zazama\ElementalLinkify;
use SilverStripe\ORM\DataObject;
use DNADesign\Elemental\Models\BaseElement;

class ElementalLinkifyShortcodeParser {
    public static function parse($arguments, $content = null, $parser = null, $tagName = null)
    {
        if(!$arguments['id'] || !is_numeric($arguments['id'])) return '#';

        $element = DataObject::get_by_id(BaseElement::class, intval($arguments['id']));

        return $element ? $element->Link() : '#';
    }
}