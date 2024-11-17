"use strict";
(globalThis["webpackChunkbetterlinks"] = globalThis["webpackChunkbetterlinks"] || []).push([["QuickSetup"],{

/***/ "./dev_betterlinks/components/Copy/index.js":
/*!**************************************************!*\
  !*** ./dev_betterlinks/components/Copy/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Copy)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");





var propTypes = {
  siteUrl: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  shortUrl: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
};
function Copy(_ref) {
  var siteUrl = _ref.siteUrl,
    shortUrl = _ref.shortUrl;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    isCopyUrl = _useState2[0],
    setCopyUrl = _useState2[1];
  var copyShortUrlHandler = function copyShortUrlHandler(shortUrl) {
    (0,_utils_helper__WEBPACK_IMPORTED_MODULE_2__.copyShortUrl)(shortUrl);
    setCopyUrl(true);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    type: "button",
    onClick: function onClick() {
      return copyShortUrlHandler(shortUrl);
    },
    className: "btl-link-copy-button"
  }, isCopyUrl ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "dashicons dashicons-yes"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-copy"
  }));
}
Copy.propTypes = propTypes;

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

/***/ "./dev_betterlinks/components/Select/index.js":
/*!****************************************************!*\
  !*** ./dev_betterlinks/components/Select/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var Select = function Select(props) {
  var _useField = (0,formik__WEBPACK_IMPORTED_MODULE_4__.useField)(props.name),
    _useField2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useField, 3),
    field = _useField2[0],
    setThisFieldValue = _useField2[2].setValue;
  var isCloakDisabled = ['cloak', 'pro'].includes(field.value) && !_utils_helper__WEBPACK_IMPORTED_MODULE_3__.is_pro_enabled;
  var defaultValue = isCloakDisabled ? '307' : field.value;
  if (isCloakDisabled) {
    setThisFieldValue('307');
  }
  var onChange = function onChange(option) {
    if (option == null) {
      return props.setFieldValue(field.name, '');
    }
    if (!!(props !== null && props !== void 0 && props.isQuickSetup)) {
      props === null || props === void 0 || props.setLinkOptions(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          redirect_type: props.isMulti ? option.map(function (item) {
            return item.value;
          }) : option.value
        });
      });
    }
    return props.setFieldValue(field.name, props.isMulti ? option.map(function (item) {
      return item.value;
    }) : option.value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(React.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "btl-modal-select--full ".concat(props.value && props.value.find(function (item) {
      return item.value == 'pro';
    }) ? 'btl-modal-select-need-pro-teaser' : ''),
    classNamePrefix: "btl-react-select",
    id: field.id,
    name: field.name,
    defaultValue: props.value && props.value.filter(function (item) {
      return item.value == (defaultValue || '307');
    }),
    onChange: onChange,
    options: props.value,
    isMulti: props.isMulti,
    isDisabled: props.disabled,
    isOptionDisabled: function isOptionDisabled(option) {
      return option.disabled;
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);

/***/ }),

/***/ "./dev_betterlinks/components/UTMBuilder/index.js":
/*!********************************************************!*\
  !*** ./dev_betterlinks/components/UTMBuilder/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UTMBuilder)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var _Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Teasers/UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }






var propTypes = {};
function UTMBuilder(_ref) {
  var targetUrl = _ref.targetUrl,
    saveValueHandler = _ref.saveValueHandler,
    closeModalHandler = _ref.closeModalHandler;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    isOpenUpgradeToProModal = _useState2[0],
    setUpgradeToProModal = _useState2[1];
  var parseUrl = query_string__WEBPACK_IMPORTED_MODULE_4__.parseUrl(targetUrl, {
    parseFragmentIdentifier: true
  });
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
      utm_source: parseUrl.query.utm_source ? parseUrl.query.utm_source : '',
      utm_medium: parseUrl.query.utm_medium ? parseUrl.query.utm_medium : '',
      utm_campaign: parseUrl.query.utm_campaign ? parseUrl.query.utm_campaign : '',
      utm_term: parseUrl.query.utm_term ? parseUrl.query.utm_term : '',
      utm_content: parseUrl.query.utm_content ? parseUrl.query.utm_content : ''
    }),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
    UTMBuilderState = _useState4[0],
    setUTMBuilderState = _useState4[1];
  var UTMSaveValueHandler = function UTMSaveValueHandler() {
    var rawURL = query_string__WEBPACK_IMPORTED_MODULE_4__.exclude(targetUrl, ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']);
    saveValueHandler('target_url', query_string__WEBPACK_IMPORTED_MODULE_4__.stringifyUrl({
      url: rawURL,
      query: Object.entries(UTMBuilderState).reduce(function (a, _ref2) {
        var _ref3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, 2),
          k = _ref3[0],
          v = _ref3[1];
        return !v || v == '' ? a : (a[k] = v, a);
      }, {})
    }));
    closeModalHandler();
  };
  var openUpgradeToProModal = function openUpgradeToProModal() {
    setUpgradeToProModal(true);
  };
  var closeUpgradeToProModal = function closeUpgradeToProModal() {
    setUpgradeToProModal(false);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("h3", {
    className: "btl-modal-utm-builder__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('UTM Builder', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-tooltip"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "dashicons dashicons-info-outline"
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl-tooltiptext",
    style: {
      width: '220px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Campaign Parameters to Track Custom Campaigns', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder__body"
  }, !betterLinksHooks.applyFilters('isActivePro', false) && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder__form-group btl-modal-utm-templates"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    htmlFor: "savedtemplate"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Template', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    name: "savedtemplate",
    id: "savedtemplate",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pick a Template', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_6__.plugin_root_url + 'assets/images/locked.svg',
    alt: "locked",
    style: {
      marginLeft: 5
    }
  })))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    htmlFor: "utmCampaign"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Campaign', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    id: "utmCampaign",
    value: UTMBuilderState.utm_campaign,
    onChange: function onChange(e) {
      return setUTMBuilderState(_objectSpread(_objectSpread({}, UTMBuilderState), {}, {
        utm_campaign: e.target.value
      }));
    },
    type: "text",
    name: "utm_campaign",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('e.g: Example-campaign', 'betterlinks')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    htmlFor: "utmMedium"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Medium', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    id: "utmMedium",
    value: UTMBuilderState.utm_medium,
    onChange: function onChange(e) {
      return setUTMBuilderState(_objectSpread(_objectSpread({}, UTMBuilderState), {}, {
        utm_medium: e.target.value
      }));
    },
    type: "text",
    name: "utm_medium",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('e.g: cpc, banner, email', 'betterlinks')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    htmlFor: "utmSource"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Source', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    id: "utmSource",
    value: UTMBuilderState.utm_source,
    onChange: function onChange(e) {
      return setUTMBuilderState(_objectSpread(_objectSpread({}, UTMBuilderState), {}, {
        utm_source: e.target.value
      }));
    },
    type: "text",
    name: "utm_source",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('e.g: Twitter, Facebook', 'betterlinks')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    htmlFor: "utmTerm"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Term', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    id: "utmTerm",
    value: UTMBuilderState.utm_term,
    onChange: function onChange(e) {
      return setUTMBuilderState(_objectSpread(_objectSpread({}, UTMBuilderState), {}, {
        utm_term: e.target.value
      }));
    },
    type: "text",
    name: "utm_term",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('e.g: paid keywords', 'betterlinks')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    htmlFor: "utmContent"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Content', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    id: "utmContent",
    value: UTMBuilderState.utm_content,
    onChange: function onChange(e) {
      return setUTMBuilderState(_objectSpread(_objectSpread({}, UTMBuilderState), {}, {
        utm_content: e.target.value
      }));
    },
    type: "text",
    name: "utm_content",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('e.g: text AD name', 'betterlinks')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-utm-builder__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    type: "button",
    onClick: function onClick() {
      return UTMSaveValueHandler();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Link', 'betterlinks')), !betterLinksHooks.applyFilters('isActivePro', false) && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    type: "button",
    onClick: function onClick(e) {
      return openUpgradeToProModal();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save New Template', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_6__.plugin_root_url + 'assets/images/locked-white.svg',
    alt: "locked"
  }))))));
}
UTMBuilder.propTypes = propTypes;

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

/***/ "./dev_betterlinks/containers/QuickSetup/Configuration.js":
/*!****************************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/Configuration.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");
/* harmony import */ var _components_RedirectType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/RedirectType */ "./dev_betterlinks/components/RedirectType/index.js");
/* harmony import */ var _components_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Teasers/UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../.. */ "./dev_betterlinks/index.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/data */ "./dev_betterlinks/utils/data.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }









var Configuration = function Configuration() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(___WEBPACK_IMPORTED_MODULE_7__.SetupContext),
    settings = _useContext.settings,
    setSettings = _useContext.setSettings,
    modal = _useContext.modal;
  var setUpgradeToProModal = modal.setUpgradeToProModal,
    openUpgradeToProModal = modal.openUpgradeToProModal;
  var handleOptions = function handleOptions(props, key) {
    var _props$values;
    props.setFieldValue(key, !((_props$values = props.values) !== null && _props$values !== void 0 && _props$values[key]));
    setSettings(function (prev) {
      var _props$values2;
      return _objectSpread(_objectSpread({}, prev), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, key, !((_props$values2 = props.values) !== null && _props$values2 !== void 0 && _props$values2[key])));
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "configuration"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Configuration', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Let’s adjust core settings to match your preferences, including link options, redirect types and tracking options, for a seamless setup experience.', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Formik, {
    initialValues: _objectSpread({}, settings)
  }, function (props) {
    var _props$values$prefix, _props$values3;
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Form, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tab-panel-inner"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Link Options', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Field, {
      className: "btl-check",
      name: "nofollow",
      type: "checkbox",
      onChange: function onChange() {
        handleOptions(props, 'nofollow');
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No Follow', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This will add nofollow attribute to your link. (Recommended)', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Field, {
      className: "btl-check",
      name: "sponsored",
      type: "checkbox",
      onChange: function onChange() {
        handleOptions(props, 'sponsored');
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sponsored', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Field, {
      className: "btl-check",
      name: "param_forwarding",
      type: "checkbox",
      onChange: function onChange() {
        return handleOptions(props, 'param_forwarding');
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Parameter Forwarding', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This will pass the parameters you have set in the target URL', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Field, {
      className: "btl-check",
      name: "track_me",
      type: "checkbox",
      onChange: function onChange() {
        return handleOptions(props, 'track_me');
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tracking', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This will let you check Analytics report of your links', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group btl-form-group--top"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Link Prefix', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "link-options__body",
      style: {
        flexDirection: 'column'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      style: {
        maxWidth: '200px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Field, {
      className: "btl-text-field",
      name: "prefix",
      value: (_props$values$prefix = (_props$values3 = props.values) === null || _props$values3 === void 0 ? void 0 : _props$values3.prefix) !== null && _props$values$prefix !== void 0 ? _props$values$prefix : 'go',
      type: "text",
      onChange: function onChange(option) {
        props.setFieldValue('prefix', option.target.value);
        setSettings(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            prefix: option.target.value
          });
        });
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "short-description"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The prefix will be added before your Shortened URL’s slug eg.', 'betterlinks'), betterLinksHooks.applyFilters('site_url', _utils_helper__WEBPACK_IMPORTED_MODULE_9__.site_url), props.values.prefix && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, "/", (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("strong", null, props.values.prefix)), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('/your-affiliate-link-name.', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Redirect Type', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_RedirectType__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: "btl-modal-select--full",
      classNamePrefix: "btl-react-select",
      id: "redirect_type",
      name: "redirect_type",
      setUpgradeToProModal: setUpgradeToProModal,
      value: [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_utils_data__WEBPACK_IMPORTED_MODULE_8__.redirectType), [{
        value: _utils_helper__WEBPACK_IMPORTED_MODULE_9__.is_pro_enabled ? 'cloak' : 'pro',
        label: _utils_helper__WEBPACK_IMPORTED_MODULE_9__.is_pro_enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloaked', 'betterlinks') : (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloaked', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_4__["default"], null))
      }]),
      defaultValue: settings.redirect_type == 'cloak' && !_utils_helper__WEBPACK_IMPORTED_MODULE_9__.is_pro_enabled ? '307' : settings.redirect_type,
      setFieldValue: props.setFieldValue,
      isMulti: false,
      isQuickSetup: true,
      setSettings: setSettings
    })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Wildcards', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-checkbox-field block"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(formik__WEBPACK_IMPORTED_MODULE_10__.Field, {
      className: "btl-check",
      name: "wildcards",
      type: "checkbox",
      onChange: function onChange() {
        return handleOptions(props, 'wildcards');
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use Wildcards?', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('To use wildcards, put an asterisk (*) after the folder name that you want to redirect.', 'betterlinks'))))))), betterLinksHooks.applyFilters('BetterLinksQuickSetupConfig', (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-form-group btl-form-group--teaser"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-form-label",
      onClick: openUpgradeToProModal
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Force HTTPS', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_4__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
      className: "btl-checkbox-field block",
      onClick: openUpgradeToProModal
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
      className: "btl-check",
      name: "force_https",
      type: "checkbox",
      disabled: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable HTTPS Redirection', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This will allow you to redirect your Target URLs in HTTPS.', 'betterlinks'))))))), _objectSpread(_objectSpread({}, props), {}, {
      handleOptions: handleOptions
    }))));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Configuration);

/***/ }),

/***/ "./dev_betterlinks/containers/QuickSetup/ConfirmationModal.js":
/*!********************************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/ConfirmationModal.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ "./dev_betterlinks/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../redux/actions/quick-setup.actions */ "./dev_betterlinks/redux/actions/quick-setup.actions.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");









