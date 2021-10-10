<?php

namespace Zazama\ElementalLinkify\Forms;

use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\RequiredFields;
use SilverStripe\Admin\Forms\LinkFormFactory;
use SilverStripe\CMS\Model\SiteTree;

class ElementalLinkifyFormFactory extends LinkFormFactory
{
    protected function getFormFields($controller, $name, $context)
    {
        $fields = FieldList::create([
            DropdownField::create(
                'ElementID',
                'Element',
                $this->collectAllElements()
            ),
            TextField::create(
                'Description',
                _t(__CLASS__.'.LINKDESCR', 'Link description')
            ),
            CheckboxField::create(
                'TargetBlank',
                _t(__CLASS__.'.LINKOPENNEWWIN', 'Open in new window/tab')
            )
        ]);
        if ($context['RequireLinkText']) {
            $fields->insertAfter('ElementID', TextField::create('Text', _t(__CLASS__.'.LINKTEXT', 'Link text')));
        }
        return $fields;
    }

    protected function getValidator($controller, $name, $context)
    {
        if ($context['RequireLinkText']) {
            return RequiredFields::create('ElementID');
        }
        return null;
    }

    private function collectAllElements() {
        $pages = SiteTree::get();

        $collectedElements = [];
        foreach($pages as $page) {
            if ($page->hasMethod('supportsElemental') && $page->supportsElemental()) {
                $elementalAreas = $page->getElementalRelations();
                foreach ($elementalAreas as $areaName) {
                    foreach ($page->$areaName->Elements() as $element) {
                        $collectedElements[$element->ID] = '[' . $page->dbObject('Title')->LimitCharacters(10, '...') . '] ' . $element->Title;
                    }
                }
            }
        }

        return $collectedElements;
    }
}