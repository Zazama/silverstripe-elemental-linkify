<?php

namespace Zazama\ElementalLinkify\Fields;
use SilverStripe\ORM\FieldType\DBHTMLVarchar;
use SilverStripe\View\Parsers\ShortcodeParser;

class DBElementalLinkifyShortcode extends DBHTMLVarchar {
    public function RAW()
    {
        return ShortcodeParser::get_active()->parse($this->value);
    }

    public function scaffoldFormField($title = null, $params = null)
    {
        return ElementalLinkifyDropdownField::create($this->name, $title);
    }
}