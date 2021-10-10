<?php

namespace Zazama\ElementalLinkify;

use SilverStripe\View\Parsers\ShortcodeParser;
use SilverStripe\Forms\HTMLEditor\HtmlEditorConfig;
use SilverStripe\Core\Manifest\ModuleLoader;

HtmlEditorConfig::get('cms')->enablePlugins([
    'sslinkelemental' => ModuleLoader::getModule('silverstripe-elemental-linkify')->getResource('client/dist/js/TinyMCE_sslink-elemental.js')->getRelativePath()
]);

ShortcodeParser::get('default')->register('elemental_link', [ElementalLinkifyShortcodeParser::class, 'parse']);