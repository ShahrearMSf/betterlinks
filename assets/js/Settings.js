"use strict";
(globalThis["webpackChunkbetterlinks"] = globalThis["webpackChunkbetterlinks"] || []).push([["Settings"],{

/***/ "./dev_betterlinks/components/CreateLinkExternally/index.js":
/*!******************************************************************!*\
  !*** ./dev_betterlinks/components/CreateLinkExternally/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Teasers_CreateLinkExternally__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Teasers/CreateLinkExternally */ "./dev_betterlinks/components/Teasers/CreateLinkExternally/index.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/data */ "./dev_betterlinks/utils/data.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Teasers/UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }












var CreateLinkExternally = function CreateLinkExternally(_ref) {
  var settings = _ref.settings,
    terms = _ref.terms,
    update_option = _ref.update_option;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Save Settings', 'betterlinks')),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    formSubmitText = _useState2[0],
    setFormSubmitText = _useState2[1];
  var isProUpdated = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_3__.pro_version_check)('1.9.4');
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_11__.Formik, {
    enableReinitialize: true,
    initialValues: _objectSpread({}, settings),
    onSubmit: function onSubmit(values) {
      var _values$cle;
      if (!_utils_helper__WEBPACK_IMPORTED_MODULE_3__.betterlinks_auth && values !== null && values !== void 0 && (_values$cle = values.cle) !== null && _values$cle !== void 0 && _values$cle.enable_cle) return;
      (0,_utils_helper__WEBPACK_IMPORTED_MODULE_3__.saveSettingsHandler)(values, update_option, setFormSubmitText);
    }
  }, function (props) {
    var _props$values, _props$values2, _props$values3, _props$values4, _props$values5;
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_11__.Form, {
      className: "btl-cle"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(Notes, null), ((_props$values = props.values) === null || _props$values === void 0 || (_props$values = _props$values.cle) === null || _props$values === void 0 ? void 0 : _props$values.enable_cle) && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(DragableButton, {
      cle: (_props$values2 = props.values) === null || _props$values2 === void 0 ? void 0 : _props$values2.cle
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(FreeSettings, {
      props: props,
      isLatestVersion: isProUpdated
    }), ((_props$values3 = props.values) === null || _props$values3 === void 0 || (_props$values3 = _props$values3.cle) === null || _props$values3 === void 0 ? void 0 : _props$values3.enable_cle) && ((_props$values4 = props.values) === null || _props$values4 === void 0 || (_props$values4 = _props$values4.cle) === null || _props$values4 === void 0 ? void 0 : _props$values4.advanced_options) && isProUpdated && betterLinksHooks.applyFilters('betterLinksCleAdvanced', (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_Teasers_CreateLinkExternally__WEBPACK_IMPORTED_MODULE_7__["default"], {
      props: props
    }), _objectSpread(_objectSpread({}, props), {}, {
      settings: settings,
      terms: terms,
      redirectType: _utils_data__WEBPACK_IMPORTED_MODULE_8__.redirectType,
      Select2: react_select__WEBPACK_IMPORTED_MODULE_12__["default"]
    })), !isProUpdated && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_Teasers_CreateLinkExternally__WEBPACK_IMPORTED_MODULE_7__["default"], {
      props: props
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "short-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("b", {
      style: {
        fontWeight: 700
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Note: ')), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('To Configure the Advanced Options, kindly ensure that you have updated to the latest version of BetterLinks Pro', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
      className: "button-primary btn-save-settings",
      type: "submit",
      style: {
        cursor: !!_utils_helper__WEBPACK_IMPORTED_MODULE_3__.betterlinks_auth || !((_props$values5 = props.values) !== null && _props$values5 !== void 0 && (_props$values5 = _props$values5.cle) !== null && _props$values5 !== void 0 && _props$values5.enable_cle) ? 'pointer' : 'not-allowed'
      }
    }, formSubmitText));
  }));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_13__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_4__.update_option, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_5__.connect)(null, mapDispatchToProps)(CreateLinkExternally));
var FreeSettings = function FreeSettings(_ref2) {
  var _props$values7, _props$values8, _props$values9, _props$values10, _props$values12;
  var props = _ref2.props,
    isLatestVersion = _ref2.isLatestVersion;
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_9__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    var _props$values6;
    var cle = props === null || props === void 0 || (_props$values6 = props.values) === null || _props$values6 === void 0 ? void 0 : _props$values6.cle;
    if (typeof cle === 'string') {
      cle = JSON.parse(cle);
    }
    if (!cle || !('powered_by' in cle)) {
      props.setFieldValue('cle.powered_by', true);
    }
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_10__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-form-label",
    style: {
      'min-width': '120px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Enable Quick Link Creation', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-form-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    className: "btl-check",
    name: "cle.enable_cle",
    type: "checkbox",
    onChange: function onChange(e) {
      return props.setFieldValue('cle.enable_cle', e.target.checked);
    },
    checked: (_props$values7 = props.values) === null || _props$values7 === void 0 || (_props$values7 = _props$values7.cle) === null || _props$values7 === void 0 ? void 0 : _props$values7.enable_cle
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('', 'betterlinks'))))), ((_props$values8 = props.values) === null || _props$values8 === void 0 || (_props$values8 = _props$values8.cle) === null || _props$values8 === void 0 ? void 0 : _props$values8.enable_cle) && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-form-label",
    style: {
      'min-width': '120px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Enable Powered By', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-form-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    className: "btl-check",
    name: "cle.powered_by",
    type: "checkbox",
    onChange: function onChange(e) {
      return props.setFieldValue('cle.powered_by', e.target.checked);
    },
    checked: (_props$values9 = props.values) === null || _props$values9 === void 0 || (_props$values9 = _props$values9.cle) === null || _props$values9 === void 0 ? void 0 : _props$values9.powered_by
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-form-label",
    style: {
      'min-width': '120px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Advanced Options', 'betterlinks'), !_utils_helper__WEBPACK_IMPORTED_MODULE_3__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    onClick: openUpgradeToProModal,
    className: "pro-badge"
  }, "Pro")), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-form-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field block"
  }, _utils_helper__WEBPACK_IMPORTED_MODULE_3__.is_pro_enabled && isLatestVersion ? (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    className: "btl-check",
    name: "cle.advanced_options",
    type: "checkbox",
    onChange: function onChange(e) {
      return props.setFieldValue('cle.advanced_options', e.target.checked);
    },
    checked: (_props$values10 = props.values) === null || _props$values10 === void 0 || (_props$values10 = _props$values10.cle) === null || _props$values10 === void 0 ? void 0 : _props$values10.advanced_options
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('', 'betterlinks'))) : (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    onClick: function onClick() {
      var _props$values11;
      return props.setFieldValue('cle.advanced_options', !((_props$values11 = props.values) !== null && _props$values11 !== void 0 && (_props$values11 = _props$values11.cle) !== null && _props$values11 !== void 0 && _props$values11.advanced_options));
    },
    className: "dashicons dashicons-arrow-".concat((_props$values12 = props.values) !== null && _props$values12 !== void 0 && (_props$values12 = _props$values12.cle) !== null && _props$values12 !== void 0 && _props$values12.advanced_options ? 'up' : 'down', "-alt2")
  }))))));
};
var Notes = function Notes() {
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-form-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "short-description"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("b", {
    style: {
      fontWeight: 700
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Note', 'betterlinks'), ": "), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('It will allow you to create ', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Quick Link ', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('directly from your bookmark. For more info, ', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("a", {
    className: "external-analytic-tooltip-anchor",
    href: "https://betterlinks.io/docs/configure-quick-link-creation/",
    target: "_blank",
    style: {
      color: 'inherit'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Click here', 'betterlinks')))));
};
var DragableButton = function DragableButton() {
  if (!_utils_helper__WEBPACK_IMPORTED_MODULE_3__.betterlinks_auth) {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "notice notice-error",
      style: {
        marginLeft: '0',
        marginBottom: '15px',
        padding: '10px'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)("'AUTH_KEY' is missing in your wp-config.php file. Please ensure that AUTH_KEY is defined in your wp-config.php file. For more info, ", 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("a", {
      className: "external-analytic-tooltip-anchor",
      href: "https://betterlinks.io/docs/configure-quick-link-creation/#8-toc-title",
      target: "_blank",
      style: {
        color: 'inherit'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Click here', 'betterlinks')));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-cle-dragable-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("a", {
    onClick: function onClick(e) {
      return e.preventDefault();
    },
    href: "javascript:location.href='".concat(_utils_helper__WEBPACK_IMPORTED_MODULE_3__.site_url, "/index.php?action=btl_cle&api_key=").concat(_utils_helper__WEBPACK_IMPORTED_MODULE_3__.betterlinks_auth, "&target_url='+escape(location.href)+'&title='+document.title"),
    className: "button button-primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Quick Link Creation', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Just Drag & Drop this button in your bookmark', 'betterlinks')));
};

/***/ }),

/***/ "./dev_betterlinks/components/Docs/index.js":
/*!**************************************************!*\
  !*** ./dev_betterlinks/components/Docs/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Docs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");





var propTypes = {};
function Docs(props) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-docs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-doc"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-doc__icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/doc.svg',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btl-doc__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Documentation', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "btl-doc__content"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get started by spending some time with the documentation to get familiar with BetterLinks. Create Shortened URLs and start cross-promoting your brands & products.', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://betterlinks.io/docs/",
    className: "btl-doc__url",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Documentation', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/arrow-right.svg',
    alt: ""
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-doc"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-doc__icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/user.svg',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btl-doc__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Need Help?', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "btl-doc__content"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Stuck with something? Feel free to reach out to our Live Chat agent or create a support ticket.', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wpdeveloper.com/support/",
    className: "btl-doc__url",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Help', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/arrow-right.svg',
    alt: ""
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-doc"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-doc__icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/community.svg',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btl-doc__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Join the Community', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "btl-doc__content"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Join the Facebook community and discuss with fellow developers and users. Best way to connect with people and get feedback on your projects.', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://www.facebook.com/groups/wpdeveloper.net/",
    className: "btl-doc__url",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Join the Community', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/arrow-right.svg',
    alt: ""
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-doc"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-doc__icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/heart.svg',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btl-doc__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Your Love', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "btl-doc__content"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('We love to have you in BetterLinks family. We are making it more awesome everyday. Take your 2 minutes to review the plugin and spread the love to encourage us to keep it going.', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wpdeveloper.com/review-betterlinks",
    className: "btl-doc__url",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Leave a Review', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/arrow-right.svg',
    alt: ""
  })))));
}
Docs.propTypes = propTypes;

/***/ }),

/***/ "./dev_betterlinks/components/FluentBoardSettings/index.js":
/*!*****************************************************************!*\
  !*** ./dev_betterlinks/components/FluentBoardSettings/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Terms_Category__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Terms/Category */ "./dev_betterlinks/components/Terms/Category.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }










var FluentBoardSettings = function FluentBoardSettings(_ref) {
  var settings = _ref.settings,
    terms = _ref.terms,
    update_option = _ref.update_option,
    fetch_terms_data = _ref.fetch_terms_data;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Settings', 'betterlinks')),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    formSubmitText = _useState2[0],
    setFormSubmitText = _useState2[1];
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_9__.Formik, {
    enableReinitialize: true,
    initialValues: _objectSpread({}, settings),
    onSubmit: function onSubmit(values) {
      (0,_utils_helper__WEBPACK_IMPORTED_MODULE_8__.saveSettingsHandler)(values, update_option, setFormSubmitText);
      fetch_terms_data();
    }
  }, function (props) {
    var _props$values;
    var fbs = props.values.fbs;
    var urlOnDeleteValue = deleteOnActions.filter(function (item) {
      return item.value === ((fbs === null || fbs === void 0 ? void 0 : fbs.delete_on) || 'task_delete');
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_9__.Form, {
      className: "btl-fbs"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label",
      style: {
        'min-width': '245px'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Link Management', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip",
      style: {
        marginLeft: '5px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext",
      style: tooltipStyles.tooltipText
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enabling this option will allow you to create short links for tasks directly within the Fluent Boards. For more info, ', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("a", {
      href: "https://betterlinks.io/docs/fluent-boards-link-management-with-betterlinks",
      target: "_blank",
      style: tooltipStyles.tooltipTextAnchor
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Click Here', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-form-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
      className: "btl-check",
      name: "fbs.enable_fbs",
      type: "checkbox",
      onChange: function onChange(e) {
        return props.setFieldValue('fbs.enable_fbs', e.target.checked);
      },
      checked: fbs === null || fbs === void 0 ? void 0 : fbs.enable_fbs
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('', 'betterlinks'))))), ((_props$values = props.values) === null || _props$values === void 0 || (_props$values = _props$values.fbs) === null || _props$values === void 0 ? void 0 : _props$values.enable_fbs) && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label",
      style: {
        'min-width': '245px'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose a Default Category', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip",
      style: {
        marginLeft: '5px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext",
      style: tooltipStyles.tooltipText
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This category will be assigned by default when you create links inside Fluent Boards for your tasks. You can manage your links from BetterLinks Dashboard afterwards.', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-form-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_Terms_Category__WEBPACK_IMPORTED_MODULE_4__["default"], {
      catId: parseInt(fbs === null || fbs === void 0 ? void 0 : fbs.cat_id),
      data: {
        terms: terms
      },
      fieldName: "fbs.cat_id",
      setFieldValue: props.setFieldValue
    }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label",
      style: {
        'min-width': '245px'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Category on Dashboard', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip",
      style: {
        marginLeft: '5px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext",
      style: tooltipStyles.tooltipText
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable this option to display the selected category in Manage Links.', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-form-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
      className: "btl-check",
      name: "fbs.show_fbs_category",
      type: "checkbox",
      onChange: function onChange(e) {
        return props.setFieldValue('fbs.show_fbs_category', e.target.checked);
      },
      checked: fbs === null || fbs === void 0 ? void 0 : fbs.show_fbs_category
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label",
      style: {
        'min-width': '245px'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Delete Link on', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip",
      style: {
        marginLeft: '5px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext",
      style: tooltipStyles.tooltipText
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('By selecting these options, you can specify when to delete Fluent Board Links created by BetterLinks.', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-form-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_10__["default"], {
      className: "btl-modal-select--full",
      classNamePrefix: "btl-react-select",
      id: 'fbs.delete_on',
      name: 'fbs.delete_on',
      defaultValue: urlOnDeleteValue,
      onChange: function onChange(option) {
        if (option === null) {
          return props.setFieldValue('fbs.delete_on', '');
        }
        return props.setFieldValue('fbs.delete_on', option.value);
      },
      options: deleteOnActions,
      value: urlOnDeleteValue,
      isMulti: false
    })))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
      className: "button-primary btn-save-settings",
      type: "submit"
    }, formSubmitText));
  }));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_6__.update_option, dispatch),
    fetch_terms_data: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_7__.fetch_terms_data, dispatch)
  };
};
var tooltipStyles = {
  tooltipText: {
    width: '255px',
    textAlign: 'left',
    lineHeight: '1.2em'
  },
  tooltipTextAnchor: {
    color: 'inherit'
  }
};
var deleteOnActions = [{
  value: 'task_delete',
  label: 'Task Delete'
}, {
  value: 'task_archive',
  label: 'Task Archive'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_5__.connect)(null, mapDispatchToProps)(FluentBoardSettings));

/***/ }),

/***/ "./dev_betterlinks/components/RedirectType/index.js":
/*!**********************************************************!*\
  !*** ./dev_betterlinks/components/RedirectType/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }





var RedirectType = function RedirectType(props) {
  var _useField = (0,formik__WEBPACK_IMPORTED_MODULE_5__.useField)(props.name),
    _useField2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useField, 3),
    field = _useField2[0],
    setThisFieldValue = _useField2[2].setValue;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((field === null || field === void 0 ? void 0 : field.value) != 'cloak' && _utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled ? field : {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('307 (Temporary)', 'betterlinks'),
      value: '307'
    }),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    selectValue = _useState2[0],
    setSelectValue = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if ((field === null || field === void 0 ? void 0 : field.value) === 'pro') {
      setThisFieldValue(selectValue === null || selectValue === void 0 ? void 0 : selectValue.value, false);
      props.setFieldValue(field.name, selectValue === null || selectValue === void 0 ? void 0 : selectValue.value);
    } else {
      setSelectValue((props.value || []).find(function (item) {
        return item.value == field.value;
      }));
    }
  }, []);
  var onChange = function onChange(option) {
    if (option == null) {
      return props.setFieldValue(field.name, '');
    }
    // for quick setup wizard only
    if (!!(props !== null && props !== void 0 && props.isQuickSetup)) {
      if ((option === null || option === void 0 ? void 0 : option.value) === 'pro') {
        props.setUpgradeToProModal(true);
        setThisFieldValue(selectValue === null || selectValue === void 0 ? void 0 : selectValue.value, field.value);
        props.setFieldValue(field.name, field.value);
      } else {
        props.setFieldValue(field.name, option === null || option === void 0 ? void 0 : option.value);
        setSelectValue((props.value || []).find(function (item) {
          return item.value == option.value;
        }));
      }
      props === null || props === void 0 || props.setSettings(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          redirect_type: props.isMulti ? option.map(function (item) {
            return item.value;
          }) : option.value !== 'pro' ? option.value : field.value
        });
      });
    }
    // for quick setup wizard only
    return props.setFieldValue(field.name, props.isMulti ? option.map(function (item) {
      return item.value;
    }) : option.value !== 'pro' ? option.value : field.value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "btl-modal-select--full ".concat(props.value && props.value.find(function (item) {
      return item.value == 'pro';
    }) ? 'btl-modal-select-need-pro-teaser' : ''),
    classNamePrefix: "btl-react-select",
    id: field.id,
    name: field.name,
    defaultValue: props.value && props.value.filter(function (item) {
      return item.value == (props.defaultValue || '307');
    }),
    onChange: onChange,
    options: props.value,
    value: selectValue,
    isMulti: props.isMulti
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RedirectType);

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/AffiliateLinkDisclosure/index.js":
/*!*****************************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/AffiliateLinkDisclosure/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-quill */ "./node_modules/react-quill/lib/index.js");
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_quill__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utility_CheckList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utility/CheckList */ "./dev_betterlinks/components/Teasers/utility/CheckList.js");
/* harmony import */ var _utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utility/SelectTeaser */ "./dev_betterlinks/components/Teasers/utility/SelectTeaser.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }












