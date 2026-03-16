<?php

namespace Zazama\ElementalLinkify;

use SilverStripe\Core\Manifest\ModuleLoader;
use SilverStripe\TinyMCE\TinyMCEConfig;
use SilverStripe\View\Parsers\ShortcodeParser;

$module = ModuleLoader::inst()->getManifest()->getModule('zazama/silverstripe-elemental-linkify');
TinyMCEConfig::get('cms')->enablePlugins([
    'sslinkelemental' => $module->getResource('client/dist/js/TinyMCE_sslink-elemental.js')
]);

ShortcodeParser::get('default')->register('elemental_link', [ElementalLinkifyShortcodeParser::class, 'parse']);
