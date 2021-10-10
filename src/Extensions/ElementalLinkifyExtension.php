<?php

namespace Zazama\ElementalLinkify\Extensions;

use Silverstripe\Core\Extension;
use SilverStripe\View\Requirements;

class ElementalLinkifyExtension extends Extension {
    public function updateClientConfig(&$clientConfig)
    {
        $clientConfig['form']['editorElementalLink'] = [
            'schemaUrl' => $this->getOwner()->Link('methodSchema/Modals/editorElementalLink')
        ];
    }

}