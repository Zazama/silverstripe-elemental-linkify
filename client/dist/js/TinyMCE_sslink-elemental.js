/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/legacy/TinyMCE_sslink-elemental.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/legacy/TinyMCE_sslink-elemental.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18n = __webpack_require__(8);

var _i18n2 = _interopRequireDefault(_i18n);

var _TinyMCEActionRegistrar = __webpack_require__(7);

var _TinyMCEActionRegistrar2 = _interopRequireDefault(_TinyMCEActionRegistrar);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(4);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactApollo = __webpack_require__(3);

var _reactRedux = __webpack_require__(5);

var _jquery = __webpack_require__(9);

var _jquery2 = _interopRequireDefault(_jquery);

var _ShortcodeSerialiser = __webpack_require__(6);

var _ShortcodeSerialiser2 = _interopRequireDefault(_ShortcodeSerialiser);

var _InsertLinkModal = __webpack_require__(1);

var _Injector = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commandName = 'sslinkelemental';

_TinyMCEActionRegistrar2.default.addAction('sslink', {
  text: _i18n2.default._t('CMS.LINKLABEL_PAGE', 'Element'),
  onclick: function onclick(activeEditor) {
    return activeEditor.execCommand(commandName);
  },
  priority: 20
}).addCommandWithUrlTest(commandName, /^\[elemental_link.+]$/);

var plugin = {
  init: function init(editor) {
    editor.addCommand(commandName, function () {
      var field = (0, _jquery2.default)('#' + editor.id).entwine('ss');

      field.openLinkElementalDialog();
    });
  }
};

var modalId = 'insert-link__dialog-wrapper--elemental';
var sectionConfigKey = 'SilverStripe\\CMS\\Controllers\\CMSPageEditController';
var formName = 'editorElementalLink';
var InsertLinkElementalModal = (0, _Injector.provideInjector)((0, _InsertLinkModal.createInsertLinkModal)(sectionConfigKey, formName));

_jquery2.default.entwine('ss', function ($) {
  $('textarea.htmleditor').entwine({
    openLinkElementalDialog: function openLinkElementalDialog() {
      var dialog = $('#' + modalId);

      if (!dialog.length) {
        dialog = $('<div id="' + modalId + '" />');
        $('body').append(dialog);
      }
      dialog.addClass('insert-link__dialog-wrapper');

      dialog.setElement(this);
      dialog.open();
    }
  });

  $('#' + modalId).entwine({
    renderModal: function renderModal(isOpen) {
      var _this = this;

      var store = ss.store;
      var client = ss.apolloClient;
      var handleHide = function handleHide() {
        return _this.close();
      };
      var handleInsert = function handleInsert() {
        return _this.handleInsert.apply(_this, arguments);
      };
      var attrs = this.getOriginalAttributes();
      var requireLinkText = this.getRequireLinkText();

      _reactDom2.default.render(_react2.default.createElement(
        _reactApollo.ApolloProvider,
        { client: client },
        _react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(InsertLinkElementalModal, {
            isOpen: isOpen,
            onInsert: handleInsert,
            onClosed: handleHide,
            title: _i18n2.default._t('CMS.LINK_PAGE', 'Link to a page'),
            bodyClassName: 'modal__dialog',
            className: 'insert-link__dialog-wrapper--elemental',
            fileAttributes: attrs,
            identifier: 'Admin.InsertLinkElementalModal',
            requireLinkText: requireLinkText
          })
        )
      ), this[0]);
    },
    getRequireLinkText: function getRequireLinkText() {
      var selection = this.getElement().getEditor().getInstance().selection;
      var selectionContent = selection.getContent() || '';
      var tagName = selection.getNode().tagName;
      var requireLinkText = tagName !== 'A' && selectionContent.trim() === '';

      return requireLinkText;
    },
    buildAttributes: function buildAttributes(data) {
      var shortcode = _ShortcodeSerialiser2.default.serialise({
        name: 'elemental_link',
        properties: { id: data.ElementID }
      }, true);

      var href = '' + shortcode;

      return {
        href: href,
        target: data.TargetBlank ? '_blank' : '',
        title: data.Description
      };
    },
    getOriginalAttributes: function getOriginalAttributes() {
      var editor = this.getElement().getEditor();
      var node = $(editor.getSelectedNode());

      var href = node.attr('href') || '';
      if (!href) {
        return {};
      }

      var shortcode = _ShortcodeSerialiser2.default.match('elemental_link', false, href);
      if (!shortcode) {
        return {};
      }

      return {
        ElementID: shortcode.properties.id ? parseInt(shortcode.properties.id, 10) : 0,
        Description: node.attr('title'),
        TargetBlank: !!node.attr('target')
      };
    }
  });
});

tinymce.PluginManager.add(commandName, function (editor) {
  return plugin.init(editor);
});

exports.default = plugin;

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = InsertLinkModal;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = ReactApollo;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = ReactRedux;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = ShortcodeSerialiser;

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = TinyMCEActionRegistrar;

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = i18n;

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=TinyMCE_sslink-elemental.js.map