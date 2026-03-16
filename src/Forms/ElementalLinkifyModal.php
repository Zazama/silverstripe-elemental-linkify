<?php

namespace Zazama\ElementalLinkify\Forms;

use Silverstripe\Core\Extension;

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