var AffiliateLinkDisclosure = function AffiliateLinkDisclosure(_ref) {
  var settings = _ref.settings,
    update_option = _ref.update_option,
    postTypes = _ref.postTypes;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Save Settings', 'betterlinks')),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    formSubmitText = _useState2[0],
    setFormSubmitText = _useState2[1];
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_5__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_12__.Formik, {
    enableReinitialize: true,
    initialValues: _objectSpread({}, settings),
    onSubmit: function onSubmit(values) {
      return (0,_utils_helper__WEBPACK_IMPORTED_MODULE_6__.saveSettingsHandler)(values, update_option, setFormSubmitText);
    }
  }, function (props) {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_12__.Form, null, !_utils_helper__WEBPACK_IMPORTED_MODULE_6__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Affiliate Link Disclosure', 'betterlinks'),
      onClick: openUpgradeToProModal
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Preview', 'betterlinks'),
      onClick: openUpgradeToProModal
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_11__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable by Default', 'betterlinks'),
      onClick: openUpgradeToProModal
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_11__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Disclosure Position', 'betterlinks'),
      onClick: openUpgradeToProModal
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-role-item btl-form-group",
      style: {
        marginBottom: '60px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Disclosure Content', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)((react_quill__WEBPACK_IMPORTED_MODULE_9___default()), {
      theme: "snow",
      value: "",
      onChange: openUpgradeToProModal
    }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Advanced Options', 'betterlinks'),
      onClick: openUpgradeToProModal
    })), betterLinksHooks.applyFilters('BetterLinksOptionsTabSettings', null, _objectSpread(_objectSpread({}, props), {}, {
      postTypes: postTypes,
      ReactQuill: (react_quill__WEBPACK_IMPORTED_MODULE_9___default())
    })), _utils_helper__WEBPACK_IMPORTED_MODULE_6__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
      className: "button-primary btn-save-settings",
      type: "submit"
    }, formSubmitText)));
  }));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_13__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_8__.update_option, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_7__.connect)(null, mapDispatchToProps)(AffiliateLinkDisclosure));

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/AutoLinkCreate/index.js":
/*!********************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/AutoLinkCreate/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoLinkCreate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utility_CheckList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility/CheckList */ "./dev_betterlinks/components/Teasers/utility/CheckList.js");
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utility/SelectTeaser */ "./dev_betterlinks/components/Teasers/utility/SelectTeaser.js");









function AutoLinkCreate(_ref) {
  var autoCreateLinkSettings = _ref.autoCreateLinkSettings,
    terms = _ref.terms,
    setAutoCreateLinkSettings = _ref.setAutoCreateLinkSettings;
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_6__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, !_utils_helper__WEBPACK_IMPORTED_MODULE_5__.is_pro_enabled ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_8__.Formik, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_8__.Form, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable Auto-Create Links', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Post Shortlinks', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('BetterLinks Category'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Page Shortlinks', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('BetterLinks Category'),
    onClick: openUpgradeToProModal
  })))) : betterLinksHooks.applyFilters('BetterLinksAutoCreateLinksPro', null, {
    autoCreateLinkSettings: autoCreateLinkSettings,
    terms: terms,
    setAutoCreateLinkSettings: setAutoCreateLinkSettings
  }));
}

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/AutoLinkKeywords/index.js":
/*!**********************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/AutoLinkKeywords/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _utility_CheckList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utility/CheckList */ "./dev_betterlinks/components/Teasers/utility/CheckList.js");
/* harmony import */ var _utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utility/SelectTeaser */ "./dev_betterlinks/components/Teasers/utility/SelectTeaser.js");
/* harmony import */ var _utility_InputTeaser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utility/InputTeaser */ "./dev_betterlinks/components/Teasers/utility/InputTeaser.js");
/* harmony import */ var _CompatibilityNotice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../CompatibilityNotice */ "./dev_betterlinks/components/Teasers/CompatibilityNotice/index.js");













var AutoLinkKeywords = function AutoLinkKeywords(_ref) {
  var settings = _ref.settings,
    postdatas = _ref.postdatas,
    update_option = _ref.update_option;
  return betterLinksHooks.applyFilters('BetterLinksAutoLinkKeywords', (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Teaser, null), {
    settings: settings,
    postdatas: postdatas,
    update_option: update_option,
    saveSettingsHandler: _utils_helper__WEBPACK_IMPORTED_MODULE_6__.saveSettingsHandler
  });
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_12__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_4__.update_option, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(null, mapDispatchToProps)(AutoLinkKeywords));
var Teaser = function Teaser() {
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_5__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_7__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_CompatibilityNotice__WEBPACK_IMPORTED_MODULE_11__["default"], {
    notice: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('To Utilize the Auto-Link Keywords Feature, kindly ensure that you have at least BetterLinks Pro v2.0.2 installed & activated', 'betterlinks'),
    compatibleProVersion: "2.0.2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-form-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "short-description"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("b", {
    style: {
      fontWeight: 700
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Note: ', 'betterlinks-pro')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The following settings will work as a preset for your new keyword added afterward', 'betterlinks-pro'))))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-form-group btl-form-group--teaser btl-form-group-autolink-keyword-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Disable Auto-Link Keywords', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field block",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    className: "btl-check",
    name: "disable_autolink",
    type: "checkbox",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "text"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('HTML Options', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field block",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "checkbox",
    disabled: true,
    className: "btl-check"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Open New Tab', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field block",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "checkbox",
    disabled: true,
    className: "btl-check"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No Follow', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field block",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "checkbox",
    disabled: true,
    className: "btl-check"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Case Sensitive', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Left Boundary', 'betterlinks'),
    onClick: openUpgradeToProModal,
    defaultValue: {
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('None', 'betterlinks')
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_InputTeaser__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Keyword Before', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Right Boundary', 'betterlinks'),
    onClick: openUpgradeToProModal,
    defaultValue: {
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('None', 'betterlinks')
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_InputTeaser__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Keyword After', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_InputTeaser__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Limit', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default Post Types', 'betterlinks'),
    onClick: openUpgradeToProModal,
    isMulti: true,
    defaultValue: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Post', 'betterlinks')
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Post Category', 'betterlinks'),
    onClick: openUpgradeToProModal,
    isMulti: true,
    defaultValue: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uncategorized', 'betterlinks')
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Post Tags', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("hr", {
    className: "btl-settings-devider",
    style: {
      marginTop: '20px'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-form-group btl-form-group--teaser btl-form-group-autolink-keyword-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Auto-Linked Keywords Icon', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field block",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    className: "btl-check",
    name: "is_autolink_icon",
    type: "checkbox",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "text"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-form-group btl-form-group--teaser btl-form-group-autolink-keyword-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Auto-Link Keywords inside', 'betterlinks-pro'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      display: 'block'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Headings', 'betterlinks-pro'))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-checkbox-field block",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    className: "btl-check",
    name: "is_autolink_headings",
    type: "checkbox",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "text"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Disable Auto-link keywords ', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      style: {
        display: 'block'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('for Post Types', 'betterlinks'))),
    onClick: openUpgradeToProModal,
    isMulti: true,
    defaultValue: [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Page', 'betterlinks')
    }]
  }));
};

/***/ }),

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

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/CompatibilityNotice/index.js":
/*!*************************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/CompatibilityNotice/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/helper */ "./dev_betterlinks/utils/helper.js");



var CompatibilityNotice = function CompatibilityNotice(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? '#f2f2f2' : _ref$mode,
    _ref$noticeType = _ref.noticeType,
    noticeType = _ref$noticeType === void 0 ? 'warning' : _ref$noticeType,
    compatibleProVersion = _ref.compatibleProVersion,
    notice = _ref.notice;
  var isProUpdated = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_2__.pro_version_check)(compatibleProVersion);
  if (isProUpdated) return '';
  var style = {
    group: {
      marginLeft: 0,
      padding: 0
    },
    notice: {
      padding: '15px',
      background: mode
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-form-group ".concat('' !== noticeType ? 'notice notice-' + noticeType : ''),
    style: style.group
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: style.notice
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", {
    style: {
      fontWeight: 700
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Note: ')), notice));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CompatibilityNotice);

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/CreateLinkExternally/index.js":
/*!**************************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/CreateLinkExternally/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility/SelectTeaser */ "./dev_betterlinks/components/Teasers/utility/SelectTeaser.js");
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utility_CheckList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utility/CheckList */ "./dev_betterlinks/components/Teasers/utility/CheckList.js");







var CreateLinkExternallyTeaser = function CreateLinkExternallyTeaser(_ref) {
  var _props$values, _props$values2;
  var props = _ref.props;
  if (!((_props$values = props.values) !== null && _props$values !== void 0 && (_props$values = _props$values.cle) !== null && _props$values !== void 0 && _props$values.enable_cle) || !((_props$values2 = props.values) !== null && _props$values2 !== void 0 && (_props$values2 = _props$values2.cle) !== null && _props$values2 !== void 0 && _props$values2.advanced_options)) return;
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_2__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-cle-teaser",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No Follow', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Sponsored', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Parameter Forwarding', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Tracking', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Social Share', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-cle-select-teaser"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('BetterLink Category')
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Redirect Type')
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateLinkExternallyTeaser);

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/CustomizeMetaTags/index.js":
/*!***********************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/CustomizeMetaTags/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _utility_CheckList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utility/CheckList */ "./dev_betterlinks/components/Teasers/utility/CheckList.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }










var CustomizeMetaTags = function CustomizeMetaTags(_ref) {
  var settings = _ref.settings,
    update_option = _ref.update_option;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Save Settings', 'betterlinks')),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    formSubmitText = _useState2[0],
    setFormSubmitText = _useState2[1];
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_3__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  var isProUpdated = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_5__.pro_version_check)('1.8.0');
  if (!isProUpdated) {
    // this feature is from 1.8.0 version, betterlinks-pro
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "short-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("b", {
      style: {
        fontWeight: 700
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Note: ')), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('To Utilize the Customize Link Preview Feature, kindly ensure that you have updated to the latest version of BetterLinks Pro v-1.8.0', 'betterlinks')));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Formik, {
    enableReinitialize: true,
    initialValues: _objectSpread({}, settings),
    onSubmit: function onSubmit(values) {
      return (0,_utils_helper__WEBPACK_IMPORTED_MODULE_5__.saveSettingsHandler)(values, update_option, setFormSubmitText);
    }
  }, function (props) {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Form, null, !_utils_helper__WEBPACK_IMPORTED_MODULE_5__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_9__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Enable Customize Link Preview', 'betterlinks'),
      onClick: openUpgradeToProModal
    }), betterLinksHooks.applyFilters('BetterLinksCustomizeMetaTags', null, props), _utils_helper__WEBPACK_IMPORTED_MODULE_5__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
      className: "button-primary btn-save-settings",
      type: "submit"
    }, formSubmitText)));
  }));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_8__.update_option, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_7__.connect)(null, mapDispatchToProps)(CustomizeMetaTags));

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/ExternalAnalytics.js":
/*!*****************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/ExternalAnalytics.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _utility_InputTeaser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utility/InputTeaser */ "./dev_betterlinks/components/Teasers/utility/InputTeaser.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }








var ExternalAnalytics = function ExternalAnalytics(_ref) {
  var trackingSettings = _ref.trackingSettings,
    update_tracking_settings = _ref.update_tracking_settings;
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_6__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  if (_utils_helper__WEBPACK_IMPORTED_MODULE_5__.is_pro_enabled) {
    return betterLinksHooks.applyFilters('BetterLinksTrackingPro', null, _objectSpread(_objectSpread({}, trackingSettings), {}, {
      update_tracking_settings: update_tracking_settings
    }));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-tab-inner-divider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-tracking-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-external-analytics-container btl-googleanalytics-container teaser"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("form", {
    className: "form",
    id: "googleAnalytics",
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      openUpgradeToProModal();
    },
    action: "#"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-role-item btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Google Analytics', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    type: "checkbox",
    className: "btl-check",
    name: "is_enable_ga",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  })))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-external-analytics-container btl-fb-pixel-container teaser"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("form", {
    className: "form",
    id: "fbPixel",
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      openUpgradeToProModal();
    },
    action: "#"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-role-item btl-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Facebook Pixel Tracking', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    type: "checkbox",
    className: "btl-check",
    name: "is_enable_pixel",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  })))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_InputTeaser__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Scripts', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl-form-group btl-multi-checkbox",
    style: {
      alignItems: 'baseline'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Parameter Tracking', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "link-options__body",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    className: "btl-check",
    type: "checkbox",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Forwarded Parameters', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    className: "btl-check",
    type: "checkbox",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Target URL Parameters', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    className: "btl-check",
    type: "checkbox",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('UTM Parameters', 'betterlinks'))))))));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_tracking_settings: (0,redux__WEBPACK_IMPORTED_MODULE_10__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_7__.update_tracking_settings, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_8__.connect)(null, mapDispatchToProps)(ExternalAnalytics));

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/GoPremium.js":
/*!*********************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/GoPremium.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GoPremium)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");




function GoPremium() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-tab-inner-divider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-tab-panel-inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-gopremium-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btl-gopremium-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Why upgrade to ', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-gopremium-focus-text btl-text-orange"
  }, "Premium Version?")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-gopremium-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get access to Individual Analytics, Social Share for UTM Builder, Role Management, Google Analytics Integration & many more to run successful marketing campaigns.', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-gopremium-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + '/assets/images/support.svg',
    alt: "support icon"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('World class support from our ', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-gopremium-focus-text btl-text-orange"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(' dedicated team, 24/7.', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wpdeveloper.com/in/upgrade-betterlinks",
    target: "_blank",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to PRO', 'betterlinks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + '/assets/images/crown.svg',
    alt: "crown icon"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to PRO', 'betterlinks')))))));
}

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/PasswordProtection/index.js":
/*!************************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/PasswordProtection/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-quill */ "./node_modules/react-quill/lib/index.js");
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_quill__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utility_CheckList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utility/CheckList */ "./dev_betterlinks/components/Teasers/utility/CheckList.js");
/* harmony import */ var _utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utility/SelectTeaser */ "./dev_betterlinks/components/Teasers/utility/SelectTeaser.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }












var PasswordProtection = function PasswordProtection(_ref) {
  var settings = _ref.settings,
    update_option = _ref.update_option;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Save Settings', 'betterlinks')),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    formSubmitText = _useState2[0],
    setFormSubmitText = _useState2[1];
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_5__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  var isProUpdated = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_6__.pro_version_check)('1.6.3');
  if (!isProUpdated) {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "short-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("b", {
      style: {
        fontWeight: 700
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Note: ')), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('To Utilize the Password Protected Redirect Feature, kindly ensure that you have updated to the latest version of BetterLinks Pro', 'betterlinks')));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_12__.Formik, {
    enableReinitialize: true,
    initialValues: _objectSpread({}, settings),
    onSubmit: function onSubmit(values) {
      return (0,_utils_helper__WEBPACK_IMPORTED_MODULE_6__.saveSettingsHandler)(values, update_option, setFormSubmitText);
    }
  }, function (props) {
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_12__.Form, null, betterLinksHooks.applyFilters('BetterLinksPasswordProtection', (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(Teaser, {
      openUpgradeToProModal: openUpgradeToProModal
    }), _objectSpread(_objectSpread({}, props), {}, {
      ReactQuill: (react_quill__WEBPACK_IMPORTED_MODULE_9___default())
    })), _utils_helper__WEBPACK_IMPORTED_MODULE_6__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
      className: "button-primary btn-save-settings",
      type: "submit"
    }, formSubmitText)));
  }));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_13__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_8__.update_option, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_7__.connect)(null, mapDispatchToProps)(PasswordProtection));
var Teaser = function Teaser(_ref2) {
  var openUpgradeToProModal = _ref2.openUpgradeToProModal;
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Password Protected Redirect', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Cookie', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Advanced Settings', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_SelectTeaser__WEBPACK_IMPORTED_MODULE_11__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Form Template', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Title', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Instruction', 'betterlinks'),
    onClick: openUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_utility_CheckList__WEBPACK_IMPORTED_MODULE_10__["default"], {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Show Protected URL', 'betterlinks'),
    onClick: openUpgradeToProModal
  }));
};

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/RoleManagement.js":
/*!**************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/RoleManagement.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RoleManagement)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _UpgradeToPro__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");







function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }




var RoleManagement = /*#__PURE__*/function (_React$Component) {
  function RoleManagement(props) {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, RoleManagement);
    _this = _callSuper(this, RoleManagement, [props]);
    _this.state = {
      isOpenModal: false
    };
    _this.openModal = _this.openModal.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    return _this;
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(RoleManagement, _React$Component);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(RoleManagement, [{
    key: "openModal",
    value: function openModal() {
      this.setState({
        isOpenModal: true
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState({
        isOpenModal: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var roles = {
        editor: 'Editor',
        author: 'Author',
        contributor: 'Contributor',
        subscriber: 'Subscriber'
      };
      return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)((react__WEBPACK_IMPORTED_MODULE_6___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(_UpgradeToPro__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isOpenModal: this.state.isOpenModal,
        closeModal: this.closeModal
      }), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-tab-inner-divider-2"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-tab-panel-inner"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-role-container teaser"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("form", {
        className: "form",
        onSubmit: function onSubmit(e) {
          e.preventDefault();
          _this2.openModal();
        },
        id: "rolemanagement"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-role-item btl-form-group"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
        className: "btl-form-label"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Who Can View Links?', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "writelinks link-options__body",
        onClick: function onClick() {
          return _this2.openModal();
        }
      }, Object.entries(roles).map(function (_ref, index) {
        var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
          htmlFor: "viewlinks_".concat(index),
          key: "viewlinks_".concat(index),
          className: "btl-checkbox-field block"
        }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("input", {
          id: "viewlinks_".concat(index),
          type: "checkbox",
          name: "viewlinks",
          className: "btl-check",
          value: key,
          disabled: true
        }), " ", (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
          className: "text"
        }, value));
      }))), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-role-item btl-form-group"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
        className: "btl-form-label"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Who Can Create Links?', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "writelinks link-options__body",
        onClick: function onClick() {
          return _this2.openModal();
        }
      }, Object.entries(roles).map(function (_ref3, index) {
        var _ref4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
          htmlFor: "writelinks_".concat(index),
          key: "writelinks_".concat(index),
          className: "btl-checkbox-field block"
        }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("input", {
          id: "writelinks_".concat(index),
          type: "checkbox",
          name: "writelinks",
          className: "btl-check",
          value: key,
          disabled: true
        }), ' ', (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
          className: "text"
        }, value));
      }))), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-role-item btl-form-group"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
        className: "btl-form-label"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Who Can Edit Links?', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "editlinks link-options__body",
        onClick: function onClick() {
          return _this2.openModal();
        }
      }, Object.entries(roles).map(function (_ref5, index) {
        var _ref6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];
        return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
          htmlFor: "editlinks_".concat(index),
          key: "editlinks_".concat(index),
          className: "btl-checkbox-field block"
        }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("input", {
          id: "editlinks_".concat(index),
          type: "checkbox",
          name: "editlinks",
          className: "btl-check",
          value: key,
          disabled: true
        }), " ", (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
          className: "text"
        }, value));
      }))), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-role-item btl-form-group"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
        className: "btl-form-label"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Who Can Check Analytics?', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "checkanalytics link-options__body",
        onClick: function onClick() {
          return _this2.openModal();
        }
      }, Object.entries(roles).map(function (_ref7, index) {
        var _ref8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref7, 2),
          key = _ref8[0],
          value = _ref8[1];
        return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
          htmlFor: "checkanalytics_".concat(index),
          key: "checkanalytics_".concat(index),
          className: "btl-checkbox-field block"
        }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("input", {
          id: "checkanalytics_".concat(index),
          type: "checkbox",
          name: "checkanalytics",
          className: "btl-check",
          value: key,
          disabled: true
        }), ' ', (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
          className: "text"
        }, value));
      }))), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-role-item btl-form-group"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
        className: "btl-form-label"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Who Can Edit Settings?', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "checkanalytics link-options__body",
        onClick: function onClick() {
          return _this2.openModal();
        }
      }, Object.entries(roles).map(function (_ref9, index) {
        var _ref10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref9, 2),
          key = _ref10[0],
          value = _ref10[1];
        return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
          htmlFor: "editsettings_".concat(index),
          key: "editsettings_".concat(index),
          className: "btl-checkbox-field block"
        }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("input", {
          id: "editsettings_".concat(index),
          type: "checkbox",
          name: "editsettings",
          className: "btl-check",
          value: key,
          disabled: true
        }), ' ', (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
          className: "text"
        }, value));
      }))), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-role-item btl-form-group"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
        className: "btl-form-label"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Who can Mark Links as \n Favorite/Unfavorite?', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__["default"], null))), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "editFavorite link-options__body",
        onClick: function onClick() {
          return _this2.openModal();
        }
      }, Object.entries(roles).map(function (_ref11, index) {
        var _ref12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref11, 2),
          key = _ref12[0],
          value = _ref12[1];
        return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("label", {
          htmlFor: "editFavorite_".concat(index),
          key: "editFavorite_".concat(index),
          className: "btl-checkbox-field block"
        }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("input", {
          id: "editFavorite_".concat(index),
          type: "checkbox",
          name: "editFavorite",
          className: "btl-check",
          value: key,
          disabled: true
        }), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
          className: "text"
        }, value));
      }))))))));
    }
  }]);
}((react__WEBPACK_IMPORTED_MODULE_6___default().Component));


/***/ }),

/***/ "./dev_betterlinks/components/Teasers/utility/CheckList.js":
/*!*****************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/utility/CheckList.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckList)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Badge_ProBadge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);


var _excluded = ["title", "is_pro"];

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var propTypes = {
  title: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string)
};
function CheckList(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$is_pro = _ref.is_pro,
    is_pro = _ref$is_pro === void 0 ? false : _ref$is_pro,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", _objectSpread({
    className: "btl-role-item btl-form-group"
  }, props), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-form-label"
  }, title, is_pro && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_4__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    type: "checkbox",
    className: "btl-check",
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  }))));
}
CheckList.propTypes = propTypes;

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/utility/InputTeaser.js":
/*!*******************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/utility/InputTeaser.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


var InputTeaser = function InputTeaser(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-role-item btl-form-group",
    onClick: onClick
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "btl-form-label"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "link-options__body link-options__body_tracking"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "btl-text-field",
    disabled: true,
    onClick: onClick,
    placeholder: placeholder
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "text"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputTeaser);

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/utility/SelectTeaser.js":
/*!********************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/utility/SelectTeaser.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");


var _excluded = ["title", "is_pro", "isMulti", "defaultValue"];

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var defaultValues = {
  value: '',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select...', 'betterlinks')
};
var SelectTeaser = function SelectTeaser(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$is_pro = _ref.is_pro,
    is_pro = _ref$is_pro === void 0 ? false : _ref$is_pro,
    _ref$isMulti = _ref.isMulti,
    isMulti = _ref$isMulti === void 0 ? false : _ref$isMulti,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? defaultValues : _ref$defaultValue,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", _objectSpread({
    className: "btl-role-item btl-form-group"
  }, props), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-form-label"
  }, title, is_pro && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    "class": "pro-badge"
  }, "Pro")), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isMulti: isMulti,
    isDisabled: true,
    defaultValue: defaultValue,
    className: "btl-modal-select--full",
    classNamePrefix: "btl-react-select"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectTeaser);

/***/ }),

