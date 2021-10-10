<?php

namespace Zazama\ElementalLinkify;
use SilverStripe\ORM\FieldType\DBHTMLVarchar;
use SilverStripe\View\Parsers\ShortcodeParser;

class DBElementalLinkifyShortcode extends DBHTMLVarchar {
    public function RAW()
    {
        return ShortcodeParser::get_active()->parse($this->value);
    }
}