var ConfirmationModal = function ConfirmationModal(_ref) {
  var _ta$links, _pl$links, _s3r$links, _s3r$wildcard, _s3r$links2, _s3r$wildcard2;
  var quickSetup = _ref.quickSetup;
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(___WEBPACK_IMPORTED_MODULE_2__.SetupContext),
    modalIsOpen = _useContext.modalIsOpen,
    setModalIsOpen = _useContext.setModalIsOpen,
    setModalConfirm = _useContext.setModalConfirm,
    migrationSettings = _useContext.migrationSettings,
    migrationStatus = _useContext.migrationStatus,
    setActiveStep = _useContext.setActiveStep;
  var closeModal = function closeModal() {
    setModalIsOpen(false);
    setModalConfirm(false);
  };
  var results = quickSetup.results;
  var pl = results.pl,
    ta = results.ta,
    s3r = results.s3r;
  var isMigrationCompleted = Object.keys(status).filter(function (item) {
    return migrationSettings[item];
  }).every(Boolean);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_3___default()), {
    isOpen: modalIsOpen,
    onRequestClose: closeModal,
    style: _utils_helper__WEBPACK_IMPORTED_MODULE_6__.modalCustomSmallStyles,
    ariaHideApp: false,
    parentSelector: function parentSelector() {
      return document.querySelector('.migration');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-manage-tags-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-close-modal",
    onClick: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "btl btl-cancel"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-confirmation-alert"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btl-modal-utm-builder__title",
    style: {
      textAlign: 'center',
      fontSize: '22px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Migration Logs', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-migration-logs"
  }, !(results.pl || results.ta || results.s3r) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-migration-logs__item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Running Migration....', 'betterlinks'))), ta && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-migration-logs__item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thirsty Affiliates:', 'betterlinks'))), ta === null || ta === void 0 || (_ta$links = ta.links) === null || _ta$links === void 0 ? void 0 : _ta$links.map(function (item) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, item);
  })), pl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-migration-logs__item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pretty Links:', 'betterlinks'))), pl === null || pl === void 0 || (_pl$links = pl.links) === null || _pl$links === void 0 ? void 0 : _pl$links.map(function (item) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, item);
  }), (pl === null || pl === void 0 ? void 0 : pl.duplicate_migration_detected__so_prevented_it_here) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pretty Links:Duplicate migration detected. So prevented it here.', 'betterlinks')), (pl === null || pl === void 0 ? void 0 : pl.btl_prettylinks_migration_running_in_background) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pretty Links migration running in background.', 'betterlinks'))), ((s3r === null || s3r === void 0 || (_s3r$links = s3r.links) === null || _s3r$links === void 0 ? void 0 : _s3r$links.length) > 0 || (s3r === null || s3r === void 0 || (_s3r$wildcard = s3r.wildcard) === null || _s3r$wildcard === void 0 ? void 0 : _s3r$wildcard.length) > 0) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-migration-logs__item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Simple 301 Redirects:', 'betterlinks'))), s3r === null || s3r === void 0 || (_s3r$links2 = s3r.links) === null || _s3r$links2 === void 0 ? void 0 : _s3r$links2.map(function (item) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, item);
  }), s3r === null || s3r === void 0 || (_s3r$wildcard2 = s3r.wildcard) === null || _s3r$wildcard2 === void 0 ? void 0 : _s3r$wildcard2.map(function (item) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, item);
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "next-tab-confirmation"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button",
    onClick: closeModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "button button-primary",
    disabled: !isMigrationCompleted,
    onClick: function onClick() {
      setActiveStep(3);
      setModalIsOpen(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Continue', 'betterlinks'))))));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    quickSetup: state.quickSetup
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_quick_setup: (0,redux__WEBPACK_IMPORTED_MODULE_7__.bindActionCreators)(_redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_5__.update_quick_setup, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_4__.connect)(mapStateToProps, mapDispatchToProps)(ConfirmationModal));

/***/ }),

/***/ "./dev_betterlinks/containers/QuickSetup/CreateLinks.js":
/*!**************************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/CreateLinks.js ***!
  \**************************************************************/
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
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../.. */ "./dev_betterlinks/index.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/data */ "./dev_betterlinks/utils/data.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _components_Select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Select */ "./dev_betterlinks/components/Select/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_UTMBuilder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/UTMBuilder */ "./dev_betterlinks/components/UTMBuilder/index.js");
/* harmony import */ var _components_Copy__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/Copy */ "./dev_betterlinks/components/Copy/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../redux/actions/quick-setup.actions */ "./dev_betterlinks/redux/actions/quick-setup.actions.js");




function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }













var CreateLink = function CreateLink(props) {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(___WEBPACK_IMPORTED_MODULE_5__.SetupContext),
    linkOptions = _useContext.linkOptions,
    setLinkOptions = _useContext.setLinkOptions,
    modal = _useContext.modal,
    settings = _useContext.settings;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    slugIsExists = _useState2[0],
    setSlugIsExists = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
    modalUTMIsOpen = _useState4[0],
    setModalUTMIsOpen = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState5, 2),
    isShowCustomUTMModalContent = _useState6[0],
    setIsShowCustomUTMModalContent = _useState6[1];
  var setUpgradeToProModal = modal.setUpgradeToProModal,
    openUpgradeToProModal = modal.openUpgradeToProModal;
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(_objectSpread(_objectSpread({}, linkOptions), settings)),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState7, 2),
    options = _useState8[0],
    setOptions = _useState8[1];
  var isDisableLinkFormEditView = betterLinksHooks.applyFilters('isDisableLinkFormEditView', false, options);
  var openUTMModal = function openUTMModal() {
    setModalUTMIsOpen(true);
  };
  var closeUTMModal = function closeUTMModal() {
    setIsShowCustomUTMModalContent(true);
    setModalUTMIsOpen(false);
  };
  var builtInUTMModalOpenHandler = function builtInUTMModalOpenHandler() {
    if (_utils_helper__WEBPACK_IMPORTED_MODULE_7__.is_pro_enabled) {
      setIsShowCustomUTMModalContent(false);
      openUTMModal();
    } else {
      openUpgradeToProModal();
    }
  };
  var handleTitleChange = function handleTitleChange(setFieldValue, title) {
    var short_url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    setFieldValue('link_title', title);
    var shortURL = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_7__.generateShortURL)(settings, short_url || title);
    if (shortURL.length > 0) {
      setFieldValue('short_url', shortURL);
      setSlugIsExists(false);
      return shortURL;
    }
    return '';
  };
  var closeDuplicateLinkModal = function closeDuplicateLinkModal() {
    props.update_quick_setup({
      duplicateLink: false
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "create-links"
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Create Link', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Let’s create a new link in seconds! Just set the slug, choose redirect rules, adjust link options and start tracking right away.', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "option"
  }, (props === null || props === void 0 ? void 0 : props.duplicateLink) && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "duplicate-link-modal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_9___default()), {
    isOpen: props.duplicateLink,
    onRequestClose: closeDuplicateLinkModal,
    style: _utils_helper__WEBPACK_IMPORTED_MODULE_7__.modalCustomSmallStyles,
    ariaHideApp: false,
    parentSelector: function parentSelector() {
      return document.querySelector('.create-links .option');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
    className: "btl-close-modal",
    onClick: closeDuplicateLinkModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("i", {
    className: "btl btl-cancel"
  })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Duplicate Link', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('The short URL you entered is already exists. Please enter a different short URL.', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Formik, {
    initialValues: betterLinksHooks.applyFilters('linkFormInitialValues', options),
    onSubmit: function onSubmit() {}
  }, function (props) {
    var errors = props.errors;
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Form, {
      className: "ReactModal__Content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-entry-content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_9___default()), {
      isOpen: modalUTMIsOpen,
      onRequestClose: closeUTMModal,
      style: _utils_helper__WEBPACK_IMPORTED_MODULE_7__.modalCustomSmallStyles,
      ariaHideApp: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-close-modal",
      onClick: closeUTMModal
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("i", {
      className: "btl btl-cancel"
    })), isShowCustomUTMModalContent ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, betterLinksHooks.applyFilters('linksUTMBuilderField', (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_components_UTMBuilder__WEBPACK_IMPORTED_MODULE_10__["default"], {
      targetUrl: props.values.target_url,
      saveValueHandler: props.setFieldValue,
      closeModalHandler: closeUTMModal
    }), props.values.target_url, props.setFieldValue, closeUTMModal)) : (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(React.Fragment, null, betterLinksHooks.applyFilters('linksBuiltInUTMBuilderField', '', props.values.target_url, props.setFieldValue, closeUTMModal))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-entry-content-left",
      style: {
        marginBottom: '20px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-modal-form-label btl-required",
      htmlFor: "link_title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Title', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-modal-form-title-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Field, {
      className: "btl-modal-form-control",
      id: "link_title",
      name: "link_title",
      disabled: isDisableLinkFormEditView,
      onChange: function onChange(e) {
        var short_url = handleTitleChange(props.setFieldValue, e.target.value);
        props.setFieldValue('short_url', short_url);
        setLinkOptions(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            link_title: e.target.value,
            short_url: short_url
          });
        });
      },
      required: true
    }), (errors === null || errors === void 0 ? void 0 : errors.link_title) && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      style: {
        color: 'red'
      }
    }, errors === null || errors === void 0 ? void 0 : errors.link_title)))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-modal-form-label btl-required",
      htmlFor: "redirect_type"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Redirect Type', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_components_Select__WEBPACK_IMPORTED_MODULE_8__["default"], {
      id: "redirect_type",
      name: "redirect_type",
      value: [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_utils_data__WEBPACK_IMPORTED_MODULE_6__.redirectType), [{
        value: _utils_helper__WEBPACK_IMPORTED_MODULE_7__.is_pro_enabled ? 'cloak' : 'pro',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cloaked', 'betterlinks'),
        disabled: !_utils_helper__WEBPACK_IMPORTED_MODULE_7__.is_pro_enabled
      }]),
      setUpgradeToProModal: setUpgradeToProModal,
      setFieldValue: props.setFieldValue,
      disabled: isDisableLinkFormEditView,
      isMulti: false,
      enable_password: false,
      isQuickSetup: true,
      setLinkOptions: setLinkOptions
    })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-modal-form-group btl-has-utm-button"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-modal-form-label btl-required",
      htmlFor: "target_url"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Target URL', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Field, {
      className: "btl-modal-form-control",
      id: "target_url",
      name: "target_url",
      onChange: function onChange(e) {
        var target_url = e.target.value.replace(/\s+/g, '');
        props.setFieldValue('target_url', target_url);
        setLinkOptions(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            target_url: target_url
          });
        });
      },
      placeholder: "",
      disabled: isDisableLinkFormEditView,
      required: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-utm-button-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      type: "button",
      className: "btl-utm-button",
      onClick: openUTMModal,
      disabled: isDisableLinkFormEditView
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('UTM', 'betterlinks')), !_utils_helper__WEBPACK_IMPORTED_MODULE_7__.is_pro_enabled ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      type: "button",
      className: "btl-share-button btl-share-button--locked",
      onClick: builtInUTMModalOpenHandler,
      disabled: isDisableLinkFormEditView
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("i", {
      className: "btl btl-share"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("img", {
      className: "locked",
      src: _utils_helper__WEBPACK_IMPORTED_MODULE_7__.plugin_root_url + 'assets/images/lock-round.svg',
      alt: "icon"
    })) : (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      type: "button",
      className: "btl-share-button",
      onClick: builtInUTMModalOpenHandler,
      disabled: isDisableLinkFormEditView
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("i", {
      className: "btl btl-share"
    })))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-modal-shorturl-wrap"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-modal-form-group shorturl"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-modal-form-label",
      htmlFor: "short_url"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Shortened URL', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: slugIsExists ? 'btl-link-field-copyable is-invalid' : 'btl-link-field-copyable'
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-static-link"
    }, _utils_helper__WEBPACK_IMPORTED_MODULE_7__.site_url + '/'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Field, {
      className: "btl-dynamic-link",
      id: "short_url",
      name: "short_url",
      onChange: function onChange(e) {
        var short_url = e.target.value.replace(/\s+/g, '-');
        props.setFieldValue('short_url', short_url);
        setLinkOptions(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            short_url: short_url
          });
        });
        setSlugIsExists(false);
      },
      disabled: isDisableLinkFormEditView,
      required: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_components_Copy__WEBPACK_IMPORTED_MODULE_11__["default"], {
      siteUrl: _utils_helper__WEBPACK_IMPORTED_MODULE_7__.site_url,
      shortUrl: props.values.short_url
    }))), slugIsExists == true && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "errorlog"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Already Exists', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-entry-content-right"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options link-options--open"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
      className: "link-options__head",
      type: "button"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("h4", {
      className: "link-options__head--title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Link Options', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Field, {
      className: "btl-check",
      name: "nofollow",
      type: "checkbox",
      onChange: function onChange() {
        props.setFieldValue('nofollow', !props.values.nofollow);
        setLinkOptions(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            nofollow: !props.values.nofollow
          });
        });
      },
      disabled: isDisableLinkFormEditView
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No Follow', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will add nofollow attribute to your link. (Recommended)', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Field, {
      className: "btl-check",
      name: "sponsored",
      type: "checkbox",
      onChange: function onChange() {
        props.setFieldValue('sponsored', !props.values.sponsored);
        setLinkOptions(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            sponsored: !props.values.sponsored
          });
        });
      },
      disabled: isDisableLinkFormEditView
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Sponsored', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Field, {
      className: "btl-check",
      name: "param_forwarding",
      type: "checkbox",
      onChange: function onChange() {
        props.setFieldValue('param_forwarding', !props.values.param_forwarding);
        setLinkOptions(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            param_forwarding: !props.values.param_forwarding
          });
        });
      },
      disabled: isDisableLinkFormEditView
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Parameter Forwarding', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will pass the parameters you have set in the target URL', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(formik__WEBPACK_IMPORTED_MODULE_14__.Field, {
      className: "btl-check",
      name: "track_me",
      type: "checkbox",
      onChange: function onChange() {
        props.setFieldValue('track_me', !props.values.track_me);
        setLinkOptions(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            track_me: !props.values.track_me
          });
        });
      },
      disabled: isDisableLinkFormEditView
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tracking', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('This will let you check Analytics report of your links', 'betterlinks'))))))))));
  }))));
};
var mapStateToProps = function mapStateToProps(state) {
  var _state$quickSetup;
  return {
    duplicateLink: (_state$quickSetup = state.quickSetup) === null || _state$quickSetup === void 0 ? void 0 : _state$quickSetup.duplicateLink
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_quick_setup: (0,redux__WEBPACK_IMPORTED_MODULE_15__.bindActionCreators)(_redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_13__.update_quick_setup, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_12__.connect)(mapStateToProps, mapDispatchToProps)(CreateLink));

/***/ }),

/***/ "./dev_betterlinks/containers/QuickSetup/Finish.js":
/*!*********************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/Finish.js ***!
  \*********************************************************/
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
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../redux/actions/quick-setup.actions */ "./dev_betterlinks/redux/actions/quick-setup.actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var canvas_confetti__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! canvas-confetti */ "./node_modules/canvas-confetti/dist/confetti.module.mjs");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }







var Finish = function Finish(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    copy = _useState2[0],
    setCopy = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    window.scrollTo(0, 0);
    props.update_quick_setup({
      isCreated: false,
      duplicateLink: false
    });
    var timer = setTimeout(function () {
      runConfetti();
    }, 150);
    return function () {
      clearTimeout(timer);
    };
  }, []);
  var runConfetti = function runConfetti() {
    var count = 500;
    var defaults = {
      origin: {
        y: 0.5,
        x: 0.55
      }
    };
    function fire(particleRatio, opts) {
      (0,canvas_confetti__WEBPACK_IMPORTED_MODULE_7__["default"])(_objectSpread(_objectSpread(_objectSpread({}, defaults), opts), {}, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }
    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    fire(0.2, {
      spread: 60
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "finish"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    id: "confetti"
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Great Job!', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Link creation is complete and ready to help you, share, track, manage and optimize your links efficiently.', 'betterlinks')), (props === null || props === void 0 ? void 0 : props.createdLink) && Object.keys(props.createdLink).length && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-shortened-url"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, "".concat(_utils_helper__WEBPACK_IMPORTED_MODULE_4__.site_url, "/").concat(props.createdLink.short_url)), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    className: "btl-short-url-copy-button btl-tooltip",
    onClick: function onClick() {
      setCopy(true);
      (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.copyToClipboard)("".concat(_utils_helper__WEBPACK_IMPORTED_MODULE_4__.site_url, "/").concat(props.createdLink.short_url));
      setTimeout(function () {
        setCopy(false);
      }, 1000);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "icon"
  }, !copy && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
    width: 15,
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_4__.plugin_root_url + '/assets/images/copy-icon-1.svg',
    alt: "icon"
  }), copy && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "dashicons dashicons-yes"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("a", {
    href: "".concat(_utils_helper__WEBPACK_IMPORTED_MODULE_4__.site_url, "/").concat(props.createdLink.short_url),
    target: "_blank",
    className: "dashicons dashicons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
    width: 15,
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_4__.plugin_root_url + '/assets/images/icons/target.svg'
  })))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_4__.plugin_root_url + '/assets/images/finish-setup.png',
    alt: "Setup Finish"
  }))));
};
var mapStateToProps = function mapStateToProps(state) {
  var _state$quickSetup, _state$quickSetup2;
  return {
    isCreated: (_state$quickSetup = state.quickSetup) === null || _state$quickSetup === void 0 ? void 0 : _state$quickSetup.isCreated,
    createdLink: (_state$quickSetup2 = state.quickSetup) === null || _state$quickSetup2 === void 0 ? void 0 : _state$quickSetup2.createdLink
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_quick_setup: (0,redux__WEBPACK_IMPORTED_MODULE_8__.bindActionCreators)(_redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_6__.update_quick_setup, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_5__.connect)(mapStateToProps, mapDispatchToProps)(Finish));

/***/ }),

/***/ "./dev_betterlinks/containers/QuickSetup/GettingStarted.js":
/*!*****************************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/GettingStarted.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../.. */ "./dev_betterlinks/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");








var GettingStarted = function GettingStarted() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(___WEBPACK_IMPORTED_MODULE_5__.SetupContext),
    setActiveStep = _useContext.setActiveStep,
    setClientConsent = _useContext.setClientConsent;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  var showHideUserNotice = function showHideUserNotice(e) {
    e.preventDefault();
    setShow(!show);
  };
  var handleClientConsent = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(opt_in) {
      var _res$data;
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,_utils_helper__WEBPACK_IMPORTED_MODULE_6__.makeRequest)({
              action: 'betterlinks__client_consent',
              opt_in_value: opt_in
            });
          case 2:
            res = _context.sent;
            setClientConsent((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.success);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleClientConsent(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "getting-started"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Getting Started', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)("Easily get started with the easy setup wizard and complete setting up to streamline website's link management strategy.", 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("iframe", {
    width: 450,
    height: 258,
    src: "https://www.youtube-nocookie.com/embed/ZJqBrFhQC1A",
    title: "YouTube video player",
    frameBorder: 0,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    referrerPolicy: "strict-origin-when-cross-origin",
    allowFullScreen: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('By clicking this button I am allowing this app to collect my information.', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "what-we-collect",
    onClick: showHideUserNotice
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('What We Collect?', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "consent-info ".concat(show ? 'show' : 'hide')
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('We collect non-sensitive diagnostic data and plugin usage information. Your site URL, WordPress & PHP version, plugins & themes and email address to send you the discount coupon. This data lets us make sure this plugin always stays compatible with the most popular plugins and themes. No spam, I promise.', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    className: "button button-primary",
    onClick: function onClick() {
      handleClientConsent('yes');
      setActiveStep(1);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Proceed to Next Step', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("a", {
    href: "#",
    onClick: function onClick(e) {
      e.preventDefault();
      handleClientConsent('no'); //
      setActiveStep(1);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Skip This Step', 'betterlinks')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GettingStarted);

/***/ }),

/***/ "./dev_betterlinks/containers/QuickSetup/Migration.js":
/*!************************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/Migration.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../.. */ "./dev_betterlinks/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "./node_modules/@material-ui/core/esm/Checkbox/Checkbox.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons */ "./dev_betterlinks/containers/QuickSetup/icons.js");
/* harmony import */ var _ConfirmationModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConfirmationModal */ "./dev_betterlinks/containers/QuickSetup/ConfirmationModal.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }







var Migration = function Migration() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(___WEBPACK_IMPORTED_MODULE_3__.SetupContext),
    migrationSettings = _useContext.migrationSettings,
    setMigrationSettings = _useContext.setMigrationSettings,
    migrationStatus = _useContext.migrationStatus;
  var simple301redirects = migrationSettings.simple301redirects,
    thirstyaffiliates = migrationSettings.thirstyaffiliates,
    prettylinks = migrationSettings.prettylinks;
  var handleShowHide = function handleShowHide(type) {
    setMigrationSettings(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, type, !prev[type]));
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "migration"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_ConfirmationModal__WEBPACK_IMPORTED_MODULE_6__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Migration', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Already using another link management tool? Let’s import existing links and data to BetterLinks without facing any hassle.', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "option"
  }, _utils_helper__WEBPACK_IMPORTED_MODULE_4__.migratable_plugins.simple301redirects && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Plugin, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Simple 301 Redirects', 'betterlinks'),
    show: simple301redirects,
    onClick: function onClick() {
      return handleShowHide('simple301redirects');
    },
    status: migrationStatus.simple301redirects
  }), _utils_helper__WEBPACK_IMPORTED_MODULE_4__.migratable_plugins.thirstyaffiliates && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Plugin, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('ThirstyAffiliates', 'betterlinks'),
    show: thirstyaffiliates,
    onClick: function onClick() {
      return handleShowHide('thirstyaffiliates');
    },
    status: migrationStatus.thirstyaffiliates
  }), _utils_helper__WEBPACK_IMPORTED_MODULE_4__.migratable_plugins.prettylinks && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Plugin, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pretty Links', 'betterlinks'),
    show: prettylinks,
    onClick: function onClick() {
      return handleShowHide('prettylinks');
    },
    status: migrationStatus.prettylinks
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Migration);
var Plugin = function Plugin(_ref) {
  var title = _ref.title,
    _ref$show = _ref.show,
    show = _ref$show === void 0 ? false : _ref$show,
    onClick = _ref.onClick,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? '' : _ref$status;
  var buttonText = {
    complete: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Complete', 'betterlinks'),
    'in-progress': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('In Progress', 'betterlinks'),
    failed: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed', 'betterlinks')
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "plugin-single",
    style: {
      cursor: 'pointer',
      borderColor: show ? '#3f51b5' : 'transparent'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "left-side"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_7__["default"], {
    color: "primary",
    checked: show,
    onClick: onClick
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, title), '' !== status && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "badge ".concat(status)
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_icons__WEBPACK_IMPORTED_MODULE_5__.MigrationStatusIcon, {
    status: status
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, buttonText[status]))), 'failed' === status && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "right-side failed"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button button-failed"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_icons__WEBPACK_IMPORTED_MODULE_5__.MigrationStatusIcon, {
    status: "in-progress"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Retry', 'betterlinks')))));
};