/***/ "./dev_betterlinks/components/Terms/Category.js":
/*!******************************************************!*\
  !*** ./dev_betterlinks/components/Terms/Category.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_select_creatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select/creatable */ "./node_modules/react-select/creatable/dist/react-select.esm.js");






var propTypes = {
  catId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  data: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object),
  fieldName: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  setFieldValue: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func)
};
var Category = function Category(_ref) {
  var catId = _ref.catId,
    data = _ref.data,
    fieldName = _ref.fieldName,
    setFieldValue = _ref.setFieldValue,
    disabled = _ref.disabled;
  var _useField = (0,formik__WEBPACK_IMPORTED_MODULE_4__.useField)(fieldName),
    _useField2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useField, 1),
    field = _useField2[0];
  var onChange = function onChange(option) {
    if (option == null) {
      return setFieldValue(field.name, '');
    }
    return setFieldValue(field.name, option.value);
  };
  var defaultValue = function defaultValue() {
    if (catId) {
      var termData = data.terms.filter(function (item) {
        return item.ID == catId;
      });
      if (termData.length > 0) {
        var _termData$ = termData[0],
          ID = _termData$.ID,
          term_name = _termData$.term_name;
        return {
          value: ID,
          label: term_name
        };
      }
    } else {
      var _data$terms$filter$ = data.terms.filter(function (item) {
          return item.term_slug == 'uncategorized';
        })[0],
        _ID = _data$terms$filter$.ID,
        _term_name = _data$terms$filter$.term_name;
      return {
        value: _ID,
        label: _term_name
      };
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, data.terms ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select_creatable__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "btl-modal-select",
    id: field.id,
    name: field.name,
    defaultValue: defaultValue(),
    classNamePrefix: "btl-react-select",
    onChange: onChange,
    options: data.terms.filter(function (item) {
      return item.term_type == 'category' && item.term_slug != 'uncategorized';
    }).map(function (item) {
      return {
        value: item.ID,
        label: item.term_name
      };
    }),
    isDisabled: disabled
  }) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select_creatable__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "btl-modal-select",
    id: field.id,
    classNamePrefix: "btl-react-select",
    isDisabled: disabled
  })));
};
Category.propTypes = propTypes;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Category);

/***/ }),

/***/ "./dev_betterlinks/containers/CustomFields/index.js":
/*!**********************************************************!*\
  !*** ./dev_betterlinks/containers/CustomFields/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_9__);




function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }









var customStyles = {
  overlay: {
    background: 'rgba(35, 40, 45, 0.62)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
var CustomFields = function CustomFields(_ref) {
  var settings = _ref.settings,
    update_option = _ref.update_option;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Save Settings', 'betterlinks')),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    formSubmitText = _useState2[0],
    setFormSubmitText = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
    modalIsOpen = _useState4[0],
    setModalOpen = _useState4[1];
  var closeModal = function closeModal() {
    setModalOpen(false);
  };
  var onSubmit = function onSubmit(values, _ref2) {
    var setFieldError = _ref2.setFieldError;
    var customFieldsValues = lodash__WEBPACK_IMPORTED_MODULE_4___default().map((values === null || values === void 0 ? void 0 : values.customFields) || [], 'value');
    var hasEmptyValue = lodash__WEBPACK_IMPORTED_MODULE_4___default().some(customFieldsValues, function (val) {
      return !val || '' === val || val.includes(' ');
    }); // Checks for string is valid or not.

    if (customFieldsValues.length === 0 && settings.customFields.length === 0) {
      setFieldError('customFields', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Please create at least one Custom Field to save.', 'betterlinks'));
      return;
    }
    if (hasEmptyValue) {
      setFieldError('customFields', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Please fill all the fields', 'betterlinks'));
      return;
    }
    var uniqueValues = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(new Set(customFieldsValues));
    if (JSON.stringify(customFieldsValues) !== JSON.stringify(uniqueValues)) {
      setFieldError('customFields', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Field label must be unique', 'betterlinks'));
      return;
    }
    (0,_utils_helper__WEBPACK_IMPORTED_MODULE_8__.saveSettingsHandler)(values, update_option, setFormSubmitText);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Formik, {
    initialValues: _objectSpread({}, settings),
    onSubmit: onSubmit
  }, function (_ref3) {
    var values = _ref3.values;
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Form, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-form-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "short-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("b", {
      style: {
        fontWeight: 700
      }
    }, "Note: "), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('It will allow you to add Custom Text Fields to store additional information alongside BetterLinks default fields for each link. For more info, ')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("a", {
      className: "external-analytic-tooltip-anchor",
      href: "https://betterlinks.io/docs/add-custom-fields-in-betterlinks/",
      target: "_blank",
      style: {
        color: 'inherit'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Click here', 'betterlinks-pro'))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.FieldArray, {
      name: "customFields",
      render: function render(arrayHelpers) {
        var _values$customFields, _values$customFields2, _values$customFields3, _values$customFields4, _values$customFields5, _arrayHelpers$form2, _arrayHelpers$form3;
        var lastField = !(values !== null && values !== void 0 && (_values$customFields = values.customFields) !== null && _values$customFields !== void 0 && _values$customFields.length) || (values === null || values === void 0 || (_values$customFields2 = values.customFields) === null || _values$customFields2 === void 0 || (_values$customFields2 = _values$customFields2[(values === null || values === void 0 || (_values$customFields3 = values.customFields) === null || _values$customFields3 === void 0 ? void 0 : _values$customFields3.length) - 1]) === null || _values$customFields2 === void 0 ? void 0 : _values$customFields2.value);
        var lastIndex = (values === null || values === void 0 || (_values$customFields4 = values.customFields) === null || _values$customFields4 === void 0 ? void 0 : _values$customFields4.length) - 1;
        return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_9___default()), {
          isOpen: modalIsOpen,
          onRequestClose: closeModal,
          style: customStyles,
          ariaHideApp: false
        }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
          className: "btl-close-modal",
          onClick: closeModal
        }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("i", {
          className: "btl btl-cancel"
        })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
          className: "btl-confirmation-alert"
        }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("h3", {
          className: "btl-modal-utm-builder__title"
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Are you sure to delete this field?', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
          className: "btl-confirmation-buttons"
        }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
          type: "button",
          onClick: function onClick() {
            var _arrayHelpers$form;
            var deleteIndex = (_arrayHelpers$form = arrayHelpers.form) === null || _arrayHelpers$form === void 0 || (_arrayHelpers$form = _arrayHelpers$form.errors) === null || _arrayHelpers$form === void 0 ? void 0 : _arrayHelpers$form.deleteFieldIndex;
            arrayHelpers.remove(deleteIndex);
            closeModal();
          }
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Yes', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
          type: "button",
          onClick: closeModal
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Cancel', 'betterlinks')))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", null, (values === null || values === void 0 || (_values$customFields5 = values.customFields) === null || _values$customFields5 === void 0 ? void 0 : _values$customFields5.length) > 0 ? values.customFields.map(function (fields, index) {
          return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
            key: "".concat(fields.value, "_").concat(index),
            className: "btl-form-group",
            style: {
              columnGap: '5px'
            }
          }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Field, {
            className: "btl-form-control",
            name: "customFields.".concat(index, ".label"),
            placeholder: "Custom field label",
            onChange: function onChange(e) {
              var fieldSlug = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_8__.generateSlug)(e.target.value);
              arrayHelpers.form.setFieldValue("customFields.".concat(index, ".label"), e.target.value);
              arrayHelpers.form.setFieldValue("customFields.".concat(index, ".value"), fieldSlug);
            },
            autoFocus: true
          }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
            className: "btl-utm-action-btns"
          }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
            className: "button",
            type: "button",
            style: {
              lineHeight: '0'
            },
            onClick: function onClick() {
              setModalOpen(true);
              arrayHelpers.form.setFieldError('deleteFieldIndex', index);
            }
          }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
            className: "dashicons dashicons-trash"
          }))), lastIndex === index && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
            type: "button",
            className: "button",
            style: {
              lineHeight: '0'
            },
            onClick: function onClick() {
              if (!lastField || lodash__WEBPACK_IMPORTED_MODULE_4___default().includes(lastField, ' ')) {
                arrayHelpers.form.setFieldError('customFields', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Please fill all the fields', 'betterlinks'));
                return;
              }
              arrayHelpers.push('');
            }
          }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
            className: "dashicons dashicons-plus-alt2"
          })));
        }) : (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
          className: "btl-form-group",
          style: {
            columnGap: '5px'
          }
        }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Field, {
          className: "btl-form-control",
          name: "customFields.0.label",
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('To create Custom Field Label, click on "+" icon here 👉', 'betterlinks'),
          disabled: true,
          style: {
            cursor: 'not-allowed'
          },
          onChange: function onChange(e) {
            var fieldSlug = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_8__.generateSlug)(e.target.value);
            arrayHelpers.form.setFieldValue('customFields.0.label', e.target.value);
            arrayHelpers.form.setFieldValue('customFields.0.value', fieldSlug);
          }
        }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
          type: "button",
          className: "button",
          style: {
            lineHeight: '0'
          },
          onClick: function onClick() {
            return arrayHelpers.push('');
          }
        }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
          className: "dashicons dashicons-plus-alt2"
        })))), !!((_arrayHelpers$form2 = arrayHelpers.form) !== null && _arrayHelpers$form2 !== void 0 && (_arrayHelpers$form2 = _arrayHelpers$form2.errors) !== null && _arrayHelpers$form2 !== void 0 && _arrayHelpers$form2.customFields) && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
          style: {
            color: 'red',
            display: 'block',
            marginTop: '5px'
          }
        }, (_arrayHelpers$form3 = arrayHelpers.form) === null || _arrayHelpers$form3 === void 0 || (_arrayHelpers$form3 = _arrayHelpers$form3.errors) === null || _arrayHelpers$form3 === void 0 ? void 0 : _arrayHelpers$form3['customFields']));
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      className: "button-primary btn-save-settings",
      type: "submit",
      style: {
        marginTop: '20px'
      }
    }, formSubmitText));
  }));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_7__.update_option, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_6__.connect)(null, mapDispatchToProps)(CustomFields));

/***/ }),

/***/ "./dev_betterlinks/containers/DeleteClicks.js":
/*!****************************************************!*\
  !*** ./dev_betterlinks/containers/DeleteClicks.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _redux_actions_clicks_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../redux/actions/clicks.actions */ "./dev_betterlinks/redux/actions/clicks.actions.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");











