# silverstripe-elemental-linkify

![Packagist Version](https://img.shields.io/packagist/v/Zazama/silverstripe-elemental-linkify?style=flat-square)
![GitHub](https://img.shields.io/github/license/Zazama/silverstripe-elemental-linkify?style=flat-square)

## Introduction

silverstripe-elemental-linkify inserts a link type into TinyMCE where you can choose Elemental elements to link to.
It also ships with a DBField that inserts a DropdownField into the CMS allowing you to choose both Page links or Elemental links.

## Requirements

* silverstripe/cms ^5

## Installation

```
composer require zazama/silverstripe-elemental-linkify
```

## Usage TinyMCE

Click on the link type "Element" which will open this window.

It will show a Dropdown with formatting: "[Pagename] Elementname"

![TinyMCE](https://zazama.de/assets/Uploads/elementallinktinymce.png?vid=3)


## Usage Shortcode Field
```php
<?php

use SilverStripe\ORM\DataObject;
use Zazama\ElementalLinkify\Fields\DBElementalLinkifyShortcode;
use Zazama\ElementalLinkify\Fields\ElementalLinkifyDropdownField;

class Teaser extends DataObject {
    // ...
    private static $db = [
        'TeaserLink' => DBElementalLinkifyShortcode::class
    ];

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        // TeaserLink will be auto populated, but you can insert the dropdown yourself with
        $fields->addFieldToTab('Root.Something', ElementalLinkifyDropdownField::create('TeaserLink', 'TeaserLink'));

        return $fields;
    }
}
```

![Dropdown](https://zazama.de/assets/Uploads/elementallinkfield.png?vid=3)