/***/ }),

/***/ "./dev_betterlinks/containers/QuickSetup/SetupCanvas.js":
/*!**************************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/SetupCanvas.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/Stepper */ "./node_modules/@material-ui/core/esm/Stepper/Stepper.js");
/* harmony import */ var _material_ui_core_Step__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/Step */ "./node_modules/@material-ui/core/esm/Step/Step.js");
/* harmony import */ var _material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/StepLabel */ "./node_modules/@material-ui/core/esm/StepLabel/StepLabel.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _GettingStarted__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GettingStarted */ "./dev_betterlinks/containers/QuickSetup/GettingStarted.js");
/* harmony import */ var _Configuration__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Configuration */ "./dev_betterlinks/containers/QuickSetup/Configuration.js");
/* harmony import */ var _Migration__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Migration */ "./dev_betterlinks/containers/QuickSetup/Migration.js");
/* harmony import */ var _CreateLinks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CreateLinks */ "./dev_betterlinks/containers/QuickSetup/CreateLinks.js");
/* harmony import */ var _Finish__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Finish */ "./dev_betterlinks/containers/QuickSetup/Finish.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../.. */ "./dev_betterlinks/index.js");
/* harmony import */ var _quicksetup_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./quicksetup.helper */ "./dev_betterlinks/containers/QuickSetup/quicksetup.helper.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../redux/actions/quick-setup.actions */ "./dev_betterlinks/redux/actions/quick-setup.actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");





function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


















function getSteps() {
  var isMigrationExists = Object.values(_utils_helper__WEBPACK_IMPORTED_MODULE_13__.migratable_plugins).some(function (plugin) {
    return plugin;
  });
  if (!isMigrationExists) {
    return [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Getting Started', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Configuration', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Create Link', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Finish', 'betterlinks')];
  }
  return [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Getting Started', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Configuration', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Migration', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Create Link', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Finish', 'betterlinks')];
}
var getSetupStepComponents = function getSetupStepComponents(component) {
  var isMigrationExists = Object.values(_utils_helper__WEBPACK_IMPORTED_MODULE_13__.migratable_plugins).some(function (plugin) {
    return plugin;
  });
  if (!isMigrationExists) {
    var _components = {
      0: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_GettingStarted__WEBPACK_IMPORTED_MODULE_6__["default"], null),
      1: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_Configuration__WEBPACK_IMPORTED_MODULE_7__["default"], null),
      2: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_CreateLinks__WEBPACK_IMPORTED_MODULE_9__["default"], null),
      3: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_Finish__WEBPACK_IMPORTED_MODULE_10__["default"], null)
    };
    return _components[component];
  }
  var components = {
    0: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_GettingStarted__WEBPACK_IMPORTED_MODULE_6__["default"], null),
    1: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_Configuration__WEBPACK_IMPORTED_MODULE_7__["default"], null),
    2: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_Migration__WEBPACK_IMPORTED_MODULE_8__["default"], null),
    3: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_CreateLinks__WEBPACK_IMPORTED_MODULE_9__["default"], null),
    4: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_Finish__WEBPACK_IMPORTED_MODULE_10__["default"], null)
  };
  return components[component];
};
var SetupCanvas = function SetupCanvas(props) {
  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_17__.useHistory)();
  var steps = getSteps();
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(___WEBPACK_IMPORTED_MODULE_11__.SetupContext),
    activeStep = _useContext.activeStep,
    setActiveStep = _useContext.setActiveStep,
    clientConsent = _useContext.clientConsent,
    update_option = _useContext.update_option,
    settings = _useContext.settings,
    linkOptions = _useContext.linkOptions,
    setLinkOptions = _useContext.setLinkOptions,
    setErrors = _useContext.setErrors,
    terms = _useContext.terms,
    migrationSettings = _useContext.migrationSettings,
    setModalIsOpen = _useContext.setModalIsOpen,
    modalConfirm = _useContext.modalConfirm,
    setModalConfirm = _useContext.setModalConfirm,
    setMigrationStatus = _useContext.setMigrationStatus;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    isNextDisabled = _useState2[0],
    setNextDisabled = _useState2[1];
  var isMigrationExists = Object.values(_utils_helper__WEBPACK_IMPORTED_MODULE_13__.migratable_plugins).some(function (plugin) {
    return plugin;
  });
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    if (props.isCreated) {
      setActiveStep(4);
    }
    if (modalConfirm) {
      (0,_quicksetup_helper__WEBPACK_IMPORTED_MODULE_12__.migratePluginsData)(migrationSettings, setMigrationStatus, props.update_migration_result);
    }
  }, [props.isCreated, activeStep, modalConfirm]);

  // Refactored to handle different steps with a switch-case for clarity
  var handleStepChange = function handleStepChange() {
    switch (activeStep) {
      case 1:
        update_option(settings);
        setLinkOptions(_objectSpread(_objectSpread({}, settings), linkOptions));
        setActiveStep(2);
        break;
      case 2:
        {
          if (isMigrationExists) {
            setModalIsOpen(true);
            setModalConfirm(true);
          } else {
            submitLinkHandler(linkOptions, setErrors);
          }
          break;
        }
      case 3:
        if (isMigrationExists) {
          submitLinkHandler(linkOptions, setErrors);
        } else {
          completeSetup();
        }
        break;
      case 4:
        completeSetup();
        break;
      default:
        break;
    }
  };

  // Extracted submit logic into a separate function for better readability
  var submitLinkHandler = function submitLinkHandler(values, setErrorCallback) {
    var regex = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/;
    if (regex.test(values.link_title)) {
      setErrorCallback(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          link_title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Please ensure the link title does not contain any script.', 'betterlinks')
        });
      });
      return;
    }
    onSubmit(values);
  };
  var onSubmit = function onSubmit(values) {
    var short_url = values.short_url;
    values.short_url = short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
    (0,_utils_helper__WEBPACK_IMPORTED_MODULE_13__.shortURLUniqueCheck)(values === null || values === void 0 ? void 0 : values.short_url, values === null || values === void 0 ? void 0 : values.ID, function () {}).then(function (isDuplicate) {
      if (!isDuplicate) {
        if (!values.cat_id) {
          var _terms$terms;
          var cat = terms === null || terms === void 0 || (_terms$terms = terms.terms) === null || _terms$terms === void 0 ? void 0 : _terms$terms.find(function (item) {
            return (item === null || item === void 0 ? void 0 : item.term_slug) == 'uncategorized';
          });
          values.cat_id = (cat === null || cat === void 0 ? void 0 : cat.ID) || 1;
        }
        if (!values.link_slug) {
          values.link_slug = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_13__.generateSlug)(values.link_title);
        }
        if (isNaN(values === null || values === void 0 ? void 0 : values.cat_id)) {
          values.cat_slug = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_13__.generateSlug)(values.cat_id);
        }
        values.wildcards = Number(values.short_url.includes('*'));
        if (values.cat_id) {
          var link_title = values.link_title.trim();
          if (link_title) {
            values.link_title = link_title;
            props.add_new_link(values).then(function (response) {
              if (response !== null && response !== void 0 && response.data) {
                var _response$data;
                props.update_quick_setup({
                  isCreated: true,
                  createdLink: ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) || null
                });
                setActiveStep(isMigrationExists ? 4 : 3);
              }
            })["catch"](function (error) {
              return console.log('---error (submitHandler)--', {
                error: error
              });
            });
          }
        }
      }
      props.update_quick_setup({
        duplicateLink: isDuplicate
      });
    });
  };
  var completeSetup = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee() {
      var _res$data;
      var res, data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,_utils_helper__WEBPACK_IMPORTED_MODULE_13__.makeRequest)({
              action: 'betterlinks__complete_setup'
            });
          case 2:
            res = _context.sent;
            data = (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.data;
            if ((data === null || data === void 0 ? void 0 : data.result) === 'complete') {
              history.push(_utils_helper__WEBPACK_IMPORTED_MODULE_13__.route_path + 'admin.php?page=betterlinks');
              history.go(0);
            }
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function completeSetup() {
      return _ref.apply(this, arguments);
    };
  }();
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    if (isMigrationExists && 2 == activeStep) {
      var _isNextDisabled = !Object.keys(_utils_helper__WEBPACK_IMPORTED_MODULE_13__.migratable_plugins).filter(function (item) {
        return _utils_helper__WEBPACK_IMPORTED_MODULE_13__.migratable_plugins[item];
      }).some(function (item) {
        return migrationSettings[item];
      });
      setNextDisabled(_isNextDisabled);
    } else if (isMigrationExists && 3 == activeStep || !isMigrationExists && 2 == activeStep) {
      setNextDisabled('' == linkOptions.link_title || '' == linkOptions.target_url);
    } else {
      setNextDisabled(false);
    }
  }, [activeStep, migrationSettings, linkOptions.link_title, linkOptions.target_url]);
  return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "btl-quick-setup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_material_ui_core_Stepper__WEBPACK_IMPORTED_MODULE_18__["default"], {
    activeStep: activeStep,
    connector: (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
      className: "dashicons dashicons-arrow-right-alt2"
    })
  }, steps.map(function (label, index) {
    var stepProps = {};
    var labelProps = {};
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_material_ui_core_Step__WEBPACK_IMPORTED_MODULE_19__["default"], _objectSpread({
      key: label
    }, stepProps), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(_material_ui_core_StepLabel__WEBPACK_IMPORTED_MODULE_20__["default"], _objectSpread({}, labelProps), label));
  })), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "btl-setup-steps"
  }, getSetupStepComponents(activeStep)), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    className: "btl-setup-slider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", null, [2, 3].includes(activeStep) && (activeStep != 3 || isMigrationExists) && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("a", {
    className: "skip",
    href: "#",
    disabled: activeStep === 0,
    onClick: function onClick(e) {
      e.preventDefault();
      setActiveStep(activeStep + 1);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Skip This Step', 'betterlinks'))), activeStep > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", null, (activeStep !== 1 || !clientConsent) && (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
    className: "button",
    disabled: activeStep === 0,
    onClick: function onClick() {
      return setActiveStep(activeStep - 1);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
    className: "dashicons dashicons-arrow-left-alt2"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Back', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("button", {
    className: "button button-primary",
    onClick: handleStepChange,
    disabled: isNextDisabled
  }, activeStep === steps.length - 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Finish', 'betterlinks') : (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Next', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
    className: "dashicons dashicons-arrow-right-alt2"
  })))) : (0,react__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", null))));
};
var mapStateToProps = function mapStateToProps(state) {
  var _state$quickSetup, _state$quickSetup2, _state$quickSetup3, _state$quickSetup4, _state$quickSetup5;
  return {
    isCreated: (_state$quickSetup = state.quickSetup) === null || _state$quickSetup === void 0 ? void 0 : _state$quickSetup.isCreated,
    duplicateLink: (_state$quickSetup2 = state.quickSetup) === null || _state$quickSetup2 === void 0 ? void 0 : _state$quickSetup2.duplicateLink,
    ta: (_state$quickSetup3 = state.quickSetup) === null || _state$quickSetup3 === void 0 ? void 0 : _state$quickSetup3.ta,
    pl: (_state$quickSetup4 = state.quickSetup) === null || _state$quickSetup4 === void 0 ? void 0 : _state$quickSetup4.pl,
    s3r: (_state$quickSetup5 = state.quickSetup) === null || _state$quickSetup5 === void 0 ? void 0 : _state$quickSetup5.s3r
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_quick_setup: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_15__.update_quick_setup, dispatch),
    update_migration_result: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_quick_setup_actions__WEBPACK_IMPORTED_MODULE_15__.update_migration_result, dispatch),
    add_new_link: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_16__.add_new_link, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_14__.connect)(mapStateToProps, mapDispatchToProps)(SetupCanvas));