var deleteClicksOptions = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete All', 'betterlinks'),
  value: false
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete clicks older than 30 days', 'betterlinks'),
  value: 30
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete clicks older than 90 days', 'betterlinks'),
  value: 90
}];
var DeleteClicks = function DeleteClicks(_ref) {
  var fetchCustomClicksData = _ref.fetchCustomClicksData,
    dispatch_new_links_data = _ref.dispatch_new_links_data,
    propsForAnalytics = _ref.propsForAnalytics;
  var _ref2 = propsForAnalytics || {},
    customDateFilter = _ref2.customDateFilter;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    timeOutIdToClear = _useState2[0],
    setTimeOutIdToClear = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    modalIsOpen = _useState4[0],
    setModalIsOpen = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
    successfulDeletedItemsCount = _useState6[0],
    setSuccessfulDeletedItemsCount = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('reset_modal_step_1'),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState7, 2),
    deleteStatus = _useState8[0],
    setDeleteStatus = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(deleteClicksOptions[0]),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState9, 2),
    currentDaysOlderThan = _useState10[0],
    setCurrentDaysOlderThan = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (modalIsOpen) {
      var _document;
      (_document = document) === null || _document === void 0 || (_document = _document.body) === null || _document === void 0 || (_document = _document.classList) === null || _document === void 0 || _document.add('betterlinks-delete-clicks-modal-popup-opened');
    } else {
      var _document2;
      (_document2 = document) === null || _document2 === void 0 || (_document2 = _document2.body) === null || _document2 === void 0 || (_document2 = _document2.classList) === null || _document2 === void 0 || _document2.remove('betterlinks-delete-clicks-modal-popup-opened');
    }
    return function () {
      var _document3;
      (_document3 = document) === null || _document3 === void 0 || (_document3 = _document3.body) === null || _document3 === void 0 || (_document3 = _document3.classList) === null || _document3 === void 0 || _document3.remove('betterlinks-delete-clicks-modal-popup-opened');
    };
  }, [modalIsOpen]);
  var close = function close() {
    clearTimeout(timeOutIdToClear);
    setDeleteStatus('reset_modal_step_1');
    setModalIsOpen(false);
    setCurrentDaysOlderThan(deleteClicksOptions[0]);
  };
  var handleConfirmDelete = function handleConfirmDelete() {
    if (!customDateFilter) return;
    var from = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.formatDate)(customDateFilter[0].startDate, 'yyyy-mm-dd');
    var to = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.formatDate)(customDateFilter[0].endDate, 'yyyy-mm-dd');
    setDeleteStatus('deleting');
    var daysOlderThan = (currentDaysOlderThan === null || currentDaysOlderThan === void 0 ? void 0 : currentDaysOlderThan.value) || false;
    (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.deleteClicks)(daysOlderThan, from, to).then(function (res) {
      var _res$data;
      var timeoutId = setTimeout(function () {
        close();
      }, 3000);
      setTimeOutIdToClear(timeoutId);
      if (res !== null && res !== void 0 && (_res$data = res.data) !== null && _res$data !== void 0 && _res$data.success) {
        var _res$data2, _res$data3, _res$data4;
        setSuccessfulDeletedItemsCount(res === null || res === void 0 || (_res$data2 = res.data) === null || _res$data2 === void 0 || (_res$data2 = _res$data2.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.count);
        fetchCustomClicksData({
          data: res === null || res === void 0 || (_res$data3 = res.data) === null || _res$data3 === void 0 || (_res$data3 = _res$data3.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.new_clicks_data
        });
        dispatch_new_links_data({
          data: res === null || res === void 0 || (_res$data4 = res.data) === null || _res$data4 === void 0 || (_res$data4 = _res$data4.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.new_links_data
        });
        setDeleteStatus('success');
      } else {
        setDeleteStatus('failed');
      }
    })["catch"](function (err) {
      console.log('---caught error on DeleteClicks', {
        err: err
      });
      var timeoutId = setTimeout(function () {
        close();
      }, 3000);
      setTimeOutIdToClear(timeoutId);
    });
  };
  var handleResetButtonClick1 = function handleResetButtonClick1() {
    setModalIsOpen(true);
    setDeleteStatus('reset_modal_step_1');
  };
  var handleResetButtonClick2 = function handleResetButtonClick2() {
    setDeleteStatus('reset_modal_step_2');
  };
  var handleDeleteOptionsChange = function handleDeleteOptionsChange(value) {
    setCurrentDaysOlderThan(value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-analytic-reset-wrapeer betterlinks"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button-primary btl-reset-analytics-initial-button",
    onClick: handleResetButtonClick1
  }, "Reset"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_7___default()), {
    isOpen: modalIsOpen,
    onRequestClose: close,
    ariaHideApp: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-reset-modal-popup-wrapper "
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-close-modal",
    onClick: close
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-cancel"
  })), deleteStatus === 'reset_modal_step_1' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-reset-modal-popup btl-reset-modal-popup-step-1 betterlinks-body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "Pick the range of BetterLinks Analytics that you want to reset."), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "select_apply"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "btl-modal-select--full ",
    classNamePrefix: "btl-react-select",
    onChange: handleDeleteOptionsChange,
    options: deleteClicksOptions,
    value: currentDaysOlderThan,
    isMulti: false
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button-primary btl-btn-reset-analytics btl-btn-reset-apply-1",
    onClick: handleResetButtonClick2
  }, "Apply"))), deleteStatus === 'reset_modal_step_2' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-reset-modal-popup btl-reset-modal-popup-step-2 betterlinks-body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "This Action Cannot be undone. Are you sure you want to continue?"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h4", null, "Clicking ", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      fontWeight: 700
    }
  }, "Reset Clicks"), " will permanently delete the clicks data from database and it cannot be restored again.", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      display: 'Block'
    }
  }, "Click 'cancel' to abort.")), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-btn-reset-popup-step-2-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button-primary btl-btn-reset-apply-2",
    onClick: handleConfirmDelete
  }, "Reset Clicks"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button-primary btl-btn-reset-cancel",
    onClick: function onClick() {
      return setDeleteStatus('reset_modal_step_1');
    }
  }, "Cancel"))), deleteStatus === 'deleting' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "Deleting..."), deleteStatus === 'success' && successfulDeletedItemsCount !== 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "Success!!! ", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "success_delete_count"
  }, successfulDeletedItemsCount), " clicks record Deleted!!!"), deleteStatus === 'success' && successfulDeletedItemsCount === 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, (currentDaysOlderThan === null || currentDaysOlderThan === void 0 ? void 0 : currentDaysOlderThan.value) === false && "You don't have any clicks data", (currentDaysOlderThan === null || currentDaysOlderThan === void 0 ? void 0 : currentDaysOlderThan.value) === 30 && "You don't have clicks data older than 30 days", (currentDaysOlderThan === null || currentDaysOlderThan === void 0 ? void 0 : currentDaysOlderThan.value) === 90 && "You don't have clicks data older than 90 days"), deleteStatus === 'failed' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "Failed!!"))));
};
var mapStateToProps = function mapStateToProps() {
  return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchCustomClicksData: (0,redux__WEBPACK_IMPORTED_MODULE_9__.bindActionCreators)(_redux_actions_clicks_actions__WEBPACK_IMPORTED_MODULE_5__.fetchCustomClicksData, dispatch),
    dispatch_new_links_data: (0,redux__WEBPACK_IMPORTED_MODULE_9__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_6__.dispatch_new_links_data, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)(DeleteClicks));

/***/ }),

/***/ "./dev_betterlinks/containers/Migration.js":
/*!*************************************************!*\
  !*** ./dev_betterlinks/containers/Migration.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");









var ProgressSvg = function ProgressSvg() {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    height: 25,
    width: 25,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 511.182 511.182",
    fill: '#F9A946',
    style: {
      marginLeft: '5px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M436.623 74.482c-95.297-99.308-266.746-99.313-362.039.003-96.332 92.527-99.652 257.411-7.629 354.056a7.5 7.5 0 0 0 11.052-10.142C-63.205 265.068 47.079 13.962 255.606 14.503c129.533-2.671 243.68 111.455 240.995 241.001.961 199.912-234.049 313.784-390.303 189.182a7.5 7.5 0 1 0-9.301 11.769c97.909 80.188 251.709 71.178 339.625-19.935 99.309-95.283 99.314-266.754.001-362.038z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M255.603 446.502c-42.759 0-81.317-15.354-95.577-25.033a7.5 7.5 0 0 0-8.423 12.411c131.426 78.739 311.216-18.2 309.999-178.38.002-113.586-92.41-205.998-205.998-205.998a7.5 7.5 0 0 0 0 15c253.06 9.612 252.95 372.444-.001 382z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M138.579 255.562c-2.237 8.349.153 16.809 6.556 23.211l58.132 58.132c9.62 9.62 25.949 9.641 35.591 0l84.563-84.562a7.5 7.5 0 0 0 0-10.606 7.5 7.5 0 0 0-10.606 0l-84.563 84.562c-3.923 3.922-10.455 3.922-14.378 0l-58.132-58.132c-8.729-8.729 5.493-23.262 14.377-14.378l45.64 45.64a7.5 7.5 0 0 0 10.606 0l114.724-114.724c4.181-4.18 10.048-3.493 14.065.525 1.183 1.183 6.756 7.409.312 13.853l-14.612 14.612a7.5 7.5 0 0 0 0 10.606 7.5 7.5 0 0 0 10.606 0l14.612-14.612c22.664-23.515-12.121-58.017-35.59-35.591l-109.421 109.42-40.337-40.337c-13.824-13.822-37.244-5.91-42.145 12.381zM204.42 55.696c-9.652 0-9.668 15 0 15 9.652 0 9.668-15 0-15zM156.392 75.496c-9.652 0-9.668 15 0 15 9.652 0 9.668-15 0-15zM115.125 122.052c9.652 0 9.668-15 0-15-9.652 0-9.668 15 0 15zM83.431 148.213c-9.652 0-9.668 15 0 15 9.652 0 9.668-15 0-15zM63.47 196.175c-9.652 0-9.668 15 0 15 9.652 0 9.668-15 0-15zM56.603 247.669c-9.652 0-9.668 15 0 15 9.652 0 9.668-15 0-15zM63.298 314.185c9.652 0 9.668-15 0-15-9.652 0-9.668 15 0 15zM83.098 347.213c-9.652 0-9.668 15 0 15 9.651 0 9.667-15 0-15zM114.653 403.48c9.652 0 9.668-15 0-15-9.651 0-9.667 15 0 15z"
  }));
};
var Migration = function Migration(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Run Migration'),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    migrationSubmitText = _useState2[0],
    setMigrationSubmitText = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    modalIsOpen = _useState4[0],
    setIsOpen = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
    dataIsFetch = _useState6[0],
    setDataIsFetch = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState7, 2),
    prettyLinksRes = _useState8[0],
    setPrettyLinksRes = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState9, 2),
    simple301RedirectRes = _useState10[0],
    setSimple301RedirectRes = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState11, 2),
    thirstyAffiliatesRes = _useState12[0],
    setThirstyAffiliatesRes = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState14 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState13, 2),
    migrateRes = _useState14[0],
    setMigrateRes = _useState14[1];
  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useHistory)();
  var _props$redirect = props.redirect,
    redirect = _props$redirect === void 0 ? true : _props$redirect;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (props.mode === 'simple301redirects') {
      setDataIsFetch(true);
      axios__WEBPACK_IMPORTED_MODULE_4___default().post("".concat(ajaxurl, "?action=betterlinks/admin/get_simple301redirects_data&security=").concat(_utils_helper__WEBPACK_IMPORTED_MODULE_5__.betterlinks_nonce)).then(function (response) {
        if (response) {
          setSimple301RedirectRes(response.data.data);
          setDataIsFetch(false);
        }
      }, function (error) {
        console.log(error);
      });
    } else if (props.mode === 'prettylinks') {
      setDataIsFetch(true);
      axios__WEBPACK_IMPORTED_MODULE_4___default().post("".concat(ajaxurl, "?action=betterlinks/admin/get_prettylinks_data&security=").concat(_utils_helper__WEBPACK_IMPORTED_MODULE_5__.betterlinks_nonce)).then(function (response) {
        if (response.data) {
          setPrettyLinksRes(response.data.data);
          setDataIsFetch(false);
        }
      }, function (error) {
        console.log(error);
      });
    } else if (props.mode === 'thirstyaffiliates') {
      setDataIsFetch(true);
      axios__WEBPACK_IMPORTED_MODULE_4___default().post("".concat(ajaxurl, "?action=betterlinks/admin/get_thirstyaffiliates_data&security=").concat(_utils_helper__WEBPACK_IMPORTED_MODULE_5__.betterlinks_nonce)).then(function (response) {
        if (response.data) {
          setThirstyAffiliatesRes(response.data.data);
          setDataIsFetch(false);
        }
      }, function (error) {
        console.log(error);
      });
    }
  }, []);
  var onSubmitHandler = function onSubmitHandler(values) {
    setMigrationSubmitText((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Migration is in Progress...', 'betterlinks'));
    var form_data = new FormData();
    if (props.mode === 'prettylinks') {
      form_data.append('action', 'betterlinks/admin/run_prettylinks_migration');
    } else if (props.mode === 'simple301redirects') {
      form_data.append('action', 'betterlinks/admin/run_simple301redirects_migration');
    } else if (props.mode === 'thirstyaffiliates') {
      form_data.append('action', 'betterlinks/admin/run_thirstyaffiliates_migration');
    }
    form_data.append('security', _utils_helper__WEBPACK_IMPORTED_MODULE_5__.betterlinks_nonce);
    form_data.append('type', values.checked);
    axios__WEBPACK_IMPORTED_MODULE_4___default().post(ajaxurl, form_data).then(function (response) {
      if (response.data) {
        setMigrationSubmitText((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Done!', 'betterlinks'));
        setMigrateRes(response.data.data);
      }
    }, function (error) {
      console.log(error);
    });
  };
  function closeModal() {
    setIsOpen(false);
    if (redirect) {
      history.push(_utils_helper__WEBPACK_IMPORTED_MODULE_5__.route_path + 'admin.php?page=betterlinks');
      history.go(0);
    }
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_3___default()), {
    isOpen: modalIsOpen,
    shouldCloseOnOverlayClick: false,
    onRequestClose: closeModal,
    style: _utils_helper__WEBPACK_IMPORTED_MODULE_5__.modalCustomStyles,
    ariaHideApp: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-close-modal",
    onClick: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-cancel"
  })), Object.keys(migrateRes).length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Formik, {
    initialValues: {
      checked: []
    },
    onSubmit: function onSubmit(values) {
      return onSubmitHandler(values);
    }
  }, function (_ref) {
    var values = _ref.values;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Form, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-modal-migration",
      role: "group",
      "aria-labelledby": "checkbox-group"
    }, dataIsFetch && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please Wait...', 'betterlinks')), Object.keys(prettyLinksRes).length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", {
      className: "btl-modal-migration__title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pick Data that You want to Import', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
      width: "25",
      src: _utils_helper__WEBPACK_IMPORTED_MODULE_5__.plugin_root_url + 'assets/images/pointing-down.svg',
      alt: "icon"
    })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-modal-migration__item"
    }, (prettyLinksRes === null || prettyLinksRes === void 0 ? void 0 : prettyLinksRes.links_count) > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
      id: "links",
      type: "checkbox",
      name: "checked",
      value: "links"
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      htmlFor: "links"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Links ', 'betterlinks'), "(".concat(prettyLinksRes.links_count, ")")))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-modal-migration__item"
    }, (prettyLinksRes === null || prettyLinksRes === void 0 ? void 0 : prettyLinksRes.clicks_count) > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
      id: "clicks",
      type: "checkbox",
      name: "checked",
      value: "clicks"
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      htmlFor: "clicks"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clicks ', 'betterlinks'), "(".concat(prettyLinksRes.clicks_count, ")"))))), Object.keys(simple301RedirectRes).length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", {
      className: "btl-modal-migration__title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pick Data that You want to Import', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
      width: "25",
      src: _utils_helper__WEBPACK_IMPORTED_MODULE_5__.plugin_root_url + 'assets/images/pointing-down.svg',
      alt: "icon"
    })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-modal-migration__item"
    }, simple301RedirectRes && Object.keys(simple301RedirectRes).length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
      id: "links",
      type: "checkbox",
      name: "checked",
      value: "links"
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      htmlFor: "links"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Links ', 'betterlinks'), "(".concat(Object.keys(simple301RedirectRes).length, ")"))))), Object.keys(thirstyAffiliatesRes).length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", {
      className: "btl-modal-migration__title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pick Data that You want to Import', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
      width: "25",
      src: _utils_helper__WEBPACK_IMPORTED_MODULE_5__.plugin_root_url + 'assets/images/pointing-down.svg',
      alt: "icon"
    })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-modal-migration__item"
    }, thirstyAffiliatesRes && Object.keys(thirstyAffiliatesRes).length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
      id: "links",
      type: "checkbox",
      name: "checked",
      value: "links"
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      htmlFor: "links"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Links ', 'betterlinks'), "(".concat(Object.keys(thirstyAffiliatesRes).length, ")"))))), prettyLinksRes.links && prettyLinksRes.links.length == 0 && prettyLinksRes.clicks && prettyLinksRes.clicks.length == 0 ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Nothing Found To Import', 'betterlinks')) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
      className: "button button-primary",
      type: "submit"
    }, migrationSubmitText)));
  }) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-modal-migration"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    id: "response"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", null, migrateRes.btl_prettylinks_migration_running_in_background ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Migration is running in the background ', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(ProgressSvg, null)) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Migration is Complete', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    width: "25",
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_5__.plugin_root_url + 'assets/images/checkmark.svg',
    alt: "icon"
  }))), !migrateRes.btl_prettylinks_migration_running_in_background && Object.entries(migrateRes).map(function (_ref2) {
    var _ref3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, 2),
      index = _ref3[0],
      item = _ref3[1];
    return Object.entries(item).length > 0 && Object.entries(item).map(function (_ref4) {
      var _ref5 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, 2),
        chiildIndex = _ref5[0],
        childItem = _ref5[1];
      return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        key: chiildIndex
      }, Array.isArray(childItem) ? childItem.map(function (item, index) {
        return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
          key: index
        }, item);
      }) : childItem);
    });
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    style: {
      textAlign: 'left'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button button-primary",
    type: "button",
    onClick: closeModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ok', 'betterlinks'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Migration);

/***/ }),

