/* global tinymce, editorIdentifier, ss */
import i18n from 'i18n';
import TinyMCEActionRegistrar from 'lib/TinyMCEActionRegistrar';
import React from 'react';
import { createRoot } from 'react-dom/client';
import jQuery from 'jquery';
import { createInsertLinkModal } from 'containers/InsertLinkModal/InsertLinkModal';
import { loadComponent } from 'lib/Injector';

const commandName = 'sslinkelemental';

// Link to external url
TinyMCEActionRegistrar
  .addAction(
    'sslink',
    {
      text: i18n._t('CMS.LINKLABEL_PAGE', 'Element'),
      onAction: (activeEditor) => activeEditor.execCommand(commandName),
      priority: 20,
    },
  )
  .addCommandWithUrlTest(commandName, /^\[elemental_link.+]$/);

const plugin = {
  init(editor) {
    editor.addCommand(commandName, () => {
      const field = jQuery(`#${editor.id}`).entwine('ss');

      field.openLinkElementalDialog();
    });
  },
};

const modalId = 'insert-link__dialog-wrapper--elemental';
const sectionConfigKey = 'SilverStripe\\CMS\\Controllers\\CMSPageEditController';
const formName = 'editorElementalLink';
const InsertLinkElementalModal = provideInjector(createInsertLinkModal(sectionConfigKey, formName));

jQuery.entwine('ss', ($) => {
  $('textarea.htmleditor').entwine({
    openLinkElementalDialog() {
      let dialog = $(`#${modalId}`);

      if (!dialog.length) {
        dialog = $(`<div id="${modalId}" />`);
        $('body').append(dialog);
      }
      dialog.addClass('insert-link__dialog-wrapper');

      dialog.setElement(this);
      dialog.open();
    },
  });

  /**
   * Assumes that $('.insert-link__dialog-wrapper').entwine({}); is defined for shared functions
   */
  $(`#${modalId}`).entwine({
    ReactRoot: null,

    renderModal(isOpen) {
      const store = ss.store;
      const client = ss.apolloClient;
      const handleHide = () => this.close();
      const handleInsert = (...args) => this.handleInsert(...args);
      const attrs = this.getOriginalAttributes();
      const requireLinkText = this.getRequireLinkText();

      // create/update the react component
      let root = this.getReactRoot();
      if (!root) {
        root = createRoot(this[0]);
        this.setReactRoot(root);
      }
      root.render(
        <InsertLinkElementalModal
          isOpen={isOpen}
          onInsert={handleInsert}
          onClosed={handleHide}
          title={i18n._t('CMS.LINK_PAGE', 'Link to a page')}
          bodyClassName="modal__dialog"
          className="insert-link__dialog-wrapper--elemental"
          fileAttributes={attrs}
          identifier="Admin.InsertLinkElementalModal"
          requireLinkText={requireLinkText}
        />
      );
    },

    /**
     * Determine whether to show the link text field
     *
     * @return {Boolean}
     */
    getRequireLinkText() {
      const selection = this.getElement().getEditor().getInstance().selection;
      const selectionContent = selection.getContent() || '';
      const tagName = selection.getNode().tagName;
      const requireLinkText = tagName !== 'A' && selectionContent.trim() === '';

      return requireLinkText;
    },

    /**
     * @param {Object} data - Posted data
     * @return {Object}
     */
    buildAttributes(data) {
        const shortcode = ShortcodeSerialiser.serialise({
            name: 'elemental_link',
            properties: { id: data.ElementID },
          }, true);

          const href = `${shortcode}`;

          return {
            href,
            target: data.TargetBlank ? '_blank' : '',
            title: data.Description,
          };
    },

    getOriginalAttributes() {
      const editor = this.getElement().getEditor();
      const node = $(editor.getSelectedNode());

      // Get href
      const href = (node.attr('href') || '');
      if (!href) {
        return {};
      }

      // check if page is safe
      const shortcode = ShortcodeSerialiser.match('elemental_link', false, href);
      if (!shortcode) {
        return {};
      }

      return {
        ElementID: shortcode.properties.id ? parseInt(shortcode.properties.id, 10) : 0,
        Description: node.attr('title'),
        TargetBlank: !!node.attr('target')
      };
    },
  });
});

// Adds the plugin class to the list of available TinyMCE plugins
tinymce.PluginManager.add(commandName, (editor) => plugin.init(editor));

export default plugin;