// export default SetupCanvas;

/***/ }),

/***/ "./dev_betterlinks/containers/QuickSetup/icons.js":
/*!********************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/icons.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MigrationStatusIcon: () => (/* binding */ MigrationStatusIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var InProgress = function InProgress() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "MuiSvgIcon-root jss360",
    focusable: "false",
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
  }));
};
var Failed = function Failed() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "MuiSvgIcon-root jss360 MuiSvgIcon-fontSizeSmall",
    focusable: "false",
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
  }));
};
var Complete = function Complete() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "MuiSvgIcon-root",
    focusable: "false",
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
  }));
};
var MigrationStatusIcon = function MigrationStatusIcon(_ref) {
  var status = _ref.status;
  var statuses = {
    'in-progress': (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(InProgress, null),
    failed: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Failed, null),
    complete: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Complete, null)
  };
  return statuses[status];
};

/***/ }),

/***/ "./dev_betterlinks/containers/QuickSetup/quicksetup.helper.js":
/*!********************************************************************!*\
  !*** ./dev_betterlinks/containers/QuickSetup/quicksetup.helper.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIGURATION: () => (/* binding */ CONFIGURATION),
/* harmony export */   CREATE_LINK: () => (/* binding */ CREATE_LINK),
/* harmony export */   FINISH: () => (/* binding */ FINISH),
/* harmony export */   GETTING_STARTED: () => (/* binding */ GETTING_STARTED),
/* harmony export */   MIGRATION: () => (/* binding */ MIGRATION),
/* harmony export */   getStepCount: () => (/* binding */ getStepCount),
/* harmony export */   migratePluginsData: () => (/* binding */ migratePluginsData)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var GETTING_STARTED = 'getting_started';
var CONFIGURATION = 'configuration';
var MIGRATION = 'migration';
var CREATE_LINK = 'create_link';
var FINISH = 'finish';
var getStepCount = function getStepCount(active) {
  var indexes = (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, GETTING_STARTED, 0), CONFIGURATION, 1), CREATE_LINK, 2), MIGRATION, 3), FINISH, 4);
  return indexes[active];
};
var migratePluginsData = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(plugins, setMigrationStatus, update_migration_result) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // function
          Object.entries(plugins).forEach(function (plugin) {
            var _plugin = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(plugin, 2),
              key = _plugin[0],
              value = _plugin[1];
            if (value) {
              onSubmitHandler(key, setMigrationStatus, update_migration_result);
              if ('prettylinks' === key) {
                onSubmitHandler(key, setMigrationStatus, update_migration_result, 'clicks');
              }
            }
          });
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function migratePluginsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var pluginMigrationMode = {
  prettylinks: 'pl',
  simple301redirects: 's3r',
  thirstyaffiliates: 'ta'
};
var onSubmitHandler = function onSubmitHandler(mode, setMigrationStatus, update_migration_result) {
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'links';
  var form_data = new FormData();
  if (mode === 'prettylinks') {
    form_data.append('action', 'betterlinks/admin/run_prettylinks_migration');
  } else if (mode === 'simple301redirects') {
    form_data.append('action', 'betterlinks/admin/run_simple301redirects_migration');
  } else if (mode === 'thirstyaffiliates') {
    form_data.append('action', 'betterlinks/admin/run_thirstyaffiliates_migration');
  }
  form_data.append('security', _utils_helper__WEBPACK_IMPORTED_MODULE_5__.betterlinks_nonce);
  form_data.append('type', type);
  setMigrationStatus(function (prev) {
    return _objectSpread(_objectSpread({}, prev), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, mode, 'in-progress'));
  });
  // const
  axios__WEBPACK_IMPORTED_MODULE_4___default().post(ajaxurl, form_data).then(function (response) {
    if (response.data) {
      // btl_prettylinks_migration_running_in_background - pretty links
      setMigrationStatus(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, mode, 'complete'));
      });
      update_migration_result((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, pluginMigrationMode[mode], response.data.data));
      return response.data;
    }
    setMigrationStatus(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, mode, 'failed'));
    });
  }, function (error) {
    console.log(error);
  });
};

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