/***/ "./dev_betterlinks/containers/TabsBrokenLinkChecker.js":
/*!*************************************************************!*\
  !*** ./dev_betterlinks/containers/TabsBrokenLinkChecker.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");





var BrokenLinks = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return Promise.all(/*! import() | broken-links */[__webpack_require__.e("vendors-node_modules_formik_dist_formik_esm_js"), __webpack_require__.e("broken-links")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Teasers/BrokenLinks */ "./dev_betterlinks/components/Teasers/BrokenLinks.js"));
});
var FullSiteLinkChecker = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return Promise.all(/*! import() | full-site-link-scanner */[__webpack_require__.e("vendors-node_modules_react-data-table-component_dist_index_cjs_js"), __webpack_require__.e("vendors-node_modules_material-ui_core_esm_Card_Card_js-node_modules_material-ui_core_esm_Card-005101"), __webpack_require__.e("vendors-node_modules_material-ui_core_esm_Box_Box_js"), __webpack_require__.e("full-site-link-scanner")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Teasers/FullSiteLinkChecker.js/index.js */ "./dev_betterlinks/components/Teasers/FullSiteLinkChecker.js/index.js"));
});

var TabsBrokenLinkChecker = function TabsBrokenLinkChecker() {
  var tabList = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Full Site Link Scanner', 'betterlinks'),
    type: 'pro'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('BetterLinks Checker', 'betterlinks'),
    type: 'pro'
  }];
  var panelList = [(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FullSiteLinkChecker, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BrokenLinks, null)];
  var brokenLinkCheckerTabList = betterLinksHooks.applyFilters('betterLinksSettingsBrokenLinkCheckerTabList', tabList);
  var brokenLinkCheckerTabPanelList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabPanelList', panelList);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.Tabs, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.TabList, null, brokenLinkCheckerTabList.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.Tab, {
      key: index
    }, item.label, 'pro' === item.type && !_utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  })), brokenLinkCheckerTabPanelList.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.TabPanel, {
      key: index
    }, item);
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabsBrokenLinkChecker);

/***/ }),

/***/ "./dev_betterlinks/containers/TabsGeneral.js":
/*!***************************************************!*\
  !*** ./dev_betterlinks/containers/TabsGeneral.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _components_RedirectType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/RedirectType */ "./dev_betterlinks/components/RedirectType/index.js");
/* harmony import */ var _redux_actions_posttypesdata_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../redux/actions/posttypesdata.actions */ "./dev_betterlinks/redux/actions/posttypesdata.actions.js");
/* harmony import */ var _redux_actions_clicks_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../redux/actions/clicks.actions */ "./dev_betterlinks/redux/actions/clicks.actions.js");
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/data */ "./dev_betterlinks/utils/data.js");
/* harmony import */ var _components_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/Teasers/UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");




function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }















var TabsGeneral = function TabsGeneral(_ref) {
  var settings = _ref.settings,
    fetch_clicks_data = _ref.fetch_clicks_data,
    fetch_terms_data = _ref.fetch_terms_data,
    terms = _ref.terms,
    update_option = _ref.update_option,
    postdatas = _ref.postdatas;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Refresh Stats', 'betterlinks')),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    cacheButtonText = _useState2[0],
    setCacheButtonText = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Active Now', 'betterlinks')),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
    fastRedirectButtonText = _useState4[0],
    setFastRedirectButtonText = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Save Settings', 'betterlinks')),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState5, 2),
    formSubmitText = _useState6[0],
    setFormSubmitText = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(_utils_helper__WEBPACK_IMPORTED_MODULE_14__.exists_links_json),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState7, 2),
    fastRedirectStatus = _useState8[0],
    setFastRedirectStatus = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Active Now', 'betterlinks')),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState9, 2),
    fastClicksButtonText = _useState10[0],
    setFastClicksButtonText = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(_utils_helper__WEBPACK_IMPORTED_MODULE_14__.exists_clicks_json),
    _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState11, 2),
    fastClicksStatus = _useState12[0],
    setFastClicksStatus = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState14 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState13, 2),
    isOpenUpgradeToProModal = _useState14[0],
    setUpgradeToProModal = _useState14[1];
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    if (_utils_helper__WEBPACK_IMPORTED_MODULE_14__.is_pro_enabled && !(terms !== null && terms !== void 0 && terms.terms)) {
      fetch_terms_data();
    }
  }, []);
  var writeLinkJSONHandler = function writeLinkJSONHandler() {
    setFastRedirectButtonText((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Activating...', 'betterlinks'));
    axios__WEBPACK_IMPORTED_MODULE_5___default().post("".concat(ajaxurl, "?action=betterlinks/admin/write_json_links&security=").concat(_utils_helper__WEBPACK_IMPORTED_MODULE_14__.betterlinks_nonce)).then(function (response) {
      if (response.data) {
        (0,_utils_helper__WEBPACK_IMPORTED_MODULE_14__.delayStatusChanged)(null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Activated!', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Active Now', 'betterlinks'), setFastRedirectButtonText);
        setTimeout(function () {
          setFastRedirectStatus(true);
        }, 1500);
      }
    }, function (error) {
      console.log(error);
    });
  };
  var writeClicksJSONHandler = function writeClicksJSONHandler() {
    setFastClicksButtonText((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Activating...', 'betterlinks'));
    axios__WEBPACK_IMPORTED_MODULE_5___default().post("".concat(ajaxurl, "?action=betterlinks/admin/write_json_clicks&security=").concat(_utils_helper__WEBPACK_IMPORTED_MODULE_14__.betterlinks_nonce)).then(function (response) {
      if (response.data) {
        (0,_utils_helper__WEBPACK_IMPORTED_MODULE_14__.delayStatusChanged)(null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Activated!', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Refresh Stats', 'betterlinks'), setFastClicksButtonText);
        setTimeout(function () {
          setFastClicksStatus(true);
        }, 1500);
      }
    }, function (error) {
      console.log(error);
    });
  };
  var analyticClicksHandler = function analyticClicksHandler() {
    setCacheButtonText((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Refreshing...', 'betterlinks'));
    axios__WEBPACK_IMPORTED_MODULE_5___default().post("".concat(ajaxurl, "?action=betterlinks/admin/analytics&security=").concat(_utils_helper__WEBPACK_IMPORTED_MODULE_14__.betterlinks_nonce)).then(function (response) {
      if (response.data) {
        (0,_utils_helper__WEBPACK_IMPORTED_MODULE_14__.delayStatusChanged)(null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Done!', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Refresh Stats', 'betterlinks'), setCacheButtonText);
        // update analytic data
        fetch_clicks_data({});
      }
    }, function (error) {
      console.log(error);
    });
  };
  var openUpgradeToProModal = function openUpgradeToProModal() {
    setUpgradeToProModal(true);
  };
  var closeUpgradeToProModal = function closeUpgradeToProModal() {
    setUpgradeToProModal(false);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_components_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_13__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Formik, {
    enableReinitialize: true,
    initialValues: _objectSpread({}, settings),
    onSubmit: function onSubmit(values) {
      return (0,_utils_helper__WEBPACK_IMPORTED_MODULE_14__.saveSettingsHandler)(values, update_option, setFormSubmitText);
    }
  }, function (props) {
    var _props$values$prefix, _props$values;
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Form, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tab-panel-inner"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Link Redirection Status', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("br", null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('(Fast Mode)', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-form-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "status"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "active-status ".concat(fastRedirectStatus ? 'Active' : 'Disable')
    }, fastRedirectStatus ? 'Active' : 'Disable'), !fastRedirectStatus && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      type: "button",
      onClick: writeLinkJSONHandler,
      className: "button button-primary"
    }, fastRedirectButtonText)), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "short-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("b", {
      style: {
        fontWeight: 700
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Note: ')), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("If it's enabled, when you click on the link, it will fetch the target URL from the .json file and will redirect it. Otherwise, it will fetch directly from the database", 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, !fastClicksStatus ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Click Data Status ', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("br", null), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('(Fast Mode)', 'betterlinks')) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Fetch Analytics Data', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-form-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "status"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "active-status ".concat(fastClicksStatus ? 'Active' : 'Disable')
    }, fastClicksStatus ? 'Active' : 'Disable'), !fastClicksStatus ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      type: "button",
      onClick: writeClicksJSONHandler,
      className: "button button-primary"
    }, fastClicksButtonText) : (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      type: "button",
      onClick: analyticClicksHandler,
      className: "button button-primary"
    }, cacheButtonText)), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "short-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("b", {
      style: {
        fontWeight: 700
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Note: ')), !fastClicksStatus ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("If it's enabled, before a link is redirected, the click data will be saved in the json file in 1 hour time interval. Otherwise, it will be directly inserted into the database", 'betterlinks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Analytics data is updated within 1 hour interval. Hit the 'Refresh Stats' button to instantly update your analytics data", 'betterlinks')))), settings && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Redirect Type', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_components_RedirectType__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: "btl-modal-select--full",
      classNamePrefix: "btl-react-select",
      id: "redirect_type",
      name: "redirect_type",
      setUpgradeToProModal: setUpgradeToProModal,
      value: [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_utils_data__WEBPACK_IMPORTED_MODULE_12__.redirectType), [{
        value: _utils_helper__WEBPACK_IMPORTED_MODULE_14__.is_pro_enabled ? 'cloak' : 'pro',
        label: _utils_helper__WEBPACK_IMPORTED_MODULE_14__.is_pro_enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cloaked', 'betterlinks') : (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cloaked', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_15__["default"], null))
      }]),
      defaultValue: settings.redirect_type == 'cloak' && !_utils_helper__WEBPACK_IMPORTED_MODULE_14__.is_pro_enabled ? '307' : settings.redirect_type,
      setFieldValue: props.setFieldValue,
      isMulti: false
    })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Link Options', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "nofollow",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('nofollow', !props.values.nofollow);
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No Follow', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will add nofollow attribute to your link. (Recommended)', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "sponsored",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('sponsored', !props.values.sponsored);
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Sponsored', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "param_forwarding",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('param_forwarding', !props.values.param_forwarding);
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Parameter Forwarding', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will pass the parameters you have set in the target URL', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "track_me",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('track_me', !props.values.track_me);
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tracking', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will let you check Analytics report of your links', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group btl-form-group--make-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Random URL Slug', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body",
      style: {
        flexDirection: 'column'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block",
      style: {
        marginBottom: 0
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      type: "checkbox",
      className: "btl-check",
      name: "is_random_string"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Random URL Slug', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will randomly generate strings for your shortened URL', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group btl-form-group--make-center"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Case Sensitivity', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body",
      style: {
        flexDirection: 'column'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block",
      style: {
        marginBottom: 0
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      type: "checkbox",
      className: "btl-check",
      name: "is_case_sensitive"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Case Sensitive Links', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will make your shortened URLs case sensitive', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group btl-form-group--top"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Link Prefix', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body",
      style: {
        flexDirection: 'column'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      style: {
        maxWidth: '200px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-text-field",
      name: "prefix",
      value: (_props$values$prefix = (_props$values = props.values) === null || _props$values === void 0 ? void 0 : _props$values.prefix) !== null && _props$values$prefix !== void 0 ? _props$values$prefix : 'go',
      type: "text"
    })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "short-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("b", {
      style: {
        fontWeight: 700
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Note:', 'betterlinks'), " "), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('The prefix will be added before your Shortened URL’s slug eg.', 'betterlinks'), betterLinksHooks.applyFilters('site_url', _utils_helper__WEBPACK_IMPORTED_MODULE_14__.site_url), props.values.prefix && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, "/", (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("strong", null, props.values.prefix)), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('/your-affiliate-link-name.', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Custom Domain', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "enable_custom_domain_menu",
      type: "checkbox",
      onChange: function onChange() {
        var _props$values2;
        return props.setFieldValue('enable_custom_domain_menu', !((_props$values2 = props.values) !== null && _props$values2 !== void 0 && _props$values2.enable_custom_domain_menu));
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable Custom Domain Menu', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will allow you to show Custom Domain on the BetterLinks submenu for quick access.', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('QR Codes', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "is_allow_qr",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('is_allow_qr', !props.values.is_allow_qr);
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable QR Code Generator', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will allow you to generate & download QR Code for each of your shortened URL', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Wildcards', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "wildcards",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('wildcards', !props.values.wildcards);
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Use Wildcards?', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('To use wildcards, put an asterisk (*) after the folder name that you want to redirect.', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Bot Clicks', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "disablebotclicks",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('disablebotclicks', !props.values.disablebotclicks);
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Disable Bot Clicks', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will prevent your site from bot traffic', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Instant Redirect', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "is_allow_gutenberg",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('is_allow_gutenberg', !props.values.is_allow_gutenberg);
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Allow Instant Redirect', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will allow you to redirect your links instantly from Gutenberg and Elementor Editor.', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Disable Clicks IP', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_16__.Field, {
      className: "btl-check",
      name: "is_disable_analytics_ip",
      type: "checkbox",
      onChange: function onChange() {
        var _props$values3;
        return props.setFieldValue('is_disable_analytics_ip', !(props !== null && props !== void 0 && (_props$values3 = props.values) !== null && _props$values3 !== void 0 && _props$values3.is_disable_analytics_ip));
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Disable IP Addresses for Analytics', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("If checked, users' ip addresses won't be saved & won't be shown in analytics section", 'betterlinks'))))))), !_utils_helper__WEBPACK_IMPORTED_MODULE_14__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group btl-form-group--teaser"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Force HTTPS', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_15__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block",
      onClick: openUpgradeToProModal
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", {
      className: "btl-check",
      name: "force_https",
      type: "checkbox",
      disabled: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable HTTPS Redirection', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will allow you to redirect your Target URLs in HTTPS.', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-form-group btl-form-group--teaser btl-form-group-uncloaked-categories"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Uncloak Categories', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_15__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field block",
      onClick: openUpgradeToProModal
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", {
      className: "btl-check",
      name: "is_autolink_headings",
      type: "checkbox",
      disabled: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enable uncloaking categories', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will allow you to uncloak categories', 'betterlinks')))))))), betterLinksHooks.applyFilters('BetterLinksAddOptionSettingsTabGeneral', null, _objectSpread(_objectSpread({}, props), {}, {
      postdatas: postdatas,
      terms: terms
    })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      className: "button-primary btn-save-settings",
      type: "submit"
    }, formSubmitText)));
  }));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    clicks: state.clicks,
    postdatas: state.postdatas,
    terms: state.terms
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_17__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_11__.update_option, dispatch),
    fetch_clicks_data: (0,redux__WEBPACK_IMPORTED_MODULE_17__.bindActionCreators)(_redux_actions_clicks_actions__WEBPACK_IMPORTED_MODULE_9__.fetch_clicks_data, dispatch),
    fetch_post_types_data: (0,redux__WEBPACK_IMPORTED_MODULE_17__.bindActionCreators)(_redux_actions_posttypesdata_actions__WEBPACK_IMPORTED_MODULE_8__.fetch_post_types_data, dispatch),
    fetch_terms_data: (0,redux__WEBPACK_IMPORTED_MODULE_17__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_10__.fetch_terms_data, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_6__.connect)(mapStateToProps, mapDispatchToProps)(TabsGeneral));

