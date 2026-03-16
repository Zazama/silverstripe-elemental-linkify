<?php

namespace Zazama\ElementalLinkify\Extensions;

use Silverstripe\Core\Extension;

class ElementalLinkifyExtension extends Extension {
    public function updateClientConfig(&$clientConfig)
    {
        $clientConfig['form']['editorElementalLink'] = [
            'schemaUrl' => $this->getOwner()->Link('methodSchema/Modals/editorElementalLink')
        ];
    }

}