/***/ "./dev_betterlinks/pages/QuickSetup.js":
/*!*********************************************!*\
  !*** ./dev_betterlinks/pages/QuickSetup.js ***!
  \*********************************************/
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
/* harmony import */ var _components_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Teasers/UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _containers_QuickSetup_SetupCanvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../containers/QuickSetup/SetupCanvas */ "./dev_betterlinks/containers/QuickSetup/SetupCanvas.js");
/* harmony import */ var _containers_TopBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../containers/TopBar */ "./dev_betterlinks/containers/TopBar.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./.. */ "./dev_betterlinks/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }












var QuickSetup = function QuickSetup(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(_utils_helper__WEBPACK_IMPORTED_MODULE_12__.betterlinks_quick_setup_step ? 1 : 0),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    activeStep = _useState2[0],
    setActiveStep = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(+_utils_helper__WEBPACK_IMPORTED_MODULE_12__.betterlinks_quick_setup_step),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
    clientConsent = _useState4[0],
    setClientConsent = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(_utils_helper__WEBPACK_IMPORTED_MODULE_12__.betterlinks_settings),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
    settings = _useState6[0],
    setSettings = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(_utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState7, 2),
    migrationSettings = _useState8[0],
    setMigrationSettings = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(getInitialValues(settings)),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState9, 2),
    linkOptions = _useState10[0],
    setLinkOptions = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState11, 2),
    isOpenUpgradeToProModal = _useState12[0],
    setUpgradeToProModal = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
      isCreated: false
    }),
    _useState14 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState13, 2),
    errors = _useState14[0],
    setErrors = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState16 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState15, 2),
    modalIsOpen = _useState16[0],
    setModalIsOpen = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState18 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState17, 2),
    modalConfirm = _useState18[0],
    setModalConfirm = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(_objectSpread(_objectSpread(_objectSpread({}, (_utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins === null || _utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins === void 0 ? void 0 : _utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins.simple301redirects) && {
      simple301redirects: ''
    }), (_utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins === null || _utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins === void 0 ? void 0 : _utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins.thirstyaffiliates) && {
      thirstyaffiliates: ''
    }), (_utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins === null || _utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins === void 0 ? void 0 : _utils_helper__WEBPACK_IMPORTED_MODULE_12__.migratable_plugins.prettylinks) && {
      prettylinks: ''
    })),
    _useState20 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState19, 2),
    migrationStatus = _useState20[0],
    setMigrationStatus = _useState20[1];
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (Object.keys(props.terms).length === 0) {
      props.fetch_terms_data();
    }
    if (!props.links.links) {
      props.fetch_links_data();
    }
  }, []);
  var openUpgradeToProModal = function openUpgradeToProModal() {
    setUpgradeToProModal(true);
  };
  var closeUpgradeToProModal = function closeUpgradeToProModal() {
    setUpgradeToProModal(false);
  };
  var modal = {
    isOpenUpgradeToProModal: isOpenUpgradeToProModal,
    setUpgradeToProModal: setUpgradeToProModal,
    openUpgradeToProModal: openUpgradeToProModal,
    closeUpgradeToProModal: closeUpgradeToProModal
  };

  // all settings
  var value = {
    activeStep: activeStep,
    setActiveStep: setActiveStep,
    settings: settings,
    setSettings: setSettings,
    migrationSettings: migrationSettings,
    setMigrationSettings: setMigrationSettings,
    linkOptions: linkOptions,
    getInitialValues: getInitialValues,
    setLinkOptions: setLinkOptions,
    modal: modal,
    terms: props === null || props === void 0 ? void 0 : props.terms,
    clientConsent: clientConsent,
    setClientConsent: setClientConsent,
    update_option: props === null || props === void 0 ? void 0 : props.update_option,
    add_new_link: props === null || props === void 0 ? void 0 : props.add_new_link,
    errors: errors,
    setErrors: setErrors,
    modalIsOpen: modalIsOpen,
    setModalIsOpen: setModalIsOpen,
    modalConfirm: modalConfirm,
    setModalConfirm: setModalConfirm,
    migrationStatus: migrationStatus,
    setMigrationStatus: setMigrationStatus
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(___WEBPACK_IMPORTED_MODULE_7__.SetupContext.Provider, {
    value: value
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_containers_QuickSetup_SetupCanvas__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    terms: state.terms,
    links: state.links
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetch_terms_data: (0,redux__WEBPACK_IMPORTED_MODULE_13__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_11__.fetch_terms_data, dispatch),
    update_option: (0,redux__WEBPACK_IMPORTED_MODULE_13__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_10__.update_option, dispatch),
    add_new_link: (0,redux__WEBPACK_IMPORTED_MODULE_13__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_9__.add_new_link, dispatch),
    fetch_links_data: (0,redux__WEBPACK_IMPORTED_MODULE_13__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_9__.fetch_links_data, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_8__.connect)(mapStateToProps, mapDispatchToProps)(QuickSetup));
var getInitialValues = function getInitialValues(settings) {
  var currentDate = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.formatDate)(new Date(), 'yyyy-mm-dd h:m:s');
  return _objectSpread({
    link_title: '',
    link_slug: '',
    target_url: '',
    short_url: '',
    link_note: '',
    link_date: currentDate,
    link_date_gmt: currentDate,
    link_modified: currentDate,
    link_modified_gmt: currentDate,
    // redirect_type: settings?.redirect_type || '307',
    cat_id: null
  }, settings);
};

/***/ }),

/***/ "./dev_betterlinks/redux/actions/quick-setup.actions.js":
/*!**************************************************************!*\
  !*** ./dev_betterlinks/redux/actions/quick-setup.actions.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QUICK_SETUP: () => (/* binding */ QUICK_SETUP),
/* harmony export */   update_migration_result: () => (/* binding */ update_migration_result),
/* harmony export */   update_quick_setup: () => (/* binding */ update_quick_setup)
/* harmony export */ });
// Quick Setup Settings
var QUICK_SETUP = 'QUICK_SETUP';
var update_quick_setup = function update_quick_setup(data) {
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_OPTIONS',
      payload: data
    });
  };
};
var update_migration_result = function update_migration_result(data) {
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_RESULTS',
      payload: data
    });
  };
};

/***/ })

}]);
//# sourceMappingURL=QuickSetup.js.map