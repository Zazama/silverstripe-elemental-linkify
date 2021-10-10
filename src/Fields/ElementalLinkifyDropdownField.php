<?php

namespace Zazama\ElementalLinkify\Fields;
use SilverStripe\Forms\DropdownField;
use SilverStripe\CMS\Model\SiteTree;

class ElementalLinkifyDropdownField extends DropdownField {
    public function __construct($name, $title = null)
    {
        parent::__construct($name, $title, $this->collectAllElements());
        $this->setEmptyString('');
    }

    private function collectAllElements() {
        $pages = SiteTree::get();

        $collectedElements = [];
        foreach($pages as $page) {
            $collectedElements['[sitetree_link,id=' . $page->ID . ']'] = $page->Title;
            if ($page->hasMethod('supportsElemental') && $page->supportsElemental()) {
                $elementalAreas = $page->getElementalRelations();
                foreach ($elementalAreas as $areaName) {
                    foreach ($page->$areaName->Elements() as $element) {
                        $collectedElements['[elemental_link,id=' . $element->ID . ']'] = '...' . $element->Title;
                    }
                }
            }
        }

        return $collectedElements;
    }
}