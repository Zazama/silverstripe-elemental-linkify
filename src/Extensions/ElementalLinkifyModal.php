<?php

namespace Zazama\ElementalLinkify\Extensions;

use Silverstripe\Core\Extension;
use Zazama\ElementalLinkify\Forms\ElementalLinkifyFormFactory;

class ElementalLinkifyModal extends Extension
{
    private static $allowed_actions = [
        'EditorElementalLink'
    ];

    private static $link_modal_form_factories = [
        'EditorElementalLink' => ElementalLinkifyFormFactory::class
    ];

    public function EditorElementalLink() {
        $factory = ElementalLinkifyFormFactory::singleton();
        return $factory->getForm(
            $this->getOwner(),
            "EditorElementalLink",
            [ 'RequireLinkText' => false ]
        );
    }
}