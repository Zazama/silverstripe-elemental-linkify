<?php

namespace Zazama\ElementalLinkify\Forms;

use Silverstripe\Core\Extension;
use SilverStripe\View\Requirements;
use Zazama\Phonify\EditorPhoneLinkFormFactory;

class ElementalLinkifyModal extends Extension
{
    private static $allowed_actions = array(
        'editorElementalLink'
    );

    public function editorElementalLink() {
        $factory = ElementalLinkifyFormFactory::singleton();
        return $factory->getForm(
            $this->getOwner()->controller,
            "{$this->getOwner()->name}/editorElementalLink",
            [ 'RequireLinkText' => false ]
        );
    }
}