"use strict";
(globalThis["webpackChunkbetterlinks"] = globalThis["webpackChunkbetterlinks"] || []).push([["broken-links"],{

/***/ "./dev_betterlinks/components/Teasers/BrokenLinks.js":
/*!***********************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/BrokenLinks.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BrokenLinks)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/esm/TextField/TextField.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _Badge_ProBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");







var weekOption = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');



var propTypes = {};
function BrokenLinks() {
  return betterLinksHooks.applyFilters('betterLinksSettingsBrokenLinkChecker', (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Teaser, null));
}
function Teaser(props) {
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_5__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  var is_pro_updated = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_3__.pro_version_check)('2.1.5');
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(React.Fragment, null, !is_pro_updated && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-notes notice notice-warning",
    style: {
      marginLeft: 0,
      padding: '5px',
      fontSize: '12px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Note, {
    note: "In this update, we've relocated the BetterLinks Broken Link Checker. To access it from the new location, please update the BetterLinks Pro plugin to at least v2.1.1. If you haven\u2019t updated yet, you can still find the Broken Link Checker on the settings page."
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-tab-panel-inner btl-broken-links-panel btl-broken-links-panel-disabled"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-broken-link-checker-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-broken-link-checker",
    style: {
      width: '55%'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Scheduled Scan', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('“Scheduled Scan”', 'betterlinks')), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('to automatically scan broken links on your website.', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Formik, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Form, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-role-item btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable Scheduled Scan', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
    type: "checkbox",
    className: "btl-check",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("sapan", {
    className: "text"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Frequency', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "btl-select",
    classNamePrefix: "btl",
    isDisabled: true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Day', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "scheduleweekdayselect"
  }, weekOption.map(function (day, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      key: index
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
      type: "radio",
      checked: false,
      disabled: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, day.slice(0, 3)));
  })))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Time', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_9__["default"], {
    disabled: true
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-scan-outputs",
    style: {
      marginTop: 30
    },
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-scan-output"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_3__.plugin_root_url + 'assets/images/padlock.svg',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h4", {
    className: "count"
  }, "0"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: "title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Total Links', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-scan-output"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_3__.plugin_root_url + 'assets/images/padlock.svg',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h4", {
    className: "count"
  }, "0"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: "title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Links Scanned', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-scan-output"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_3__.plugin_root_url + 'assets/images/padlock.svg',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h4", {
    className: "count"
  }, "0"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: "title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(' Broken Links Found', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-broken-link-checker"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Formik, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Form, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable Reporting', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
    type: "checkbox",
    className: "btl-check",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "text"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reporting Email', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
    type: "text",
    className: "btl-form-control",
    disabled: true
  })))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reporting Email Subject', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
    type: "text",
    className: "btl-form-control",
    disabled: true
  }))))))))));
}
BrokenLinks.propTypes = propTypes;

/***/ })

}]);
//# sourceMappingURL=broken-links.js.map