/***/ }),

/***/ "./dev_betterlinks/containers/TabsOptions.js":
/*!***************************************************!*\
  !*** ./dev_betterlinks/containers/TabsOptions.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");
/* harmony import */ var _components_CreateLinkExternally__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/CreateLinkExternally */ "./dev_betterlinks/components/CreateLinkExternally/index.js");
/* harmony import */ var _components_Teasers_AffiliateLinkDisclosure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Teasers/AffiliateLinkDisclosure */ "./dev_betterlinks/components/Teasers/AffiliateLinkDisclosure/index.js");
/* harmony import */ var _components_Teasers_AutoLinkCreate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Teasers/AutoLinkCreate */ "./dev_betterlinks/components/Teasers/AutoLinkCreate/index.js");
/* harmony import */ var _components_Teasers_CustomizeMetaTags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Teasers/CustomizeMetaTags */ "./dev_betterlinks/components/Teasers/CustomizeMetaTags/index.js");
/* harmony import */ var _components_Teasers_ExternalAnalytics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Teasers/ExternalAnalytics */ "./dev_betterlinks/components/Teasers/ExternalAnalytics.js");
/* harmony import */ var _components_Teasers_PasswordProtection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Teasers/PasswordProtection */ "./dev_betterlinks/components/Teasers/PasswordProtection/index.js");
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _CustomFields__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CustomFields */ "./dev_betterlinks/containers/CustomFields/index.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/data */ "./dev_betterlinks/utils/data.js");
/* harmony import */ var _components_FluentBoardSettings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/FluentBoardSettings */ "./dev_betterlinks/components/FluentBoardSettings/index.js");
/* harmony import */ var _components_Teasers_AutoLinkKeywords__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/Teasers/AutoLinkKeywords */ "./dev_betterlinks/components/Teasers/AutoLinkKeywords/index.js");















var TabsOptions = function TabsOptions(_ref) {
  var settings = _ref.settings,
    postdatas = _ref.postdatas,
    autoCreateLinkSettings = _ref.autoCreateLinkSettings,
    terms = _ref.terms,
    trackingSettings = _ref.trackingSettings,
    setAutoCreateLinkSettings = _ref.setAutoCreateLinkSettings;
  var panelList = [(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomFields__WEBPACK_IMPORTED_MODULE_11__["default"], {
    settings: settings
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_CreateLinkExternally__WEBPACK_IMPORTED_MODULE_3__["default"], {
    settings: settings,
    terms: terms
  }), _utils_helper__WEBPACK_IMPORTED_MODULE_10__.is_fbs_enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_FluentBoardSettings__WEBPACK_IMPORTED_MODULE_13__["default"], {
    settings: settings,
    terms: terms
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Teasers_ExternalAnalytics__WEBPACK_IMPORTED_MODULE_7__["default"], {
    trackingSettings: trackingSettings
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Teasers_AutoLinkCreate__WEBPACK_IMPORTED_MODULE_5__["default"], {
    autoCreateLinkSettings: autoCreateLinkSettings,
    terms: terms,
    setAutoCreateLinkSettings: setAutoCreateLinkSettings
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Teasers_AffiliateLinkDisclosure__WEBPACK_IMPORTED_MODULE_4__["default"], {
    settings: settings,
    postTypes: (postdatas === null || postdatas === void 0 ? void 0 : postdatas.postTypes) || []
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Teasers_PasswordProtection__WEBPACK_IMPORTED_MODULE_8__["default"], {
    settings: settings
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Teasers_CustomizeMetaTags__WEBPACK_IMPORTED_MODULE_6__["default"], {
    settings: settings
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Teasers_AutoLinkKeywords__WEBPACK_IMPORTED_MODULE_14__["default"], {
    settings: settings,
    postdatas: postdatas
  })].filter(Boolean);
  var optionsTabList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabList', _utils_data__WEBPACK_IMPORTED_MODULE_12__.tabList);
  var optionsTabPanelList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabPanelList', panelList);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "betterlinks-options-tabs-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_9__.Tabs, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_9__.TabList, null, optionsTabList.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_9__.Tab, {
      key: index
    }, item.label, 'pro' === item.type && !_utils_helper__WEBPACK_IMPORTED_MODULE_10__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-tab-panel-inner",
    style: {
      height: 'fit-content',
      width: '800px'
    }
  }, optionsTabPanelList.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_9__.TabPanel, {
      key: index
    }, item);
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabsOptions);

/***/ }),

/***/ "./dev_betterlinks/containers/TabsTools.js":
/*!*************************************************!*\
  !*** ./dev_betterlinks/containers/TabsTools.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");






var TabsTools = function TabsTools(_ref) {
  var query = _ref.query;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('default'),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    importerMode = _useState2[0],
    setImporterMode = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    taPrefix = _useState4[0],
    setTaPrefix = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('links'),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
    exportMode = _useState6[0],
    setExportMode = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState7, 2),
    importResponse = _useState8[0],
    setImportResponse = _useState8[1];
  var importerModeHandler = function importerModeHandler(changeEvent) {
    setImporterMode(changeEvent.target.value);
  };
  var exportModeHandler = function exportModeHandler(changeEvent) {
    setExportMode(changeEvent.target.value);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (query.get('import')) {
      axios__WEBPACK_IMPORTED_MODULE_2___default().post("".concat(ajaxurl, "?action=betterlinks/tools/get_import_info&security=").concat(_utils_helper__WEBPACK_IMPORTED_MODULE_4__.nonce)).then(function (response) {
        setImportResponse(JSON.parse(response.data.data));
      }, function (error) {
        console.log(error);
      });
    }
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-tab-inner-divider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-tab-panel-inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", {
    className: "btl-tab-panel-header"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose an Option You want to Export', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("form", {
    action: 'admin.php?page=' + query.get('page') + '&export=true&nonce=' + _utils_helper__WEBPACK_IMPORTED_MODULE_4__.betterlinks_nonce,
    method: "POST"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    role: "group",
    className: "btl-radio-group",
    "aria-labelledby": "my-radio-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-radio"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "radio",
    name: "content",
    value: "links",
    checked: exportMode === 'links',
    onChange: exportModeHandler
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Links', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-radio"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "radio",
    name: "content",
    value: "clicks",
    checked: exportMode === 'clicks',
    onChange: exportModeHandler
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Analytics', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-radio"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "radio",
    name: "content",
    value: "simplecsvfile",
    checked: exportMode === 'simplecsvfile',
    onChange: exportModeHandler
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sample CSV File', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    type: "submit",
    className: "btl-export-download-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Export File', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-tab-panel-inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", {
    className: "btl-tab-panel-header"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose the Plugin You Want to Import from', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("form", {
    action: 'admin.php?page=' + query.get('page') + '&import=true&nonce=' + _utils_helper__WEBPACK_IMPORTED_MODULE_4__.betterlinks_nonce,
    method: "POST",
    encType: "multipart/form-data"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    role: "group",
    className: "btl-radio-group",
    "aria-labelledby": "my-radio-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-radio"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "radio",
    name: "mode",
    value: "default",
    checked: importerMode === 'default',
    onChange: importerModeHandler
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('BetterLinks', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-radio"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "radio",
    name: "mode",
    value: "prettylinks",
    checked: importerMode === 'prettylinks',
    onChange: importerModeHandler
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pretty Links', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-radio"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "radio",
    name: "mode",
    value: "simple301redirects",
    checked: importerMode === 'simple301redirects',
    onChange: importerModeHandler
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Simple 301 Redirects', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    className: "btl-radio"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "radio",
    name: "mode",
    value: "thirstyaffiliates",
    checked: importerMode === 'thirstyaffiliates',
    onChange: importerModeHandler
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ThirstyAffiliates', 'betterlinks')))), importerMode === 'thirstyaffiliates' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    name: "ta_prefix",
    id: "ta_prefix",
    type: "text",
    placeholder: "Link Prefix",
    value: taPrefix,
    onChange: function onChange(e) {
      return setTaPrefix(e.target.value);
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: "btl-file-chooser"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    htmlFor: "upload"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose the File You Want to Import', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "file",
    id: "upload_file",
    name: "upload_file",
    size: "25",
    required: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: "submit"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "submit",
    name: "submit",
    id: "submit",
    className: "button button-primary",
    value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Import File', 'betterlinks'),
    disabled: ""
  })))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    id: "response"
  }, Object.entries(importResponse).map(function (_ref2) {
    var _ref3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, 2),
      index = _ref3[0],
      item = _ref3[1];
    return item.map(function (childItem, chiildIndex) {
      return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        key: chiildIndex
      }, childItem);
    });
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabsTools);

/***/ }),

/***/ "./dev_betterlinks/containers/TopBar.js":
/*!**********************************************!*\
  !*** ./dev_betterlinks/containers/TopBar.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../redux/actions/activity.actions */ "./dev_betterlinks/redux/actions/activity.actions.js");
/* harmony import */ var _redux_actions_favouritesort_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../redux/actions/favouritesort.actions */ "./dev_betterlinks/redux/actions/favouritesort.actions.js");
/* harmony import */ var _DeleteClicks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DeleteClicks */ "./dev_betterlinks/containers/DeleteClicks.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");


var _excluded = ["is_pro", "render"];











var propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().string),
  render: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func)
};
var TopBar = function TopBar(_ref) {
  var _ref$is_pro = _ref.is_pro,
    is_pro = _ref$is_pro === void 0 ? false : _ref$is_pro,
    _ref$render = _ref.render,
    render = _ref$render === void 0 ? function () {} : _ref$render,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  var propsForAnalytics = props.propsForAnalytics;
  var mode = props.activity.darkMode;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(mode),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    isDarkMode = _useState2[0],
    setIsDarkMode = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (mode) {
      document.body.classList.add('betterlinks-dark-mode');
    } else {
      document.body.classList.remove('betterlinks-dark-mode');
    }
  }, []);
  var darkModeHandler = function darkModeHandler(mode) {
    if (mode) {
      document.body.classList.add('betterlinks-dark-mode');
    } else {
      document.body.classList.remove('betterlinks-dark-mode');
    }
    props.update_theme_mode(mode);
    setIsDarkMode(mode);
  };
  var currentPage = betterLinksQuery.get('page');
  var sortByFav = props.favouriteSort.sortByFav;
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar__logo_container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar__logo"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_5__.plugin_root_url + "assets/images/logo-large".concat(isDarkMode ? '-white' : '', ".svg"),
    alt: "logo"
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "topbar__logo__text"
  }, props.label), is_pro && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__["default"], null)), render()), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar-inner"
  }, currentPage === 'betterlinks' && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-view-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Favorite Links', 'betterlinks'),
    className: "btl-link-view-toggler btl-sortby-fav ".concat(sortByFav ? 'active' : ''),
    onClick: function onClick() {
      return props.sortFavourite(!sortByFav);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "favorite-svg",
    viewBox: "0 0 512 512",
    xmlSpace: "preserve"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("path", {
    className: "fav-icon-svg-path",
    d: "M392.2 317.5c-3 2.9-4.4 7.1-3.7 11.3L414 477.4c1.2 7-3.5 13.6-10.5 14.9-2.8.5-5.6 0-8.1-1.3L262 420.9c-3.7-2-8.2-2-12 0L116.6 491c-3.1 1.7-6.8 1.9-10.1.8-6-2.1-9.5-8.1-8.5-14.4l25.4-148.5c.7-4.2-.7-8.4-3.7-11.4L11.9 212.4c-5.1-5-5.2-13.1-.2-18.2 2-2 4.6-3.3 7.3-3.7l149.1-21.7c4.2-.6 7.8-3.2 9.7-7l66.7-135c2.6-5.3 8.4-8.1 14.2-6.9 3.9.7 7.2 3.3 8.9 6.9l66.7 135c1.9 3.8 5.5 6.4 9.7 7l149 21.6c7 1 11.9 7.6 10.9 14.6-.4 2.7-1.7 5.3-3.7 7.2l-108 105.3z"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('List View', 'betterlinks'),
    className: "btl-link-view-toggler ".concat(props.activity.linksView == 'list' ? 'active' : ''),
    onClick: function onClick() {
      return props.linksView('list');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-list"
  })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Grid View', 'betterlinks'),
    className: "btl-link-view-toggler ".concat(props.activity.linksView == 'grid' ? 'active' : ''),
    onClick: function onClick() {
      return props.linksView('grid');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-grid"
  })))), (propsForAnalytics === null || propsForAnalytics === void 0 ? void 0 : propsForAnalytics.isResetAnalytics) && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_DeleteClicks__WEBPACK_IMPORTED_MODULE_8__["default"], {
    propsForAnalytics: propsForAnalytics
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "theme-mood-button",
    htmlFor: "theme-mood",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Theme Mode', 'betterlinks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    type: "checkbox",
    name: "theme-mood",
    id: "theme-mood",
    value: isDarkMode,
    onChange: function onChange() {
      return darkModeHandler(!isDarkMode);
    },
    checked: isDarkMode
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "theme-mood"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-sun"
  })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-moon"
  }))))));
};
TopBar.propTypes = propTypes;
// TopBar.defaultProps = defaultProps;

var mapStateToProps = function mapStateToProps(state) {
  return {
    activity: state.activity,
    favouriteSort: state.favouriteSort
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    linksView: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__.linksView, dispatch),
    sortFavourite: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_favouritesort_actions__WEBPACK_IMPORTED_MODULE_7__.sortFavourite, dispatch),
    update_theme_mode: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__.update_theme_mode, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)(TopBar));

/***/ }),

/***/ "./dev_betterlinks/pages/Settings.js":
/*!*******************************************!*\
  !*** ./dev_betterlinks/pages/Settings.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _redux_actions_posttypesdata_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../redux/actions/posttypesdata.actions */ "./dev_betterlinks/redux/actions/posttypesdata.actions.js");
/* harmony import */ var _containers_TopBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../containers/TopBar */ "./dev_betterlinks/containers/TopBar.js");
/* harmony import */ var _containers_TabsGeneral__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../containers/TabsGeneral */ "./dev_betterlinks/containers/TabsGeneral.js");
/* harmony import */ var _containers_TabsTools__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../containers/TabsTools */ "./dev_betterlinks/containers/TabsTools.js");
/* harmony import */ var _containers_Migration__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../containers/Migration */ "./dev_betterlinks/containers/Migration.js");
/* harmony import */ var _components_Teasers_RoleManagement__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/Teasers/RoleManagement */ "./dev_betterlinks/components/Teasers/RoleManagement.js");
/* harmony import */ var _components_Teasers_BrokenLinks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/Teasers/BrokenLinks */ "./dev_betterlinks/components/Teasers/BrokenLinks.js");
/* harmony import */ var _components_Teasers_GoPremium__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/Teasers/GoPremium */ "./dev_betterlinks/components/Teasers/GoPremium.js");
/* harmony import */ var _components_Docs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/Docs */ "./dev_betterlinks/components/Docs/index.js");
/* harmony import */ var _containers_TabsOptions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../containers/TabsOptions */ "./dev_betterlinks/containers/TabsOptions.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var _containers_TabsBrokenLinkChecker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../containers/TabsBrokenLinkChecker */ "./dev_betterlinks/containers/TabsBrokenLinkChecker.js");






















function useQuery() {
  return new URLSearchParams((0,react_router_dom__WEBPACK_IMPORTED_MODULE_19__.useLocation)().search);
}
var Settings = function Settings(props) {
  var _props$settings;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    autoCreateLinkSettings = _useState2[0],
    setAutoCreateLinkSettings = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    trackingSettings = _useState4[0],
    setTrackingSettings = _useState4[1];
  var query = useQuery();
  var currentTab = query.get('import');
  var migration = query.get('migration');
  var settings = props.settings.settings;
  var terms = props.terms.terms;
  var tabList = betterLinksHooks.applyFilters('betterLinksSettingsFilterTabList', [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('General', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Advanced Options', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tools', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Role Management', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Go Premium', 'betterlinks')]);
  var tabPanel = betterLinksHooks.applyFilters('betterLinksSettingsFilterTabPanel', [(0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_containers_TabsGeneral__WEBPACK_IMPORTED_MODULE_8__["default"], {
    settings: settings
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_containers_TabsOptions__WEBPACK_IMPORTED_MODULE_15__["default"], {
    settings: settings,
    postdatas: (props === null || props === void 0 ? void 0 : props.postdatas) || {},
    autoCreateLinkSettings: autoCreateLinkSettings,
    terms: terms,
    trackingSettings: (_props$settings = props.settings) === null || _props$settings === void 0 ? void 0 : _props$settings.tracking,
    setTrackingSettings: setTrackingSettings,
    setAutoCreateLinkSettings: setAutoCreateLinkSettings
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_containers_TabsTools__WEBPACK_IMPORTED_MODULE_9__["default"], {
    query: query
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Teasers_RoleManagement__WEBPACK_IMPORTED_MODULE_11__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Teasers_GoPremium__WEBPACK_IMPORTED_MODULE_13__["default"], null)]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var _props$settings2;
    if (!settings) {
      props.fetch_settings_data();
    }
    if (!(props !== null && props !== void 0 && (_props$settings2 = props.settings) !== null && _props$settings2 !== void 0 && _props$settings2.tracking)) {
      props.fetch_tracking_settings();
    }
    if (!props.postdatas.fetchedAll) {
      props.fetch_post_types_data();
    }
    if (_utils_helper__WEBPACK_IMPORTED_MODULE_16__.is_pro_enabled) {
      (0,_utils_helper__WEBPACK_IMPORTED_MODULE_16__.makeRequest)({
        action: 'betterlinks/admin/get_auto_create_links_settings'
      }).then(function (response) {
        if (response.data.data) {
          var _settings = response.data.data;
          setAutoCreateLinkSettings({
            enable_auto_link: _settings.enable_auto_link,
            post_shortlinks: _settings.enable_auto_link && _settings.post_shortlinks,
            post_default_cat: _settings.enable_auto_link && _settings.post_shortlinks && _settings.post_default_cat,
            page_shortlinks: _settings.enable_auto_link && _settings.page_shortlinks,
            page_default_cat: _settings.enable_auto_link && _settings.page_shortlinks && _settings.page_default_cat
          });
        }
      });
    }
    if (!terms) {
      props.fetch_terms_data();
    }
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_containers_TopBar__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('BetterLinks Settings', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.Tabs, {
    defaultIndex: currentTab == 'true' ? 2 : 0
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.TabList, null, tabList.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.Tab, {
      key: index
    }, item);
  })), tabPanel.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.TabPanel, {
      key: index
    }, item);
  })), migration && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_containers_Migration__WEBPACK_IMPORTED_MODULE_10__["default"], {
    mode: migration
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Docs__WEBPACK_IMPORTED_MODULE_14__["default"], null));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    settings: state.settings,
    postdatas: state.postdatas,
    terms: state.terms
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetch_settings_data: (0,redux__WEBPACK_IMPORTED_MODULE_20__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_5__.fetch_settings_data, dispatch),
    fetch_tracking_settings: (0,redux__WEBPACK_IMPORTED_MODULE_20__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_5__.fetch_tracking_settings, dispatch),
    fetch_post_types_data: (0,redux__WEBPACK_IMPORTED_MODULE_20__.bindActionCreators)(_redux_actions_posttypesdata_actions__WEBPACK_IMPORTED_MODULE_6__.fetch_post_types_data, dispatch),
    fetch_terms_data: (0,redux__WEBPACK_IMPORTED_MODULE_20__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_17__.fetch_terms_data, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_4__.connect)(mapStateToProps, mapDispatchToProps)(Settings));

/***/ }),

/***/ "./node_modules/react-select/creatable/dist/react-select.esm.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-select/creatable/dist/react-select.esm.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaultProps: () => (/* binding */ defaultProps),
/* harmony export */   makeCreatableSelect: () => (/* binding */ makeCreatableSelect)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../dist/index-4bd03571.esm.js */ "./node_modules/react-select/dist/index-4bd03571.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _dist_Select_dbb12e54_esm_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../dist/Select-dbb12e54.esm.js */ "./node_modules/react-select/dist/Select-dbb12e54.esm.js");
/* harmony import */ var _dist_stateManager_845a3300_esm_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../dist/stateManager-845a3300.esm.js */ "./node_modules/react-select/dist/stateManager-845a3300.esm.js");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var react_input_autosize__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-input-autosize */ "./node_modules/react-input-autosize/lib/AutosizeInput.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_11__);


















var compareOption = function compareOption() {
  var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var option = arguments.length > 1 ? arguments[1] : undefined;
  var accessors = arguments.length > 2 ? arguments[2] : undefined;
  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  var optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};

var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return "Create \"".concat(inputValue, "\"");
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions, accessors) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  },
  getOptionValue: _dist_Select_dbb12e54_esm_js__WEBPACK_IMPORTED_MODULE_12__.g,
  getOptionLabel: _dist_Select_dbb12e54_esm_js__WEBPACK_IMPORTED_MODULE_12__.a
};
var defaultProps = (0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_13__.a)({
  allowCreateWhileLoading: false,
  createOptionPosition: 'last'
}, builtins);
var makeCreatableSelect = function makeCreatableSelect(SelectComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_Component) {
    (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Creatable, _Component);

    var _super = (0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_13__._)(Creatable);

    function Creatable(props) {
      var _this;

      (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Creatable);

      _this = _super.call(this, props);
      _this.select = void 0;

      _this.onChange = function (newValue, actionMeta) {
        var _this$props = _this.props,
            getNewOptionData = _this$props.getNewOptionData,
            inputValue = _this$props.inputValue,
            isMulti = _this$props.isMulti,
            onChange = _this$props.onChange,
            onCreateOption = _this$props.onCreateOption,
            value = _this$props.value,
            name = _this$props.name;

        if (actionMeta.action !== 'select-option') {
          return onChange(newValue, actionMeta);
        }

        var newOption = _this.state.newOption;
        var valueArray = Array.isArray(newValue) ? newValue : [newValue];

        if (valueArray[valueArray.length - 1] === newOption) {
          if (onCreateOption) onCreateOption(inputValue);else {
            var newOptionData = getNewOptionData(inputValue, inputValue);
            var newActionMeta = {
              action: 'create-option',
              name: name,
              option: newOptionData
            };

            if (isMulti) {
              onChange([].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_13__.E)(value)), [newOptionData]), newActionMeta);
            } else {
              onChange(newOptionData, newActionMeta);
            }
          }
          return;
        }

        onChange(newValue, actionMeta);
      };

      var options = props.options || [];
      _this.state = {
        newOption: undefined,
        options: options
      };
      return _this;
    }

    (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Creatable, [{
      key: "focus",
      value: function focus() {
        this.select.focus();
      }
    }, {
      key: "blur",
      value: function blur() {
        this.select.blur();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var options = this.state.options;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(SelectComponent, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.props, {
          ref: function ref(_ref) {
            _this2.select = _ref;
          },
          options: options,
          onChange: this.onChange
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        var allowCreateWhileLoading = props.allowCreateWhileLoading,
            createOptionPosition = props.createOptionPosition,
            formatCreateLabel = props.formatCreateLabel,
            getNewOptionData = props.getNewOptionData,
            inputValue = props.inputValue,
            isLoading = props.isLoading,
            isValidNewOption = props.isValidNewOption,
            value = props.value,
            getOptionValue = props.getOptionValue,
            getOptionLabel = props.getOptionLabel;
        var options = props.options || [];
        var newOption = state.newOption;

        if (isValidNewOption(inputValue, (0,_dist_index_4bd03571_esm_js__WEBPACK_IMPORTED_MODULE_13__.E)(value), options, {
          getOptionValue: getOptionValue,
          getOptionLabel: getOptionLabel
        })) {
          newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
        } else {
          newOption = undefined;
        }

        return {
          newOption: newOption,
          options: (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(options)) : [].concat((0,_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(options), [newOption]) : options
        };
      }
    }]);

    return Creatable;
  }(react__WEBPACK_IMPORTED_MODULE_5__.Component), _class.defaultProps = defaultProps, _temp;
}; // TODO: do this in package entrypoint

var SelectCreatable = makeCreatableSelect(_dist_Select_dbb12e54_esm_js__WEBPACK_IMPORTED_MODULE_12__.S);
var Creatable = (0,_dist_stateManager_845a3300_esm_js__WEBPACK_IMPORTED_MODULE_14__.m)(SelectCreatable);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Creatable);



/***/ })

}]);
//# sourceMappingURL=Settings.js.map