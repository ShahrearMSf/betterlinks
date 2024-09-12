"use strict";
(globalThis["webpackChunkbetterlinks"] = globalThis["webpackChunkbetterlinks"] || []).push([["manage-links"],{

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

/***/ "./dev_betterlinks/components/CreateCategory.js":
/*!******************************************************!*\
  !*** ./dev_betterlinks/components/CreateCategory.js ***!
  \******************************************************/
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
/* harmony import */ var _Terms_CatForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Terms/CatForm */ "./dev_betterlinks/components/Terms/CatForm.js");





var CreateCategory = function CreateCategory(_ref) {
  var createCatHandler = _ref.createCatHandler;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    isOpenForm = _useState2[0],
    setIsOpenForm = _useState2[1];
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "dnd-create-category"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "dnd-create-category-button",
    onClick: function onClick() {
      return setIsOpenForm(!isOpenForm);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-add"
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: "dnd-create-category-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add New Category', 'betterlinks')), isOpenForm && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Terms_CatForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
    hideHandler: setIsOpenForm,
    submitHandler: createCatHandler
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateCategory);

/***/ }),

/***/ "./dev_betterlinks/components/CustomFields/LinkFields.js":
/*!***************************************************************!*\
  !*** ./dev_betterlinks/components/CustomFields/LinkFields.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");




var LinkFields = function LinkFields(_ref) {
  var _props$values2, _props$values4;
  var props = _ref.props,
    customFields = _ref.customFields;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _props$values;
    if ((customFields === null || customFields === void 0 ? void 0 : customFields.length) > 0 && undefined === ((_props$values = props.values) === null || _props$values === void 0 || (_props$values = _props$values.param_struct) === null || _props$values === void 0 ? void 0 : _props$values.useCustomFields)) {
      props.setFieldValue('param_struct.useCustomFields', true);
    }
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "btl-modal-form-label",
    htmlFor: "useCustomFields"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom Fields', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
    id: "useCustomFields",
    className: "btl-check",
    name: "param_struct.useCustomFields",
    type: "checkbox",
    checked: (_props$values2 = props.values) === null || _props$values2 === void 0 || (_props$values2 = _props$values2.param_struct) === null || _props$values2 === void 0 ? void 0 : _props$values2.useCustomFields,
    onChange: function onChange() {
      var _props$values3;
      return props.setFieldValue('param_struct.useCustomFields', !((_props$values3 = props.values) !== null && _props$values3 !== void 0 && (_props$values3 = _props$values3.param_struct) !== null && _props$values3 !== void 0 && _props$values3.useCustomFields));
    },
    disabled: false
  })), ((_props$values4 = props.values) === null || _props$values4 === void 0 || (_props$values4 = _props$values4.param_struct) === null || _props$values4 === void 0 ? void 0 : _props$values4.useCustomFields) && customFields.map(function (field, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "btl-modal-form-label",
      htmlFor: field.value
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(field.label, 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {
      className: "btl-modal-form-control",
      id: field.value,
      name: "param_struct[".concat(field.value, "]"),
      onChange: function onChange(e) {
        props.setFieldValue("param_struct[".concat(field.value, "]"), e.target.value);
      }
    }));
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkFields);

/***/ }),

/***/ "./dev_betterlinks/components/CustomTrackingScripts/Teaser.js":
/*!********************************************************************!*\
  !*** ./dev_betterlinks/components/CustomTrackingScripts/Teaser.js ***!
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


var CustomTrackingScriptTeaser = function CustomTrackingScriptTeaser(_ref) {
  var openUpgradeToProModal = _ref.openUpgradeToProModal;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "link-options__head",
    type: "button",
    onClick: openUpgradeToProModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "link-options__head--title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom Tracking Scripts', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pro-badge"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro', 'betterlinks'))), ' ');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomTrackingScriptTeaser);

/***/ }),

/***/ "./dev_betterlinks/components/CustomTrackingScripts/index.js":
/*!*******************************************************************!*\
  !*** ./dev_betterlinks/components/CustomTrackingScripts/index.js ***!
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
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _Teaser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Teaser */ "./dev_betterlinks/components/CustomTrackingScripts/Teaser.js");




var CustomTrackingScripts = function CustomTrackingScripts(_ref) {
  var _props$tracking;
  var openAccordion = _ref.openAccordion,
    openUpgradeToProModal = _ref.openUpgradeToProModal,
    __handleToggle = _ref.__handleToggle,
    props = _ref.props;
  if (_utils_helper__WEBPACK_IMPORTED_MODULE_2__.is_pro_enabled && !(props !== null && props !== void 0 && (_props$tracking = props.tracking) !== null && _props$tracking !== void 0 && _props$tracking.is_enable_custom_scripts)) return;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "link-options link-options--advanced link-options--customize-link-preview ".concat(openAccordion ? 'link-options--open' : '')
  }, !_utils_helper__WEBPACK_IMPORTED_MODULE_2__.is_pro_enabled ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Teaser__WEBPACK_IMPORTED_MODULE_3__["default"], {
    openUpgradeToProModal: openUpgradeToProModal
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "link-options__head",
    type: "button",
    onClick: function onClick() {
      return __handleToggle('customTrackingScripts');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "link-options__head--title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom Tracking Scripts', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "btl btl-angle-arrow-down"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "link-options__body"
  }, betterLinksHooks.applyFilters('linkOptionsCustomTrackingScripts', null, props)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomTrackingScripts);

/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/CustomizeLinkPreviewTeaser.js":
/*!***************************************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/CustomizeLinkPreviewTeaser.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Note */ "./dev_betterlinks/components/CustomizeLinkPreview/Note.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _CustomizePreviewContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CustomizePreviewContainer */ "./dev_betterlinks/components/CustomizeLinkPreview/CustomizePreviewContainer.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data */ "./dev_betterlinks/components/CustomizeLinkPreview/data.js");






var CustomizeLinkPreviewTeaser = function CustomizeLinkPreviewTeaser(_ref) {
  var openUpgradeToProModal = _ref.openUpgradeToProModal;
  if (_utils_helper__WEBPACK_IMPORTED_MODULE_3__.is_pro_enabled) return null;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-customize-link-preview-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-customize-link-preview"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "btl-modal-customize-link-preview__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Customize Link Preview', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pro-badge",
    onClick: openUpgradeToProModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-customize-link-preview__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-customize-link-preview__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "meta_title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Title', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    defaultValue: _data__WEBPACK_IMPORTED_MODULE_5__.teaserTitle,
    rows: 3,
    style: {
      height: '55px',
      cursor: 'not-allowed'
    },
    disabled: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Note__WEBPACK_IMPORTED_MODULE_2__["default"], {
    note: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Recommended meta title length is 50-60 characters. Maximum length is 160 characters.', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-modal-customize-link-preview--text-counter"
  }, "42/60")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-customize-link-preview__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "meta_description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Description', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    id: "meta_description",
    name: "meta_description",
    rows: 3,
    disabled: true,
    style: {
      cursor: 'not-allowed'
    }
  }, _data__WEBPACK_IMPORTED_MODULE_5__.teaserDescription), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Note__WEBPACK_IMPORTED_MODULE_2__["default"], {
    note: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Recommended meta description length is 150-160 characters.', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-modal-customize-link-preview--text-counter"
  }, "146/160")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-customize-link-preview__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "meta_description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Meta Image', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "btl-modal-customize-link-preview__btn dashicons dashicons-upload",
    type: "button",
    style: {
      cursor: 'not-allowed'
    },
    onClick: function onClick(e) {
      e.preventDefault();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Image', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Note__WEBPACK_IMPORTED_MODULE_2__["default"], {
    note: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload at least 600x315px image. Recommended size is 1200x630px.', 'betterlinks')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-customize-link-preview__form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "btl-modal-customize-link-preview__save_btn--teaser",
    type: "button",
    onClick: openUpgradeToProModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_CustomizePreviewContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomizeLinkPreviewTeaser);

/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/CustomizePreviewContainer.js":
/*!**************************************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/CustomizePreviewContainer.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
/* harmony import */ var _SocialPreview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SocialPreview */ "./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");





var socialMedia = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Facebook', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('X (Formerly Twitter)', 'betterlinks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('LinkedIn', 'betterlinks')];
var CustomizePreviewContainr = function CustomizePreviewContainr() {
  var site_url = betterLinksHooks.applyFilters('site_url', _utils_helper__WEBPACK_IMPORTED_MODULE_4__.site_url);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-customize-link-preview-box"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    "class": "btl-modal-customize-link-preview__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Social Link Preview', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_2__.Tabs, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_2__.TabList, null, socialMedia.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_2__.Tab, {
      key: index
    }, item);
  })), [(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SocialPreview__WEBPACK_IMPORTED_MODULE_3__.Facebook, {
    site_url: site_url
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SocialPreview__WEBPACK_IMPORTED_MODULE_3__.Twitter, {
    site_url: site_url
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SocialPreview__WEBPACK_IMPORTED_MODULE_3__.Linkedin, {
    site_url: site_url
  })].map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
      key: index
    }, item);
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomizePreviewContainr);

/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/Note.js":
/*!*****************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/Note.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


var Note = function Note(_ref) {
  var note = _ref.note,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Note', 'betterlinks') : _ref$title;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-modal-customize-link-preview--note"
  }, title, ": ", note);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Note);

/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Facebook.js":
/*!***********************************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Facebook.js ***!
  \***********************************************************************************/
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
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data */ "./dev_betterlinks/components/CustomizeLinkPreview/data.js");




var Facebook = function Facebook(_ref) {
  var site_url = _ref.site_url;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-facebook"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-image-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/teasers/customize-link-preview-image.png',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-content-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-link-preview-site-url"
  }, site_url), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-link-preview-title"
  }, _data__WEBPACK_IMPORTED_MODULE_3__.teaserTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-link-preview-description"
  }, _data__WEBPACK_IMPORTED_MODULE_3__.teaserDescription)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Facebook);

/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Linkedin.js":
/*!***********************************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Linkedin.js ***!
  \***********************************************************************************/
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
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data */ "./dev_betterlinks/components/CustomizeLinkPreview/data.js");




var Linkedin = function Linkedin(_ref) {
  var site_url = _ref.site_url;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-facebook"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-image-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/teasers/customize-link-preview-image.png',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-content-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-link-preview-site-url"
  }, site_url), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-link-preview-title"
  }, _data__WEBPACK_IMPORTED_MODULE_3__.teaserTitle)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Linkedin);

/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Twitter.js":
/*!**********************************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Twitter.js ***!
  \**********************************************************************************/
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
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data */ "./dev_betterlinks/components/CustomizeLinkPreview/data.js");




var Twitter = function Twitter(_ref) {
  var site_url = _ref.site_url;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-facebook btl-customized-link-preview-twitter"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-image-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_2__.plugin_root_url + 'assets/images/teasers/customize-link-preview-image.png',
    alt: ""
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-customized-link-preview-content-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-link-preview-title"
  }, _data__WEBPACK_IMPORTED_MODULE_3__.teaserTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-link-preview-description"
  }, _data__WEBPACK_IMPORTED_MODULE_3__.teaserDescription), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-link-preview-site-url"
  }, site_url)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Twitter);

/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/index.js":
/*!********************************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Facebook: () => (/* reexport safe */ _Facebook__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Linkedin: () => (/* reexport safe */ _Linkedin__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Twitter: () => (/* reexport safe */ _Twitter__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _Facebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Facebook */ "./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Facebook.js");
/* harmony import */ var _Twitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Twitter */ "./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Twitter.js");
/* harmony import */ var _Linkedin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Linkedin */ "./dev_betterlinks/components/CustomizeLinkPreview/SocialPreview/Linkedin.js");




/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/data.js":
/*!*****************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/data.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   teaserDescription: () => (/* binding */ teaserDescription),
/* harmony export */   teaserTitle: () => (/* binding */ teaserTitle)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

var teaserTitle = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your Prefered Meta Title Here | Site Title', 'betterlinks');
var teaserDescription = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Your preferred meta description here. A concise summary to attract and inform visitors about your content, staying within the 160-character limit.', 'betterlinks');

/***/ }),

/***/ "./dev_betterlinks/components/CustomizeLinkPreview/index.js":
/*!******************************************************************!*\
  !*** ./dev_betterlinks/components/CustomizeLinkPreview/index.js ***!
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _CustomizeLinkPreviewTeaser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CustomizeLinkPreviewTeaser */ "./dev_betterlinks/components/CustomizeLinkPreview/CustomizeLinkPreviewTeaser.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Teasers/UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Note */ "./dev_betterlinks/components/CustomizeLinkPreview/Note.js");
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }










var CustomizeLinkPreview = function CustomizeLinkPreview(_ref) {
  var _form$values;
  var openAccordion = _ref.openAccordion,
    form = _ref.form,
    settings = _ref.settings,
    metaTag = _ref.metaTag,
    __handleToggle = _ref.__handleToggle;
  var enable_customize_meta_tags = settings.settings.enable_customize_meta_tags;
  if (_utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled && !enable_customize_meta_tags) return null;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    openModal = _useState2[0],
    setOpenModal = _useState2[1];
  var _useUpgradeProModal = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_7__.useUpgradeProModal)(),
    _useUpgradeProModal2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUpgradeProModal, 3),
    isOpenUpgradeToProModal = _useUpgradeProModal2[0],
    openUpgradeToProModal = _useUpgradeProModal2[1],
    closeUpgradeToProModal = _useUpgradeProModal2[2];
  var closeModal = function closeModal() {
    return setOpenModal(false);
  };
  var ReactTabs = {
    Tab: react_tabs__WEBPACK_IMPORTED_MODULE_10__.Tab,
    Tabs: react_tabs__WEBPACK_IMPORTED_MODULE_10__.Tabs,
    TabList: react_tabs__WEBPACK_IMPORTED_MODULE_10__.TabList,
    TabPanel: react_tabs__WEBPACK_IMPORTED_MODULE_10__.TabPanel
  };
  var customStyles = _objectSpread(_objectSpread({}, _utils_helper__WEBPACK_IMPORTED_MODULE_4__.modalCustomStyles), {}, {
    content: _objectSpread(_objectSpread({}, _utils_helper__WEBPACK_IMPORTED_MODULE_4__.modalCustomStyles.content), {}, {
      maxWidth: '1000px'
    }, !_utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled && {
      height: '400px'
    })
  });
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (_utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled) {
      form.setFieldValue('enable_meta_tags', !!+(metaTag === null || metaTag === void 0 ? void 0 : metaTag.status));
      form.setFieldValue('meta_title', (metaTag === null || metaTag === void 0 ? void 0 : metaTag.meta_title) || '');
      form.setFieldValue('meta_description', (metaTag === null || metaTag === void 0 ? void 0 : metaTag.meta_desc) || '');
      form.setFieldValue('meta_image', (metaTag === null || metaTag === void 0 ? void 0 : metaTag.meta_image) || '');
    }
  }, []);
  var isProUpdated = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.pro_version_check)('1.8.0');
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "link-options link-options--advanced link-options--customize-link-preview ".concat(openAccordion ? 'link-options--open' : '')
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    className: "link-options__head",
    type: "button",
    onClick: function onClick() {
      !_utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled && setOpenModal(true);
      __handleToggle('optimizeMetaTags');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("h4", {
    className: "link-options__head--title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Customize Link Preview', 'betterlinks'), " ", !_utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "pro-badge"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Pro', 'betterlinks'))), ' ', _utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-angle-arrow-down"
  })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, _utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "link-options--teasers"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-modal-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "btl-checkbox-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    id: "enable_meta_tags",
    name: "enable_meta_tags",
    className: "btl-check",
    type: "checkbox",
    checked: !!((_form$values = form.values) !== null && _form$values !== void 0 && _form$values.enable_meta_tags),
    onClick: function onClick(e) {
      var checked = e.target.checked;
      if (checked) setOpenModal(checked);
      form.setFieldValue('enable_meta_tags', checked);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "text"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Link Preview', 'betterlinks')), form.values.enable_meta_tags && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-tooltip"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl btl-edit",
    onClick: function onClick(e) {
      e.preventDefault();
      setOpenModal(true);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edit Link Preview', 'betterlinks')))))))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_6___default()), {
    isOpen: openModal,
    onRequestClose: closeModal,
    style: customStyles,
    ariaHideApp: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl-close-modal",
    onClick: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-cancel"
  })), !isProUpdated && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "short-description"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("b", {
    style: {
      fontWeight: 700
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Note: ')), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('To Utilize the Customize Link Preview Feature, kindly ensure that you have updated to the latest version of BetterLinks Pro v-1.8.0', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_8__["default"], {
    isOpenModal: isOpenUpgradeToProModal,
    closeModal: closeUpgradeToProModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_CustomizeLinkPreviewTeaser__WEBPACK_IMPORTED_MODULE_5__["default"], {
    openUpgradeToProModal: openUpgradeToProModal
  }), betterLinksHooks.applyFilters('linkOptionsOptimizeMetaTags', null, _objectSpread(_objectSpread(_objectSpread({}, form), settings), {}, {
    metaTag: metaTag,
    Note: _Note__WEBPACK_IMPORTED_MODULE_9__["default"],
    closeModal: closeModal,
    ReactTabs: ReactTabs
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomizeLinkPreview);

/***/ }),

/***/ "./dev_betterlinks/components/FavoriteIcon/index.js":
/*!**********************************************************!*\
  !*** ./dev_betterlinks/components/FavoriteIcon/index.js ***!
  \**********************************************************/
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
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");







function FavoriteIcon(_ref) {
  var _data$favorite;
  var handle_link_favorite = _ref.handle_link_favorite,
    data = _ref.data;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(((_data$favorite = data.favorite) === null || _data$favorite === void 0 ? void 0 : _data$favorite.favForAll) || false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    isFavorite = _useState2[0],
    setIsFavorite = _useState2[1];
  return betterLinksHooks.applyFilters('betterLinksIsShowFavorite', true) ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "btl-tooltip dnd-link-button btl-fav-link no-btn c-pointer ".concat(isFavorite ? 'favorated' : 'unfavorated'),
    onClick: function onClick() {
      var newFavorite = !isFavorite;
      setIsFavorite(newFavorite);
      handle_link_favorite({
        ID: data.ID,
        favForAll: newFavorite
      });
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("".concat(isFavorite ? 'Unmark' : 'Mark', " as Favorite"), 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "favorite-svg",
    viewBox: "0 0 512 512",
    xmlSpace: "preserve"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    className: "fav-icon-svg-path",
    d: "M392.2 317.5c-3 2.9-4.4 7.1-3.7 11.3L414 477.4c1.2 7-3.5 13.6-10.5 14.9-2.8.5-5.6 0-8.1-1.3L262 420.9c-3.7-2-8.2-2-12 0L116.6 491c-3.1 1.7-6.8 1.9-10.1.8-6-2.1-9.5-8.1-8.5-14.4l25.4-148.5c.7-4.2-.7-8.4-3.7-11.4L11.9 212.4c-5.1-5-5.2-13.1-.2-18.2 2-2 4.6-3.3 7.3-3.7l149.1-21.7c4.2-.6 7.8-3.2 9.7-7l66.7-135c2.6-5.3 8.4-8.1 14.2-6.9 3.9.7 7.2 3.3 8.9 6.9l66.7 135c1.9 3.8 5.5 6.4 9.7 7l149 21.6c7 1 11.9 7.6 10.9 14.6-.4 2.7-1.7 5.3-3.7 7.2l-108 105.3z"
  }))) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "btl-tooltip dnd-link-button btl-fav-link no-edit no-btn ".concat(isFavorite ? 'favorated' : 'unfavorated'),
    onClick: function onClick() {
      return false;
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "favorite-svg",
    viewBox: "0 0 512 512",
    xmlSpace: "preserve"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    className: "fav-icon-svg-path",
    d: "M392.2 317.5c-3 2.9-4.4 7.1-3.7 11.3L414 477.4c1.2 7-3.5 13.6-10.5 14.9-2.8.5-5.6 0-8.1-1.3L262 420.9c-3.7-2-8.2-2-12 0L116.6 491c-3.1 1.7-6.8 1.9-10.1.8-6-2.1-9.5-8.1-8.5-14.4l25.4-148.5c.7-4.2-.7-8.4-3.7-11.4L11.9 212.4c-5.1-5-5.2-13.1-.2-18.2 2-2 4.6-3.3 7.3-3.7l149.1-21.7c4.2-.6 7.8-3.2 9.7-7l66.7-135c2.6-5.3 8.4-8.1 14.2-6.9 3.9.7 7.2 3.3 8.9 6.9l66.7 135c1.9 3.8 5.5 6.4 9.7 7l149 21.6c7 1 11.9 7.6 10.9 14.6-.4 2.7-1.7 5.3-3.7 7.2l-108 105.3z"
  })));
}
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handle_link_favorite: (0,redux__WEBPACK_IMPORTED_MODULE_5__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_4__.handle_link_favorite, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(null, mapDispatchToProps)(FavoriteIcon));

/***/ }),

/***/ "./dev_betterlinks/components/Link/FetchedTitleConfirmation.js":
/*!*********************************************************************!*\
  !*** ./dev_betterlinks/components/Link/FetchedTitleConfirmation.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


var FetchedTitleConfirmation = function FetchedTitleConfirmation(_ref) {
  var fetchedTitle = _ref.fetchedTitle,
    handleYes = _ref.handleYes,
    handleNo = _ref.handleNo;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-form-label-found"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-modal-fetced-title"
  }, fetchedTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title found from target url, ', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Overwrite Title?', 'betterlinks')), "\xA0"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-modal-title-overwrite btl-modal-title-overwrite-yes",
    onClick: handleYes
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yes', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-modal-title-overwrite btl-modal-title-overwrite-no",
    onClick: handleNo
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No', 'betterlinks'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FetchedTitleConfirmation);

/***/ }),

/***/ "./dev_betterlinks/components/LinkCopyUrl/index.js":
/*!*********************************************************!*\
  !*** ./dev_betterlinks/components/LinkCopyUrl/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _LinkCopyButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LinkCopyButton */ "./dev_betterlinks/components/LinkCopyUrl/LinkCopyButton.js");




var LinkCopyUrl = function LinkCopyUrl(props) {
  var site_url = betterLinksHooks.applyFilters('site_url', _utils_helper__WEBPACK_IMPORTED_MODULE_2__.site_url);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(React.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-short-url-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-short-url"
  }, site_url + '/' + props.shortUrl), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_LinkCopyButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
    shortUrl: props.shortUrl
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkCopyUrl);

/***/ }),

/***/ "./dev_betterlinks/components/LinkQuickAction/index.js":
/*!*************************************************************!*\
  !*** ./dev_betterlinks/components/LinkQuickAction/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _containers_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../containers/Link */ "./dev_betterlinks/containers/Link.js");
/* harmony import */ var _QRScanner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../QRScanner */ "./dev_betterlinks/components/QRScanner/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var react_router_dom_cjs_react_router_dom_min__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom/cjs/react-router-dom.min */ "./node_modules/react-router-dom/cjs/react-router-dom.min.js");









var propTypes = {
  isShowAnalytics: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  isShowVisitLink: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  isShowCopyLink: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  isShowEditLink: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  isShowDeleteLink: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  catId: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().number),
  catName: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
  submitLinkHandler: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
  deleteLinkHandler: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
  data: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object),
  handle_link_favorite: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func)
};
var LinkQuickAction = function LinkQuickAction(_ref) {
  var isAlowQr = _ref.isAlowQr,
    _ref$isShowCopyLink = _ref.isShowCopyLink,
    isShowCopyLink = _ref$isShowCopyLink === void 0 ? true : _ref$isShowCopyLink,
    _ref$isShowAnalytics = _ref.isShowAnalytics,
    isShowAnalytics = _ref$isShowAnalytics === void 0 ? false : _ref$isShowAnalytics,
    _ref$isShowVisitLink = _ref.isShowVisitLink,
    isShowVisitLink = _ref$isShowVisitLink === void 0 ? true : _ref$isShowVisitLink,
    _ref$isShowEditLink = _ref.isShowEditLink,
    isShowEditLink = _ref$isShowEditLink === void 0 ? true : _ref$isShowEditLink,
    _ref$isShowDeleteLink = _ref.isShowDeleteLink,
    isShowDeleteLink = _ref$isShowDeleteLink === void 0 ? true : _ref$isShowDeleteLink,
    data = _ref.data,
    catId = _ref.catId,
    catName = _ref.catName,
    submitLinkHandler = _ref.submitLinkHandler,
    deleteLinkHandler = _ref.deleteLinkHandler;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    isCopyUrl = _useState2[0],
    setCopyUrl = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    isDeleteConfirm = _useState4[0],
    setDeleteConfrim = _useState4[1];
  var deleteHandler = function deleteHandler() {
    setDeleteConfrim(!isDeleteConfirm);
  };
  var confirmDelete = function confirmDelete() {
    setDeleteConfrim(false);
    deleteLinkHandler({
      ID: data.ID,
      short_url: data.short_url,
      term_id: catId
    });
  };
  var noDelete = function noDelete() {
    setDeleteConfrim(false);
  };
  var copyShortUrlHandler = function copyShortUrlHandler(url) {
    (0,_utils_helper__WEBPACK_IMPORTED_MODULE_5__.copyShortUrl)(url);
    setCopyUrl(true);
    window.setTimeout(function () {
      setCopyUrl(false);
    }, 3000);
  };
  var site_url = betterLinksHooks.applyFilters('site_url', _utils_helper__WEBPACK_IMPORTED_MODULE_5__.site_url);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, betterLinksHooks.applyFilters('linkQuickActionNewField', '', {
    data: data,
    ReactLink: react_router_dom_cjs_react_router_dom_min__WEBPACK_IMPORTED_MODULE_7__.Link
  }), isShowAnalytics && data.analytic && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "dnd-link-button btl-tooltip"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clicks: ', 'betterlinks') + +data.analytic.link_count + ' / ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unique Clicks: ', 'betterlinks') + +data.analytic.ip), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "icon"
  }, (0,_utils_helper__WEBPACK_IMPORTED_MODULE_5__.analytic)(data.analytic, data.ID))), !isDeleteConfirm ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, isShowVisitLink && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-tooltip"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
    className: "dnd-link-button",
    href: site_url + '/' + data.short_url,
    target: "_blank"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-visit-url"
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Visit Link', 'betterlinks'))), isAlowQr && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_QRScanner__WEBPACK_IMPORTED_MODULE_4__["default"], {
    shortUrl: data.short_url
  }), isShowCopyLink && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "dnd-link-button btl-tooltip",
    onClick: function onClick() {
      return copyShortUrlHandler(data.short_url);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "icon"
  }, isCopyUrl ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "dashicons dashicons-yes"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-link"
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copy Link', 'betterlinks'))), isShowEditLink && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-tooltip"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_containers_Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
    catId: parseInt(catId),
    catName: catName,
    data: data,
    submitHandler: submitLinkHandler
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit Link', 'betterlinks'))), isShowDeleteLink && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    type: "button",
    className: "dnd-link-button delete-button btl-tooltip",
    onClick: function onClick() {
      return deleteHandler();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-delete"
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete', 'betterlinks')))) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-confirm-message"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "action-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are You Sure?', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "action-set"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "action yes",
    onClick: function onClick() {
      return confirmDelete();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Yes', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "action no",
    onClick: noDelete
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No', 'betterlinks')))));
};
LinkQuickAction.propTypes = propTypes;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkQuickAction);

/***/ }),

/***/ "./dev_betterlinks/components/LinksFilter/index.js":
/*!*********************************************************!*\
  !*** ./dev_betterlinks/components/LinksFilter/index.js ***!
  \*********************************************************/
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
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var react_date_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-date-range */ "./node_modules/react-date-range/dist/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");







var rowDeleteHandler = function rowDeleteHandler(selectedRows, action, deleteLinkHandler, setWarning, setToggledClearRows) {
  if (action.value === 'delete') {
    setWarning(false);
    var deleteItemLists = [];
    selectedRows.map(function (item) {
      deleteItemLists.push({
        ID: item.ID,
        term_id: item.cat_id,
        short_url: item.short_url
      });
    });
    setToggledClearRows();
    deleteLinkHandler(deleteItemLists);
    return;
  }
  setWarning(true);
};
var LinksFilter = function LinksFilter(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    bulkAction = _useState2[0],
    setBulkAction = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    warning = _useState4[0],
    setWarning = _useState4[1];
  var dateRangePickerOnChangeHandler = function dateRangePickerOnChangeHandler(item) {
    props.setCustomDateFilter([item.selection]);
    if (item.selection.endDate != item.selection.startDate) {
      (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.removeOverlayElement)();
      props.setIsOpenCustomDateFilter(false);
    }
  };
  var closeDatePicker = function closeDatePicker() {
    (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.removeOverlayElement)();
    props.setIsOpenCustomDateFilter(false);
    props.dateHandler(null);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-links-filter"
  }, props.bulkActionData.selectedCount > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-bulk-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "btl-list-view-select",
    classNamePrefix: "btl-react-select",
    defaultValue: {
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bulk Actions', 'betterlinks')
    },
    value: bulkAction !== null && bulkAction !== void 0 && bulkAction.value ? bulkAction : {
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bulk Actions', 'betterlinks')
    },
    options: [{
      value: 'delete',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete', 'betterlinks')
    }],
    onChange: function onChange(e) {
      return setBulkAction(e);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-tooltip"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "btl-link-apply-button",
    onClick: function onClick() {
      rowDeleteHandler(props.bulkActionData.selectedRows, bulkAction, props.deleteLinkHandler, setWarning, props.setToggledClearRows);
      setBulkAction({});
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Apply', 'betterlinks')), warning && bulkAction.value !== 'delete' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-tooltiptext"
  }, "Please Select Action."))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-click-filter"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    id: "search",
    type: "text",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search', 'betterlinks'),
    value: props.filterText,
    onChange: props.onFilter
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "btl-list-view-select btl-category-filter",
    classNamePrefix: "btl-react-select",
    placeholder: "Categories",
    value: props.selectedCategory,
    options: props.catItems,
    onChange: function onChange(e) {
      return props.categorySelectHandler(e);
    },
    isClearable: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "btl-list-view-select btl-category-filter",
    classNamePrefix: "btl-react-select",
    placeholder: "Tags",
    value: props.selectedTag,
    options: props.tagItems,
    onChange: function onChange(e) {
      return props.tagSelectHandler(e);
    },
    isClearable: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "btl-list-view-select btl-shortable-filter",
    classNamePrefix: "btl-react-select",
    placeholder: "Sort by Clicks",
    options: [{
      value: 'mostClicks',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Most Clicks', 'betterlinks')
    }, {
      value: 'leastClicks',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Least Clicks', 'betterlinks')
    }, {
      value: 'mostUniqueClicks',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Most Unique Clicks', 'betterlinks')
    }, {
      value: 'leastUniqueClicks',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Least Unique Clicks', 'betterlinks')
    }],
    value: props.selectedClicksType,
    onChange: function onChange(e) {
      return props.setClicksType(e);
    },
    isClearable: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "btl-list-view-select",
    classNamePrefix: "btl-react-select",
    placeholder: "All Dates",
    options: [{
      value: 'mostRecent',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Most Recent', 'betterlinks')
    }, {
      value: 'leastRecent',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Least Recent', 'betterlinks')
    }, {
      value: 'custom',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom', 'betterlinks')
    }],
    value: props.selectedDateType,
    onChange: function onChange(e) {
      return props.dateHandler(e);
    },
    isClearable: true
  }), props.selectedDateType && props.selectedDateType.value === 'custom' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "btl-list-view-calendar",
    onClick: function onClick() {
      return props.dateHandler({
        value: 'custom',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom', 'betterlinks')
      });
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "dashicons dashicons-calendar"
  }), String(props.customDateFilter[0].startDate).slice(4, 15), " - ", String(props.customDateFilter[0].endDate).slice(4, 15))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "btl-link-filter-button",
    onClick: props.resetFilterHandler
  }, "Reset Filter"), props.isOpenCustomDateFilter && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-date-range-picker-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-date-range-picker"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "btn-date-range-close",
    onClick: function onClick() {
      return closeDatePicker();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "dashicons dashicons-no-alt"
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_date_range__WEBPACK_IMPORTED_MODULE_3__.DateRangePicker, {
    onChange: function onChange(item) {
      return dateRangePickerOnChangeHandler(item);
    },
    showSelectionPreview: true,
    moveRangeOnFirstSelection: false,
    months: 2,
    ranges: props.customDateFilter,
    direction: "horizontal"
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinksFilter);

/***/ }),

/***/ "./dev_betterlinks/components/List/index.js":
/*!**************************************************!*\
  !*** ./dev_betterlinks/components/List/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LinkQuickAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LinkQuickAction */ "./dev_betterlinks/components/LinkQuickAction/index.js");
/* harmony import */ var _FavoriteIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FavoriteIcon */ "./dev_betterlinks/components/FavoriteIcon/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _containers_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../containers/Link */ "./dev_betterlinks/containers/Link.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }







var List = function List(props) {
  var _item$favorite;
  var catId = props.catId,
    item = props.item,
    index = props.index,
    is_allow_qr = props.is_allow_qr,
    term_name = props.term_name,
    edit_link = props.edit_link,
    delete_link = props.delete_link,
    sortByFav = props.favouriteSort.sortByFav;
  if (!(item !== null && item !== void 0 && (_item$favorite = item.favorite) !== null && _item$favorite !== void 0 && _item$favorite.favForAll) && sortByFav) return;
  var expireStatusDot = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_5__.useBtlExpireStatusDot)({
    data: item,
    view: 'dnd'
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_8__.Draggable, {
    key: "cat-".concat(catId, "-item_").concat(item.ID),
    draggableId: "cat-".concat(catId, "-item_").concat(item.ID),
    index: index
  }, function (provided, snapshot) {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", _objectSpread(_objectSpread({
      className: "btl-dnd-link ".concat(snapshot.isDragging ? 'btl-dnd-link-dragging' : ''),
      ref: provided.innerRef
    }, provided.draggableProps), provided.dragHandleProps), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-dnd-link-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", {
      className: "dnd-link-title"
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "icon"
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
      src: _utils_helper__WEBPACK_IMPORTED_MODULE_4__.plugin_root_url + 'assets/images/move-icon.svg',
      alt: "icon"
    })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_FavoriteIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {
      data: item
    }), expireStatusDot, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_containers_Link__WEBPACK_IMPORTED_MODULE_7__["default"], {
      catId: parseInt(catId),
      catName: term_name,
      data: item,
      submitHandler: edit_link
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "text"
    }, item.link_title))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-dnd-link-button-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_LinkQuickAction__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isAlowQr: is_allow_qr,
      isShowAnalytics: true,
      catId: parseInt(catId),
      catName: term_name,
      submitLinkHandler: edit_link,
      deleteLinkHandler: delete_link,
      data: item,
      isShowEditLink: betterLinksHooks.applyFilters('betterLinksIsShowViewLink', true),
      isShowDeleteLink: betterLinksHooks.applyFilters('betterLinksIsShowDeleteLink', true)
    }))));
  });
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    favouriteSort: state.favouriteSort
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_6__.connect)(mapStateToProps, null)(List));

/***/ }),

/***/ "./dev_betterlinks/components/Loader/TableLoader.js":
/*!**********************************************************!*\
  !*** ./dev_betterlinks/components/Loader/TableLoader.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "./node_modules/react-content-loader/dist/react-content-loader.es.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var TableLoader = function TableLoader(props) {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({
    speed: 2,
    width: '100%',
    height: '100%',
    viewBox: "0 0 532 148",
    backgroundColor: "#e8e8e8",
    foregroundColor: "#c2c2c2"
  }, props), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "2",
    rx: "0",
    ry: "0",
    width: "530",
    height: "11"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "3",
    y: "21",
    rx: "0",
    ry: "0",
    width: "527",
    height: "10"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "46",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "61",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "76",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "91",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "106",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "107"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "529",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "106"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "8",
    rx: "0",
    ry: "0",
    width: "8",
    height: "16"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "25",
    y: "8",
    rx: "0",
    ry: "0",
    width: "84",
    height: "17"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "144",
    y: "10",
    rx: "0",
    ry: "0",
    width: "83",
    height: "14"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "264",
    y: "9",
    rx: "0",
    ry: "0",
    width: "77",
    height: "16"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "476",
    y: "8",
    rx: "0",
    ry: "0",
    width: "54",
    height: "18"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "374",
    y: "8",
    rx: "0",
    ry: "0",
    width: "71",
    height: "16"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "39",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "38",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "38",
    rx: "0",
    ry: "0",
    width: "65",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "38",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "38",
    rx: "0",
    ry: "0",
    width: "54",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "55",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "54",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "54",
    rx: "0",
    ry: "0",
    width: "58",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "54",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "54",
    rx: "0",
    ry: "0",
    width: "49",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "70",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "69",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "69",
    rx: "0",
    ry: "0",
    width: "60",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "69",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "68",
    rx: "0",
    ry: "0",
    width: "56",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "85",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "84",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "84",
    rx: "0",
    ry: "0",
    width: "54",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "84",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "84",
    rx: "0",
    ry: "0",
    width: "45",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "100",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "99",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "99",
    rx: "0",
    ry: "0",
    width: "58",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "99",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "99",
    rx: "0",
    ry: "0",
    width: "54",
    height: "3"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableLoader);

/***/ }),

/***/ "./dev_betterlinks/components/Loader/index.js":
/*!****************************************************!*\
  !*** ./dev_betterlinks/components/Loader/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "./node_modules/react-content-loader/dist/react-content-loader.es.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var Loader = function Loader(props) {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({
    speed: 2,
    height: "100%",
    width: "100%",
    viewBox: "0 0 533 250",
    backgroundColor: "#e8e8e8",
    foregroundColor: "#c2c2c2"
  }, props), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "123",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "1",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "115",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "13",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "8",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "84",
    y: "8",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "36",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "52",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "68",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "85",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "62",
    cy: "101",
    r: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "7",
    y: "44",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "7",
    y: "76",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "7",
    y: "61",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "7",
    y: "27",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "116",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "107",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "98",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "89",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "116",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "107",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "98",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "89",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "116",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "107",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "98",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "89",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "116",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "107",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "98",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "89",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "407",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "529",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "407",
    y: "1",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "407",
    y: "115",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "407",
    y: "13",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "408",
    y: "8",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "490",
    y: "8",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "407",
    y: "36",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "407",
    y: "52",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "407",
    y: "68",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "407",
    y: "85",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "468",
    cy: "101",
    r: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "413",
    y: "44",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "413",
    y: "76",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "413",
    y: "61",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "413",
    y: "27",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "522",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "513",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "504",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "495",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "522",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "513",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "504",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "495",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "522",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "513",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "504",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "495",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "522",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "513",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "504",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "495",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "408",
    y: "129",
    rx: "0",
    ry: "0",
    width: "3",
    height: "81"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "530",
    y: "129",
    rx: "0",
    ry: "0",
    width: "3",
    height: "81"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "408",
    y: "128",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "408",
    y: "209",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "469",
    cy: "163",
    r: "12"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "182",
    rx: "0",
    ry: "0",
    width: "48",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "128",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "123",
    y: "129",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "128",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "242",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "140",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "135",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "84",
    y: "135",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "163",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "179",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "195",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "212",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "62",
    cy: "228",
    r: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "7",
    y: "171",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "7",
    y: "203",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "7",
    y: "188",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "7",
    y: "154",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "116",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "107",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "98",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "89",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "116",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "107",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "98",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "89",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "116",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "107",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "98",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "89",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "116",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "107",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "98",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "89",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "257",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "1",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "115",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "13",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "136",
    y: "8",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "218",
    y: "8",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "36",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "52",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "68",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "85",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "196",
    cy: "101",
    r: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "141",
    y: "44",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "141",
    y: "76",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "141",
    y: "61",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "141",
    y: "27",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "250",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "241",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "232",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "223",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "250",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "241",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "232",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "223",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "250",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "241",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "232",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "223",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "250",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "241",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "232",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "223",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "129",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "257",
    y: "129",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "128",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "242",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "140",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "136",
    y: "135",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "218",
    y: "135",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "163",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "179",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "195",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "135",
    y: "212",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "196",
    cy: "228",
    r: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "141",
    y: "171",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "141",
    y: "203",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "141",
    y: "188",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "141",
    y: "154",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "250",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "241",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "232",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "223",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "250",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "241",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "232",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "223",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "250",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "241",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "232",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "223",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "250",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "241",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "232",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "223",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "393",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "1",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "115",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "13",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "272",
    y: "8",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "354",
    y: "8",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "36",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "52",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "68",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "85",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "332",
    cy: "101",
    r: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "277",
    y: "44",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "277",
    y: "76",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "277",
    y: "61",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "277",
    y: "27",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "386",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "377",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "368",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "359",
    cy: "29",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "386",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "377",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "368",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "359",
    cy: "45",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "386",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "377",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "368",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "359",
    cy: "61",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "386",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "377",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "368",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "359",
    cy: "77",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "129",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "393",
    y: "129",
    rx: "0",
    ry: "0",
    width: "3",
    height: "116"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "128",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "242",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "140",
    rx: "0",
    ry: "0",
    width: "125",
    height: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "272",
    y: "135",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "354",
    y: "135",
    rx: "0",
    ry: "0",
    width: "39",
    height: "6"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "163",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "179",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "195",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "271",
    y: "212",
    rx: "0",
    ry: "0",
    width: "125",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "332",
    cy: "228",
    r: "9"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "277",
    y: "171",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "277",
    y: "203",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "277",
    y: "188",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "277",
    y: "154",
    rx: "0",
    ry: "0",
    width: "36",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "386",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "377",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "368",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "359",
    cy: "156",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "386",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "377",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "368",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "359",
    cy: "172",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "386",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "377",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "368",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "359",
    cy: "188",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "386",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "377",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "368",
    cy: "204",
    r: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
    cx: "359",
    cy: "204",
    r: "3"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ "./dev_betterlinks/components/QRScanner/index.js":
/*!*******************************************************!*\
  !*** ./dev_betterlinks/components/QRScanner/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QRScanner)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var qrcode_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! qrcode.react */ "./node_modules/qrcode.react/lib/index.js");
/* harmony import */ var qrcode_react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(qrcode_react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__);







function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }






var propTypes = {};
var QRCodeGenerator = /*#__PURE__*/function (_React$Component) {
  function QRCodeGenerator(props) {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, QRCodeGenerator);
    _this = _callSuper(this, QRCodeGenerator, [props]);
    _this.download = _this.download.bind(_this);
    return _this;
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(QRCodeGenerator, _React$Component);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(QRCodeGenerator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.download();
    }
  }, {
    key: "download",
    value: function download() {
      var canvas = document.querySelector('.betterlinksqrcode > canvas');
      this.downloadRef.href = canvas.toDataURL();
      this.downloadRef.download = "betterlinks-".concat(this.props.value, "-QR.png");
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)((react__WEBPACK_IMPORTED_MODULE_6___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "btl-qrcode-modal"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("div", {
        className: "betterlinksqrcode"
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)((qrcode_react__WEBPACK_IMPORTED_MODULE_8___default()), {
        value: (0,_utils_helper__WEBPACK_IMPORTED_MODULE_9__.makeShortUrl)(this.props.value),
        size: 300,
        level: 'H'
      }), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("p", {
        className: "btl-qrcode-modal__note"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('Hit the', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('"Download"', 'betterlinks')), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('button below to save the QR Code on your device', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("a", {
        className: "btn-qrcode-download",
        ref: function ref(_ref) {
          return _this2.downloadRef = _ref;
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("i", {
        className: "btl btl-download-arrow"
      }))));
    }
  }]);
}((react__WEBPACK_IMPORTED_MODULE_6___default().Component));
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
    height: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
function QRScanner(_ref2) {
  var shortUrl = _ref2.shortUrl;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    modalIsOpen = _useState2[0],
    setIsOpen = _useState2[1];
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)((react__WEBPACK_IMPORTED_MODULE_6___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(react__WEBPACK_IMPORTED_MODULE_6__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("button", {
    className: "dnd-link-button btl-tooltip",
    onClick: openModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("i", {
    className: "btl btl-qr-scanner"
  })), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('QR Code', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_7___default()), {
    isOpen: modalIsOpen,
    onRequestClose: closeModal,
    style: customStyles,
    ariaHideApp: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("span", {
    className: "btl-close-modal",
    onClick: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)("i", {
    className: "btl btl-cancel"
  })), (0,react__WEBPACK_IMPORTED_MODULE_6__.createElement)(QRCodeGenerator, {
    value: shortUrl
  }))));
}
QRScanner.propTypes = propTypes;

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
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");





var Select = function Select(props) {
  var _useField = (0,formik__WEBPACK_IMPORTED_MODULE_3__.useField)(props.name),
    _useField2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useField, 3),
    field = _useField2[0],
    setThisFieldValue = _useField2[2].setValue;
  var isCloakDisabled = ['cloak', 'pro'].includes(field.value) && !_utils_helper__WEBPACK_IMPORTED_MODULE_2__.is_pro_enabled;
  var defaultValue = isCloakDisabled ? '307' : field.value;
  if (isCloakDisabled) {
    setThisFieldValue('307');
  }
  var onChange = function onChange(option) {
    if (option == null) {
      return props.setFieldValue(field.name, '');
    }
    return props.setFieldValue(field.name, props.isMulti ? option.map(function (item) {
      return item.value;
    }) : option.value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(React.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_4__["default"], {
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

/***/ "./dev_betterlinks/components/Teasers/Link/AdvanceOptionTeaser.js":
/*!************************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/Link/AdvanceOptionTeaser.js ***!
  \************************************************************************/
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



var AdvanceOptionTeaser = function AdvanceOptionTeaser(_ref) {
  var _ref$openUpgradeToPro = _ref.openUpgradeToProModal,
    openUpgradeToProModal = _ref$openUpgradeToPro === void 0 ? function () {} : _ref$openUpgradeToPro;
  if (_utils_helper__WEBPACK_IMPORTED_MODULE_2__.is_pro_enabled) return;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "link-options__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "link-options--teasers"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "btl-modal-form-label",
    htmlFor: "status"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Status', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "status",
    disabled: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "publish"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Active', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "btl-modal-form-label",
    htmlFor: "expire"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Expire', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "expire",
    type: "checkbox",
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-modal-form-group",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "btl-modal-form-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Password Protection', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "enable_password",
    type: "checkbox",
    disabled: true
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdvanceOptionTeaser);

/***/ }),

/***/ "./dev_betterlinks/components/Teasers/Link/DynamicRedirectsTeaser.js":
/*!***************************************************************************!*\
  !*** ./dev_betterlinks/components/Teasers/Link/DynamicRedirectsTeaser.js ***!
  \***************************************************************************/
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



var DynamicRedirectsTeaser = function DynamicRedirectsTeaser(_ref) {
  var openUpgradeToProModal = _ref.openUpgradeToProModal;
  if (_utils_helper__WEBPACK_IMPORTED_MODULE_2__.is_pro_enabled) return;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "link-options--teasers",
    onClick: function onClick() {
      return openUpgradeToProModal();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "link-options-info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Redirection Type:', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Target URL 1:', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: "example-1.com",
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Target URL 2:', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: "example-2.com",
    disabled: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Split Test:', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "splittest",
    type: "checkbox",
    disabled: true
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicRedirectsTeaser);

/***/ }),

/***/ "./dev_betterlinks/components/Terms/CatForm.js":
/*!*****************************************************!*\
  !*** ./dev_betterlinks/components/Terms/CatForm.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CatForm)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");








var propTypes = {
  catId: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number),
  catName: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  catSlug: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  submitHandler: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  hideHandler: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
function CatForm(_ref) {
  var _ref$catId = _ref.catId,
    catId = _ref$catId === void 0 ? 0 : _ref$catId,
    _ref$catName = _ref.catName,
    catName = _ref$catName === void 0 ? '' : _ref$catName,
    _ref$catSlug = _ref.catSlug,
    catSlug = _ref$catSlug === void 0 ? '' : _ref$catSlug,
    submitHandler = _ref.submitHandler,
    hideHandler = _ref.hideHandler;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    slugIsExists = _useState2[0],
    setSlugIsExists = _useState2[1];
  var catSlugUniqueCheck = function catSlugUniqueCheck(slug, ID) {
    var form_data = new FormData();
    form_data.append('action', 'betterlinks/admin/cat_slug_unique_checker');
    form_data.append('security', _utils_helper__WEBPACK_IMPORTED_MODULE_4__.betterlinks_nonce);
    form_data.append('ID', ID);
    form_data.append('slug', slug);
    return axios__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxurl, form_data).then(function (response) {
      if (response.data) {
        setSlugIsExists(response.data.data);
        return response.data.data;
      }
    }, function (error) {
      console.log(error);
    });
  };
  var _onSubmit = function onSubmit(values) {
    catSlugUniqueCheck(values.term_slug, values.ID).then(function (isUnique) {
      if (!isUnique) {
        var term_name = values.term_name.trim();
        if (term_name) {
          values.term_name = term_name;
          hideHandler(false);
          return submitHandler(values);
        }
      }
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_6__.Formik, {
    initialValues: {
      ID: catId,
      term_name: catName,
      term_slug: catSlug,
      term_type: 'category'
    },
    onSubmit: function onSubmit(values, _ref2) {
      var setSubmitting = _ref2.setSubmitting;
      setSubmitting(false);
      _onSubmit(values);
    }
  }, function (props) {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_6__.Form, {
      className: slugIsExists ? 'w-100 is-invalid' : 'w-100'
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: catId > 0 ? 'btl-modal-form-group' : 'btl-form-group'
    }, catId > 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      className: "btl-modal-form-label btl-required",
      htmlFor: "cat_name"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Category Name', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_6__.Field, {
      id: "term_name",
      name: "term_name",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('* Name', 'betterlinks'),
      className: catId > 0 ? 'btl-modal-form-control' : 'btl-form-control',
      onChange: function onChange(e) {
        var slug = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.generateSlug)(e.target.value);
        props.setFieldValue('term_name', e.target.value);
        props.setFieldValue('term_slug', slug);
        setSlugIsExists(false);
      },
      required: true,
      autoFocus: true
    })), slugIsExists == true && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "errorlog"
    }, "Already Exists"), catId > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      className: "btl-modal-form-label"
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
      type: "submit",
      className: "btl-modal-submit-button"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Update', 'betterlinks'))) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
      className: "btl-create-category-submit",
      type: "submit"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Submit', 'betterlinks')));
  }));
}
CatForm.propTypes = propTypes;

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

/***/ "./dev_betterlinks/components/Terms/Tags.js":
/*!**************************************************!*\
  !*** ./dev_betterlinks/components/Terms/Tags.js ***!
  \**************************************************/
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_select_creatable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-select/creatable */ "./node_modules/react-select/creatable/dist/react-select.esm.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");








var propTypes = {
  linkId: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number),
  data: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  fieldName: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  setFieldValue: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
var Tags = function Tags(_ref) {
  var fieldName = _ref.fieldName,
    linkId = _ref.linkId,
    setFieldValue = _ref.setFieldValue,
    data = _ref.data,
    disabled = _ref.disabled;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    saveTags = _useState2[0],
    setSaveTags = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (linkId) {
      var form_data = new FormData();
      form_data.append('action', 'betterlinks/admin/get_terms');
      form_data.append('security', _utils_helper__WEBPACK_IMPORTED_MODULE_4__.betterlinks_nonce);
      form_data.append('ID', linkId);
      form_data.append('term_type', 'tags');
      axios__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxurl, form_data).then(function (res) {
        if (res.data.data) {
          setSaveTags(res.data.data.map(function (item) {
            return {
              value: item.term_id,
              label: item.term_name
            };
          }));
        }
      }, function (error) {
        console.log(error);
      });
    } else {
      setSaveTags([]);
    }
  }, []);
  var _useField = (0,formik__WEBPACK_IMPORTED_MODULE_6__.useField)(fieldName),
    _useField2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useField, 1),
    field = _useField2[0];
  var onChange = function onChange(option) {
    if (option == null) {
      return setFieldValue(field.name, '');
    }
    return setFieldValue(field.name, option.map(function (item) {
      return item.value;
    }));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, saveTags && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select_creatable__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "btl-modal-form-control btl-modal-select",
    isClearable: true,
    id: field.id,
    name: field.name,
    defaultValue: saveTags,
    onChange: onChange,
    classNamePrefix: "btl-react-select",
    options: data.terms && data.terms.filter(function (item) {
      return item.term_type == 'tags';
    }).map(function (item) {
      return {
        value: item.ID,
        label: item.term_name
      };
    }),
    isDisabled: disabled,
    isMulti: true
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tags);
Tags.propTypes = propTypes;

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
    className: "btl-tooltiptext"
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

/***/ "./dev_betterlinks/containers/CatHeader.js":
/*!*************************************************!*\
  !*** ./dev_betterlinks/containers/CatHeader.js ***!
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
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _components_Terms_CatForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Terms/CatForm */ "./dev_betterlinks/components/Terms/CatForm.js");











var propTypes = {
  catId: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().number),
  catName: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),
  catSlug: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string)
};
var CatHeader = function CatHeader(props) {
  var catId = props.catId,
    catName = props.catName,
    catSlug = props.catSlug,
    update_cat = props.update_cat,
    delete_cat = props.delete_cat;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    modalIsOpen = _useState2[0],
    setModalIsOpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    isCatAction = _useState4[0],
    setCatAction = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
    isDeleteConfirm = _useState6[0],
    setDeleteConfrim = _useState6[1];
  var catActionHandler = function catActionHandler() {
    setDeleteConfrim(false);
    setCatAction(!isCatAction);
  };
  var deleteHandler = function deleteHandler() {
    setCatAction(!isCatAction);
    setDeleteConfrim(!isDeleteConfirm);
  };
  var noDelete = function noDelete() {
    setCatAction(false);
    setDeleteConfrim(false);
  };
  var confirmDelete = function confirmDelete() {
    setDeleteConfrim(false);
    setDeleteConfrim(false);
    delete_cat({
      cat_id: catId
    });
  };
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setCatAction(false);
    setModalIsOpen(false);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "category-head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h4", {
    className: "title"
  }, catName), catSlug != 'uncategorized' && betterLinksHooks.applyFilters('isShowCatControl', true) && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "dropdown"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "icon",
    onClick: function onClick() {
      return catActionHandler();
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-more"
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "dropdown-menu"
  }, isCatAction && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("ul", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    onClick: openModal,
    className: "link"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("li", null, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "link delete",
    onClick: function onClick() {
      return deleteHandler();
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete', 'betterlinks')))), isDeleteConfirm && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-confirm-message"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    className: "action-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are You Sure?', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "action-set"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "action yes",
    onClick: confirmDelete
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Yes', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "action no",
    onClick: noDelete
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No', 'betterlinks'))))))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_3___default()), {
    isOpen: modalIsOpen,
    onRequestClose: closeModal,
    style: _utils_helper__WEBPACK_IMPORTED_MODULE_6__.modalCustomSmallStyles,
    ariaHideApp: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-close-modal",
    onClick: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-cancel"
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_Terms_CatForm__WEBPACK_IMPORTED_MODULE_7__["default"], {
    catId: parseInt(catId),
    catName: catName,
    catSlug: catSlug,
    submitHandler: update_cat,
    hideHandler: closeModal
  })));
};
CatHeader.propTypes = propTypes;
var mapStateToProps = function mapStateToProps(state) {
  return {
    links: state.links
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    update_cat: (0,redux__WEBPACK_IMPORTED_MODULE_9__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_5__.update_cat, dispatch),
    delete_cat: (0,redux__WEBPACK_IMPORTED_MODULE_9__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_5__.delete_cat, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_4__.connect)(mapStateToProps, mapDispatchToProps)(CatHeader));

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

/***/ "./dev_betterlinks/containers/DndCanvas.js":
/*!*************************************************!*\
  !*** ./dev_betterlinks/containers/DndCanvas.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Loader */ "./dev_betterlinks/components/Loader/index.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _components_CreateCategory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/CreateCategory */ "./dev_betterlinks/components/CreateCategory.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Link */ "./dev_betterlinks/containers/Link.js");
/* harmony import */ var _CatHeader__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CatHeader */ "./dev_betterlinks/containers/CatHeader.js");
/* harmony import */ var _components_List__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/List */ "./dev_betterlinks/components/List/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _redux_actions_password_actions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../redux/actions/password.actions */ "./dev_betterlinks/redux/actions/password.actions.js");
/* harmony import */ var _redux_actions_metaTags_actions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../redux/actions/metaTags.actions */ "./dev_betterlinks/redux/actions/metaTags.actions.js");








function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
















var InnerList = /*#__PURE__*/function (_React$Component) {
  function InnerList() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, InnerList);
    return _callSuper(this, InnerList, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(InnerList, _React$Component);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(InnerList, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.lists !== this.props.lists;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        lists = _this$props.lists,
        settings = _this$props.settings,
        edit_link = _this$props.edit_link,
        delete_link = _this$props.delete_link,
        catId = _this$props.catId;
      return lists.map(function (list, index) {
        return !!list.link_title && (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(_components_List__WEBPACK_IMPORTED_MODULE_16__["default"], {
          is_allow_qr: settings && settings.is_allow_qr,
          edit_link: edit_link,
          delete_link: delete_link,
          catId: catId,
          key: "cat-".concat(catId, "-item-").concat(index),
          item: list,
          index: index
        });
      });
    }
  }]);
}(React.Component);
var CatWrap = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.memo)(function (_ref) {
  var ind = _ref.ind,
    el = _ref.el,
    provided = _ref.provided,
    props = _ref.props;
  var sortByFav = props.favouriteSort.sortByFav;
  var lists = el.lists;
  var isEmpty = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_17__.isListEmpty)(lists, sortByFav);
  if (isEmpty && sortByFav) return (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
    className: "dnd-category",
    style: {
      display: 'none'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
    ref: provided.innerRef
  }));
  return (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
    className: "dnd-category"
  }, (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(_CatHeader__WEBPACK_IMPORTED_MODULE_15__["default"], {
    catId: parseInt(ind),
    catName: el.term_name,
    catSlug: el.term_slug
  }), (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", _objectSpread({
    ref: provided.innerRef,
    className: "dnd-category-body-wrap"
  }, provided.droppableProps), (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
    className: "category-body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(InnerList, {
    settings: props.settings.settings,
    edit_link: props.edit_link,
    delete_link: props.delete_link,
    catId: ind,
    lists: lists
  }), provided.placeholder), (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
    className: "category-footer"
  }, betterLinksHooks.applyFilters('betterLinksIsShowWriteLink', true) && !sortByFav && (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(_Link__WEBPACK_IMPORTED_MODULE_14__["default"], {
    catId: parseInt(ind),
    catName: el.term_name,
    submitHandler: props.add_new_link
  }))));
});
function DndCanvas(props) {
  var links = props.links.links;
  var settings = props.settings.settings;
  var terms = props.terms.terms;
  var sortByFav = props.favouriteSort.sortByFav;
  var password = props.password.password;
  var metaTags = props.metaTags.metaTags;
  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
    if (!settings) {
      props.fetch_settings_data();
      props.fetch_tracking_settings();
    }
    if (!links) {
      props.fetch_links_data();
    }
    if (!terms) {
      props.fetch_terms_data();
    }
    if (!password) {
      props.fetch_links_password();
    }
    if (!metaTags) {
      props.fetch_meta_tags();
    }
  }, []);

  // if sort by favorite is selected and there is no favorite link
  if ((0,_utils_helper__WEBPACK_IMPORTED_MODULE_17__.getFavoriteLinkCount)(links) === 0 && sortByFav) return (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
    className: "dnd-not-found"
  }, (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
    style: {
      padding: 24
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_18__.__)('There are no records to display', 'betterlinks')));
  return (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, links && settings && terms ? (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
    className: "dnd-category-wrapper ".concat(links ? '' : 'd-flex')
  }, (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_21__.DragDropContext, {
    onDragEnd: props.onDragEnd
  }, links && Object.entries(links).filter(function (items) {
    return !(items[1].lists.length === 0 && items[1].term_slug === 'uncategorized');
  }).map(function (_ref2) {
    var _ref3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, 2),
      ind = _ref3[0],
      el = _ref3[1];
    return (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_21__.Droppable, {
      key: ind,
      droppableId: ind
    }, function (provided, snapshot) {
      return (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(CatWrap, {
        ind: ind,
        el: el,
        provided: provided,
        snapshot: snapshot,
        props: props
      });
    });
  }), betterLinksHooks.applyFilters('betterLinksIsShowWriteCat', true) && !sortByFav && (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(_components_CreateCategory__WEBPACK_IMPORTED_MODULE_13__["default"], {
    createCatHandler: props.add_new_cat
  }))) : (0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(_components_Loader__WEBPACK_IMPORTED_MODULE_9__["default"], null));
}
var mapStateToProps = function mapStateToProps(state) {
  return {
    links: state.links,
    settings: state.settings,
    terms: state.terms,
    favouriteSort: state.favouriteSort,
    password: state.password,
    metaTags: state.metaTags
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetch_links_data: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.fetch_links_data, dispatch),
    fetch_settings_data: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_11__.fetch_settings_data, dispatch),
    fetch_tracking_settings: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_11__.fetch_tracking_settings, dispatch),
    onDragEnd: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.onDragEnd, dispatch),
    add_new_cat: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.add_new_cat, dispatch),
    add_new_link: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.add_new_link, dispatch),
    edit_link: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.edit_link, dispatch),
    delete_link: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.delete_link, dispatch),
    fetch_terms_data: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_12__.fetch_terms_data, dispatch),
    fetch_links_password: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_password_actions__WEBPACK_IMPORTED_MODULE_19__.fetch_links_password, dispatch),
    fetch_meta_tags: (0,redux__WEBPACK_IMPORTED_MODULE_22__.bindActionCreators)(_redux_actions_metaTags_actions__WEBPACK_IMPORTED_MODULE_20__.fetch_meta_tags, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_8__.connect)(mapStateToProps, mapDispatchToProps)(DndCanvas));

/***/ }),

/***/ "./dev_betterlinks/containers/Link.js":
/*!********************************************!*\
  !*** ./dev_betterlinks/containers/Link.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* binding */ Link),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_Select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Select */ "./dev_betterlinks/components/Select/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/data */ "./dev_betterlinks/utils/data.js");
/* harmony import */ var _components_Terms_Category__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/Terms/Category */ "./dev_betterlinks/components/Terms/Category.js");
/* harmony import */ var _components_Terms_Tags__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/Terms/Tags */ "./dev_betterlinks/components/Terms/Tags.js");
/* harmony import */ var _components_Copy__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/Copy */ "./dev_betterlinks/components/Copy/index.js");
/* harmony import */ var _components_UTMBuilder__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/UTMBuilder */ "./dev_betterlinks/components/UTMBuilder/index.js");
/* harmony import */ var _components_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../components/Teasers/UpgradeToPro */ "./dev_betterlinks/components/Teasers/UpgradeToPro.js");
/* harmony import */ var _components_CustomizeLinkPreview__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../components/CustomizeLinkPreview */ "./dev_betterlinks/components/CustomizeLinkPreview/index.js");
/* harmony import */ var _components_CustomTrackingScripts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../components/CustomTrackingScripts */ "./dev_betterlinks/components/CustomTrackingScripts/index.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _components_CustomFields_LinkFields__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../components/CustomFields/LinkFields */ "./dev_betterlinks/components/CustomFields/LinkFields.js");
/* harmony import */ var _components_Link_FetchedTitleConfirmation__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../components/Link/FetchedTitleConfirmation */ "./dev_betterlinks/components/Link/FetchedTitleConfirmation.js");
/* harmony import */ var _components_Teasers_Link_AdvanceOptionTeaser__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../components/Teasers/Link/AdvanceOptionTeaser */ "./dev_betterlinks/components/Teasers/Link/AdvanceOptionTeaser.js");
/* harmony import */ var _components_Teasers_Link_DynamicRedirectsTeaser__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../components/Teasers/Link/DynamicRedirectsTeaser */ "./dev_betterlinks/components/Teasers/Link/DynamicRedirectsTeaser.js");






function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }










//👇 slight tweak (renamed 'fetch_terms_data' to 'fetch_terms_action_function') to use the <Link /> component inside gutenberg















var propTypes = {
  isShowIcon: (prop_types__WEBPACK_IMPORTED_MODULE_26___default().bool),
  catId: (prop_types__WEBPACK_IMPORTED_MODULE_26___default().number),
  catName: (prop_types__WEBPACK_IMPORTED_MODULE_26___default().string),
  data: (prop_types__WEBPACK_IMPORTED_MODULE_26___default().object),
  submitHandler: (prop_types__WEBPACK_IMPORTED_MODULE_26___default().func)
};
var Link = function Link(props) {
  var _betterlinksGutenStor, _betterlinksGutenStor2, _settings$settings;
  var _props$isShowIcon = props.isShowIcon,
    isShowIcon = _props$isShowIcon === void 0 ? true : _props$isShowIcon,
    catId = props.catId,
    data = props.data,
    submitHandler = props.submitHandler,
    fetch_terms_data = props.fetch_terms_data,
    betterlinksGutenStore = props.betterlinksGutenStore,
    _props$setShowLinkMod = props.setShowLinkModal,
    setShowLinkModal = _props$setShowLinkMod === void 0 ? function () {} : _props$setShowLinkMod,
    searchFieldRef = props.searchFieldRef,
    linkNewTab = props.linkNewTab;

  //👇 slight tweaks to use <Link /> component inside gutenberg start
  var settings = betterlinksGutenStore ? betterlinksGutenStore === null || betterlinksGutenStore === void 0 || (_betterlinksGutenStor = betterlinksGutenStore.getState()) === null || _betterlinksGutenStor === void 0 ? void 0 : _betterlinksGutenStor.settings : props.settings;
  var terms = betterlinksGutenStore ? betterlinksGutenStore === null || betterlinksGutenStore === void 0 || (_betterlinksGutenStor2 = betterlinksGutenStore.getState()) === null || _betterlinksGutenStor2 === void 0 ? void 0 : _betterlinksGutenStor2.terms : props.terms;
  window.betterLinksHooks = betterlinksGutenStore ? {
    applyFilters: function applyFilters(handle, defaultVal) {
      return defaultVal;
    }
  } : window.betterLinksHooks;
  //👆 slight tweaks to use <Link /> component inside gutenberg end

  // 👇 password protection
  var passwords = props.password;

  // 👇 Customized Meta Tags
  var _ref = props.metaTags || {},
    metaTags = _ref.metaTags;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState, 2),
    modalIsOpen = _useState2[0],
    setModalIsOpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState3, 2),
    isFetchTerms = _useState4[0],
    setIsFetchTerms = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState5, 2),
    slugIsExists = _useState6[0],
    setSlugIsExists = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState7, 2),
    modalUTMIsOpen = _useState8[0],
    setModalUTMIsOpen = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState9, 2),
    isOpenUpgradeToProModal = _useState10[0],
    setUpgradeToProModal = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(true),
    _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState11, 2),
    isShowCustomUTMModalContent = _useState12[0],
    setIsShowCustomUTMModalContent = _useState12[1];
  var currentDate = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.formatDate)(new Date(), 'yyyy-mm-dd h:m:s');
  var isDisableLinkFormEditView = betterLinksHooks.applyFilters('isDisableLinkFormEditView', false, data);
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({
      options: true,
      advanced: false,
      dynamicRedirect: false,
      optimizeMetaTags: false,
      customTrackingScripts: false
    }),
    _useState14 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState13, 2),
    isOpenLinkPanel = _useState14[0],
    setOpenLinkPanel = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),
    _useState16 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState15, 2),
    password = _useState16[0],
    setPassword = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),
    _useState18 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState17, 2),
    metaTag = _useState18[0],
    setMetaTag = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),
    _useState20 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState19, 2),
    fetchedTitle = _useState20[0],
    setFetchedTitle = _useState20[1];
  var customFields = (settings === null || settings === void 0 || (_settings$settings = settings.settings) === null || _settings$settings === void 0 ? void 0 : _settings$settings.customFields) || [];
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
    if (data !== null && data !== void 0 && data.ID && passwords !== null && passwords !== void 0 && passwords.password && Object.values(passwords.password).length > 0) {
      var _password = Object.values(passwords.password).find(function (item) {
        return item.link_id == data.ID;
      });
      setPassword(_password);
    }
  }, [passwords]);
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
    if (data !== null && data !== void 0 && data.ID && metaTags && Object.values(metaTags).length > 0) {
      var _metaTag = Object.values(metaTags).find(function (item) {
        return item.link_id == data.ID;
      });
      setMetaTag(_metaTag);
    }
  }, [metaTags]);
  //👇 this useEffect is only for this 'Link' component's gutenberg implementation start
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function () {
    if (betterlinksGutenStore) {
      setModalIsOpen(true);
    }
    return function () {
      if (searchFieldRef !== null && searchFieldRef !== void 0 && searchFieldRef.current) {
        var _searchFieldRef$curre;
        searchFieldRef === null || searchFieldRef === void 0 || (_searchFieldRef$curre = searchFieldRef.current) === null || _searchFieldRef$curre === void 0 || _searchFieldRef$curre.focus();
      }
    };
  }, [betterlinksGutenStore, password]);
  // 👆 this useEffect is only for this 'Link' component's gutenberg implementation end

  //👇 this variable 'objForGutenTargetBlank' added to handle the 'open in new tab' option in gutenberg format
  var objForGutenTargetBlank = betterlinksGutenStore ? {
    openInNewTab: linkNewTab
  } : {};
  var initialValues = _objectSpread(_objectSpread({
    link_title: '',
    link_slug: '',
    target_url: '',
    short_url: (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.generateShortURL)(settings.settings, null),
    link_note: '',
    link_date: currentDate,
    link_date_gmt: currentDate,
    link_modified: currentDate,
    link_modified_gmt: currentDate,
    redirect_type: '307',
    cat_id: catId ? catId : null
  }, settings.settings), objForGutenTargetBlank);
  var initialUpdateValues = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, settings.settings), {}, {
    link_modified: currentDate,
    link_modified_gmt: currentDate,
    cat_id: catId,
    old_short_url: data ? data.short_url : ''
  }, data), objForGutenTargetBlank), {}, {
    enable_password: password && '1' === password.status,
    old_enable_password: password && '1' === password.status,
    password: password && (password === null || password === void 0 ? void 0 : password.password),
    old_allow_visitor_contact: password && '1' === (password === null || password === void 0 ? void 0 : password.allow_contact),
    allow_visitor_contact: password && '1' === (password === null || password === void 0 ? void 0 : password.allow_contact)
  });
  function openModal() {
    setIsFetchTerms(true);

    //👇 this line added because for gutenberg implementaton 'fetch_terms_data' function call isn't needed
    if (betterlinksGutenStore) return false;
    if (terms !== null && terms !== void 0 && terms.terms) {
      setModalIsOpen(true);
      setIsFetchTerms(false);
    } else {
      fetch_terms_data().then(function () {
        setModalIsOpen(true);
        setIsFetchTerms(false);
      });
    }
  }
  function closeModal() {
    //👇 this following code is only for gutenberg implementation of the 'Link' component & to make sure memory leak doesn't happen ('Can't perform a React state update on an unmounted component')
    if (betterlinksGutenStore) {
      setShowLinkModal(false);
    } else {
      setModalIsOpen(false);
    }
  }
  var openUTMModal = function openUTMModal() {
    setModalIsOpen(true);
    setModalUTMIsOpen(true);
  };
  var builtInUTMModalOpenHandler = function builtInUTMModalOpenHandler() {
    if (_utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled) {
      setIsShowCustomUTMModalContent(false);
      openUTMModal();
    } else {
      openUpgradeToProModal();
    }
  };
  var closeUTMModal = function closeUTMModal() {
    setIsShowCustomUTMModalContent(true);
    setModalUTMIsOpen(false);
  };
  var openUpgradeToProModal = function openUpgradeToProModal() {
    setUpgradeToProModal(true);
  };
  var closeUpgradeToProModal = function closeUpgradeToProModal() {
    setUpgradeToProModal(false);
  };
  var onSubmit = function onSubmit(values) {
    var short_url = values.short_url;
    values.short_url = short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
    (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.shortURLUniqueCheck)(values.short_url, values.ID, setSlugIsExists).then(function (isDuplicate) {
      if (!isDuplicate) {
        if (!values.cat_id) {
          var ID = terms.terms.filter(function (item) {
            return item.term_slug == 'uncategorized';
          })[0].ID;
          values.cat_id = ID;
        }
        if (!values.link_slug) {
          values.link_slug = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.generateSlug)(values.link_title);
        }
        if (isNaN(values === null || values === void 0 ? void 0 : values.cat_id)) {
          values.cat_slug = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.generateSlug)(values.cat_id);
        }
        values.wildcards = Number(values.short_url.includes('*'));
        if (values.cat_id) {
          var link_title = values.link_title.trim();
          if (link_title) {
            values.link_title = link_title;
            // 👇 the 'if statement' is to fix memory leak warning 'Can't perform a React state update on an unmounted component' when using this <Link /> component for gutenberg format
            if (!betterlinksGutenStore) {
              submitHandler(values);
              setModalIsOpen(false);
            } else {
              submitHandler(values).then(function (response) {
                if (response !== null && response !== void 0 && response.data) {
                  setShowLinkModal(false);
                }
                (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.remove_top_loader)(document);
              })["catch"](function (error) {
                return console.log('---error (submitHandler)--', {
                  error: error
                });
              });
              (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.add_top_loader)(document);
            }
          }
        }
      }
    });
  };
  var togglePanel = function togglePanel(type) {
    setOpenLinkPanel((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({
      options: false,
      advanced: false,
      dynamicRedirect: false
    }, type, !isOpenLinkPanel[type]));
  };
  var __handleToggle = function __handleToggle(toggle) {
    togglePanel(toggle);
  };
  var fetchTargetURL = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(lodash__WEBPACK_IMPORTED_MODULE_10___default().debounce( /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee(target_url, setFieldValue, willUpdate, previousTitle) {
      var res, _res$data$result, _fetchedTitle, short_url;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.makeRequest)({
              action: 'betterlinks__fetch_target_url',
              target_url: target_url
            });
          case 3:
            res = _context.sent;
            if (!res.data.result) {
              _context.next = 14;
              break;
            }
            _fetchedTitle = (_res$data$result = res.data.result) === null || _res$data$result === void 0 ? void 0 : _res$data$result.title;
            if (!(_fetchedTitle === previousTitle)) {
              _context.next = 8;
              break;
            }
            return _context.abrupt("return");
          case 8:
            short_url = null;
            if (_fetchedTitle.length > 20) {
              short_url = _fetchedTitle.split(' ').map(function (item) {
                return item[0];
              }).join('');
            }
            if (willUpdate) {
              _context.next = 13;
              break;
            }
            setFetchedTitle(_fetchedTitle);
            return _context.abrupt("return");
          case 13:
            handleTitleChange(setFieldValue, _fetchedTitle || '', short_url);
          case 14:
            _context.next = 19;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 16]]);
    }));
    return function (_x, _x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(), 500), [settings.settings]);
  var handleTitleChange = function handleTitleChange(setFieldValue, title) {
    var short_url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    setFieldValue('link_title', title);
    if (!data) {
      var shortURL = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_12__.generateShortURL)(settings.settings, short_url || title);
      if (shortURL.length > 0) {
        setFieldValue('short_url', shortURL);
        setSlugIsExists(false);
      }
    }
  };
  var submitLinkHandler = function submitLinkHandler(values, actions) {
    var setSubmitting = actions.setSubmitting,
      setFieldError = actions.setFieldError;
    setSubmitting(false);
    var regex = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/;
    if (regex.test(values.link_title)) {
      setFieldError('link_title', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Please ensure the link title does not contain any script.', 'betterlinks'));
      return;
    }
    if (values !== null && values !== void 0 && values.enable_custom_scripts && !(values !== null && values !== void 0 && values.custom_tracking_scripts)) {
      setFieldError('custom_tracking_scripts', true);
      return;
    }
    onSubmit(values);
  };
  var site_url = betterLinksHooks.applyFilters('site_url', _utils_helper__WEBPACK_IMPORTED_MODULE_12__.site_url);
  return (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, data ? (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
    onClick: openModal,
    className: "dnd-link-button ".concat(isFetchTerms ? 'btl-rotating' : '')
  }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
    style: {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }, props.children), !props.children && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
    className: "icon"
  }, !isFetchTerms ? (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
    className: "btl btl-edit"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
    className: "btl btl-reload"
  }))) : (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
    onClick: openModal,
    className: "btl-create-link-button ".concat(isShowIcon && isFetchTerms ? 'btl-rotating' : '')
  }, isShowIcon ? (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
    className: "btl btl-add"
  }) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Add New Link', 'betterlinks'), " ", !isShowIcon && isFetchTerms ? ' ...' : ''), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_7___default()), {
    isOpen: modalIsOpen,
    onRequestClose: closeModal,
    style: _utils_helper__WEBPACK_IMPORTED_MODULE_12__.modalCustomStyles,
    ariaHideApp: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
    className: "btl-close-modal",
    onClick: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
    className: "btl btl-cancel"
  })), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Formik, {
    initialValues: betterLinksHooks.applyFilters('linkFormInitialValues', data ? initialUpdateValues : initialValues),
    onSubmit: submitLinkHandler
  }, function (props) {
    var _props$values, _props$values2;
    var redirectionTypes = (_props$values = props.values) !== null && _props$values !== void 0 && _props$values.enable_password ? _utils_data__WEBPACK_IMPORTED_MODULE_13__.redirectTypeForPasswordProtection : _utils_data__WEBPACK_IMPORTED_MODULE_13__.redirectType;
    var errors = props.errors;
    return (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Form, {
      className: "w-100"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-entry-content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_Teasers_UpgradeToPro__WEBPACK_IMPORTED_MODULE_18__["default"], {
      isOpenModal: isOpenUpgradeToProModal,
      closeModal: closeUpgradeToProModal
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_7___default()), {
      isOpen: modalUTMIsOpen,
      onRequestClose: closeUTMModal,
      style: _utils_helper__WEBPACK_IMPORTED_MODULE_12__.modalCustomSmallStyles,
      ariaHideApp: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "btl-close-modal",
      onClick: closeUTMModal
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
      className: "btl btl-cancel"
    })), isShowCustomUTMModalContent ? (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), null, betterLinksHooks.applyFilters('linksUTMBuilderField', (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_UTMBuilder__WEBPACK_IMPORTED_MODULE_17__["default"], {
      targetUrl: props.values.target_url,
      saveValueHandler: props.setFieldValue,
      closeModalHandler: closeUTMModal
    }), props.values.target_url, props.setFieldValue, closeUTMModal)) : (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), null, betterLinksHooks.applyFilters('linksBuiltInUTMBuilderField', '', props.values.target_url, props.setFieldValue, closeUTMModal))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-entry-content-left",
      style: {
        marginBottom: '20px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label btl-required",
      htmlFor: "link_title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Title', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-title-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-modal-form-control",
      id: "link_title",
      name: "link_title",
      disabled: isDisableLinkFormEditView,
      onChange: function onChange(e) {
        handleTitleChange(props.setFieldValue, e.target.value);
      },
      required: true
    }), errors.link_title && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      style: {
        color: 'red'
      }
    }, errors.link_title)), fetchedTitle && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_Link_FetchedTitleConfirmation__WEBPACK_IMPORTED_MODULE_23__["default"], {
      fetchedTitle: fetchedTitle,
      handleYes: function handleYes() {
        handleTitleChange(props.setFieldValue, fetchedTitle);
        setFetchedTitle(null);
      },
      handleNo: function handleNo() {
        return setFetchedTitle(null);
      }
    }))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label",
      htmlFor: "link_note"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Description', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-modal-form-control",
      component: "textarea",
      id: "link_note",
      name: "link_note",
      disabled: isDisableLinkFormEditView
    })), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label btl-required",
      htmlFor: "redirect_type"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Redirect Type', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_Select__WEBPACK_IMPORTED_MODULE_8__["default"], {
      id: "redirect_type",
      name: "redirect_type",
      value: [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(redirectionTypes), [{
        value: _utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled ? 'cloak' : 'pro',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Cloaked', 'betterlinks'),
        disabled: !_utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled
      }]),
      setUpgradeToProModal: setUpgradeToProModal,
      setFieldValue: props.setFieldValue,
      disabled: isDisableLinkFormEditView,
      isMulti: false,
      enable_password: (_props$values2 = props.values) === null || _props$values2 === void 0 ? void 0 : _props$values2.enable_password
    })), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group btl-has-utm-button"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label btl-required",
      htmlFor: "target_url"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Target URL', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-modal-form-control",
      id: "target_url",
      name: "target_url",
      onChange: function onChange(e) {
        var _props$values3, _props$values4;
        var target_url = e.target.value.replace(/\s+/g, '');
        props.setFieldValue('target_url', target_url);
        var willUpdateTitle = '' === ((_props$values3 = props.values) === null || _props$values3 === void 0 ? void 0 : _props$values3.link_title);
        fetchTargetURL(target_url, props.setFieldValue, willUpdateTitle, (_props$values4 = props.values) === null || _props$values4 === void 0 ? void 0 : _props$values4.link_title);
      },
      placeholder: "",
      disabled: isDisableLinkFormEditView,
      required: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-utm-button-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      type: "button",
      className: "btl-utm-button",
      onClick: openUTMModal,
      disabled: isDisableLinkFormEditView
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('UTM', 'betterlinks')), !_utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled ? (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      type: "button",
      className: "btl-share-button btl-share-button--locked",
      onClick: builtInUTMModalOpenHandler,
      disabled: isDisableLinkFormEditView
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
      className: "btl btl-share"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("img", {
      className: "locked",
      src: _utils_helper__WEBPACK_IMPORTED_MODULE_12__.plugin_root_url + 'assets/images/lock-round.svg',
      alt: "icon"
    })) : (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      type: "button",
      className: "btl-share-button",
      onClick: builtInUTMModalOpenHandler,
      disabled: isDisableLinkFormEditView
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
      className: "btl btl-share"
    })))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-shorturl-wrap"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group shorturl"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label",
      htmlFor: "short_url"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Shortened URL', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: slugIsExists ? 'btl-link-field-copyable is-invalid' : 'btl-link-field-copyable'
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "btl-static-link"
    }, site_url + '/'), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-dynamic-link",
      id: "short_url",
      name: "short_url",
      onChange: function onChange(e) {
        props.setFieldValue('short_url', e.target.value.replace(/\s+/g, '-'));
        setSlugIsExists(false);
      },
      disabled: isDisableLinkFormEditView,
      required: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_Copy__WEBPACK_IMPORTED_MODULE_16__["default"], {
      siteUrl: site_url,
      shortUrl: props.values.short_url
    }))), slugIsExists == true && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "errorlog"
    }, "Already Exists")), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label",
      htmlFor: "catId"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Category', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_Terms_Category__WEBPACK_IMPORTED_MODULE_14__["default"], {
      catId: parseInt(catId),
      data: terms,
      fieldName: "cat_id",
      setFieldValue: props.setFieldValue,
      disabled: isDisableLinkFormEditView
    })), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label",
      htmlFor: "tags"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Tags', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_Terms_Tags__WEBPACK_IMPORTED_MODULE_15__["default"], {
      linkId: data ? parseInt(data.ID) : 0,
      fieldName: "tags_id",
      data: terms,
      setFieldValue: props.setFieldValue,
      disabled: isDisableLinkFormEditView
    })), (customFields === null || customFields === void 0 ? void 0 : customFields.length) > 0 && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_CustomFields_LinkFields__WEBPACK_IMPORTED_MODULE_22__["default"], {
      props: props,
      customFields: customFields
    }), betterLinksHooks.applyFilters('isShowLinkSubmitButton', true, data) && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group btl-modal-form-group-submit"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      type: "submit",
      className: "btl-modal-submit-button"
    }, data ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Update', 'betterlinks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Publish', 'betterlinks')))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-entry-content-right"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "link-options ".concat(isOpenLinkPanel.options ? 'link-options--open' : '')
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      className: "link-options__head",
      type: "button",
      onClick: function onClick() {
        return togglePanel('options');
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("h4", {
      className: "link-options__head--title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Link Options', 'betterlinks')), " ", (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
      className: "btl btl-angle-arrow-down"
    })), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "link-options__body"
    }, betterlinksGutenStore && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-check",
      name: "openInNewTab",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('openInNewTab', !props.values.openInNewTab);
      },
      disabled: false
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Open In New Tab', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This will open your link in a new tab when clicked', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-check",
      name: "nofollow",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('nofollow', !props.values.nofollow);
      },
      disabled: isDisableLinkFormEditView
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('No Follow', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This will add nofollow attribute to your link. (Recommended)', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-check",
      name: "sponsored",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('sponsored', !props.values.sponsored);
      },
      disabled: isDisableLinkFormEditView
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Sponsored', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-check",
      name: "param_forwarding",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('param_forwarding', !props.values.param_forwarding);
      },
      disabled: isDisableLinkFormEditView
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Parameter Forwarding', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This will pass the parameters you have set in the target URL', 'betterlinks'))))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-checkbox-field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      className: "btl-check",
      name: "track_me",
      type: "checkbox",
      onChange: function onChange() {
        return props.setFieldValue('track_me', !props.values.track_me);
      },
      disabled: isDisableLinkFormEditView
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Tracking', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This will let you check Analytics report of your links', 'betterlinks'))))), !_utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-checkbox-field link-options--teasers",
      onClick: function onClick() {
        return openUpgradeToProModal();
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(formik__WEBPACK_IMPORTED_MODULE_27__.Field, {
      disabled: true,
      className: "btl-check",
      type: "checkbox",
      checked: false,
      onChange: function onChange() {
        return openUpgradeToProModal();
      },
      onClick: function onClick() {
        return openUpgradeToProModal();
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Uncloak', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      "class": "pro-badge"
    }, "Pro"), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-tooltip"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "dashicons dashicons-info-outline"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "btl-tooltiptext"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('This will uncloak your link', 'betterlinks'))))), betterLinksHooks.applyFilters('linkOptionsBasic', null, _objectSpread(_objectSpread({}, props), {}, {
      isDisableLinkFormEditView: isDisableLinkFormEditView,
      Field: formik__WEBPACK_IMPORTED_MODULE_27__.Field
    }, settings)))), !betterlinksGutenStore && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "link-options link-options--advanced ".concat(isOpenLinkPanel.advanced ? 'link-options--open' : '')
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      className: "link-options__head",
      type: "button",
      onClick: function onClick() {
        return togglePanel('advanced');
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("h4", {
      className: "link-options__head--title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Advanced', 'betterlinks'), " ", !_utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "pro-badge"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pro', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
      className: "btl btl-angle-arrow-down"
    })), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_Teasers_Link_AdvanceOptionTeaser__WEBPACK_IMPORTED_MODULE_24__["default"], {
      openUpgradeToProModal: openUpgradeToProModal
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, betterLinksHooks.applyFilters('linkOptionsAdvanced', null, _objectSpread(_objectSpread(_objectSpread({}, props), settings), {}, {
      password: password,
      metaTag: metaTag
    })))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "link-options link-options--dynamic-redirect ".concat(isOpenLinkPanel.dynamicRedirect ? 'link-options--open' : '')
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      className: "link-options__head",
      type: "button",
      onClick: function onClick() {
        return togglePanel('dynamicRedirect');
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("h4", {
      className: "link-options__head--title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Dynamic Redirects', 'betterlinks'), " ", !_utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "pro-badge"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pro', 'betterlinks')), ' ', _utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled && props.values.dynamic_redirect && props.values.dynamic_redirect.type && props.values.dynamic_redirect.type !== 'none' ? (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "status"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('ON', 'betterlinks')) : ''), ' ', (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("i", {
      className: "btl btl-angle-arrow-down"
    })), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "link-options__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_Teasers_Link_DynamicRedirectsTeaser__WEBPACK_IMPORTED_MODULE_25__["default"], {
      openUpgradeToProModal: openUpgradeToProModal
    }), betterLinksHooks.applyFilters('linkOptionsDynamicRedirect', null, props))), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_CustomizeLinkPreview__WEBPACK_IMPORTED_MODULE_19__["default"], {
      openAccordion: isOpenLinkPanel.optimizeMetaTags,
      openUpgradeToProModal: openUpgradeToProModal,
      form: props,
      settings: settings,
      metaTag: metaTag,
      __handleToggle: __handleToggle
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)(_components_CustomTrackingScripts__WEBPACK_IMPORTED_MODULE_20__["default"], {
      openAccordion: isOpenLinkPanel.customTrackingScripts,
      openUpgradeToProModal: openUpgradeToProModal,
      __handleToggle: __handleToggle,
      props: _objectSpread(_objectSpread({}, props), {}, {
        tracking: settings === null || settings === void 0 ? void 0 : settings.tracking,
        Field: formik__WEBPACK_IMPORTED_MODULE_27__.Field
      })
    }), !_utils_helper__WEBPACK_IMPORTED_MODULE_12__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "link-options link-options--auto-link-keywords"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      className: "link-options__head",
      type: "button",
      onClick: function onClick() {
        return openUpgradeToProModal();
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("h4", {
      className: "link-options__head--title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Auto-Link Keywords', 'betterlinks'), " ", (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("span", {
      className: "pro-badge"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pro', 'betterlinks'))))))))), betterLinksHooks.applyFilters('isShowLinkSubmitButton', true, data) && (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("div", {
      className: "btl-modal-form-group btl-modal-form-group-submit-medium-device"
    }, (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("label", {
      className: "btl-modal-form-label"
    }), (0,react__WEBPACK_IMPORTED_MODULE_4__.createElement)("button", {
      type: "submit",
      className: "btl-modal-submit-button"
    }, data ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Update', 'betterlinks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Publish', 'betterlinks'))));
  })));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    settings: state.settings,
    terms: state.terms,
    password: state.password,
    metaTags: state.metaTags
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    //👇 slight tweak (renamed 'fetch_terms_data' to 'fetch_terms_action_function') to use the <Link /> component inside gutenberg
    fetch_terms_data: (0,redux__WEBPACK_IMPORTED_MODULE_28__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_11__.fetch_terms_data, dispatch),
    fetch_tracking_settings: (0,redux__WEBPACK_IMPORTED_MODULE_28__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_21__.fetch_tracking_settings, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_9__.connect)(mapStateToProps, mapDispatchToProps)(Link));
Link.propTypes = propTypes;

/***/ }),

/***/ "./dev_betterlinks/containers/ListCanvas.js":
/*!**************************************************!*\
  !*** ./dev_betterlinks/containers/ListCanvas.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-data-table-component */ "./node_modules/react-data-table-component/dist/index.cjs.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/subDays/index.js");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_LinkCopyUrl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/LinkCopyUrl */ "./dev_betterlinks/components/LinkCopyUrl/index.js");
/* harmony import */ var _components_LinksFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/LinksFilter */ "./dev_betterlinks/components/LinksFilter/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");
/* harmony import */ var _redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../redux/actions/settings.actions */ "./dev_betterlinks/redux/actions/settings.actions.js");
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var _components_LinkQuickAction__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/LinkQuickAction */ "./dev_betterlinks/components/LinkQuickAction/index.js");
/* harmony import */ var _components_FavoriteIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/FavoriteIcon */ "./dev_betterlinks/components/FavoriteIcon/index.js");
/* harmony import */ var _components_Loader_TableLoader__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/Loader/TableLoader */ "./dev_betterlinks/components/Loader/TableLoader.js");
/* harmony import */ var _utils_customHooks__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utils/customHooks */ "./dev_betterlinks/utils/customHooks.js");
/* harmony import */ var _redux_actions_password_actions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../redux/actions/password.actions */ "./dev_betterlinks/redux/actions/password.actions.js");
/* harmony import */ var _redux_actions_metaTags_actions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../redux/actions/metaTags.actions */ "./dev_betterlinks/redux/actions/metaTags.actions.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Link */ "./dev_betterlinks/containers/Link.js");























var getLinksListViewColumnData = function getLinksListViewColumnData(props) {
  var _props$settings;
  var is_allow_qr = props === null || props === void 0 || (_props$settings = props.settings) === null || _props$settings === void 0 || (_props$settings = _props$settings.settings) === null || _props$settings === void 0 ? void 0 : _props$settings.is_allow_qr;
  return [{
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Title', 'betterlinks'),
    selector: 'link_title',
    sortable: false,
    width: '255px',
    cell: function cell(row) {
      var expireStatusDot = (0,_utils_customHooks__WEBPACK_IMPORTED_MODULE_16__.useBtlExpireStatusDot)({
        data: row,
        view: 'list'
      });
      return !!row.link_title && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_FavoriteIcon__WEBPACK_IMPORTED_MODULE_14__["default"], {
        data: row
      }), expireStatusDot, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_Link__WEBPACK_IMPORTED_MODULE_19__["default"], {
        catId: parseInt(row.cat_id),
        catName: '',
        data: row,
        submitHandler: props.edit_link
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
        className: "btl-link-title"
      }, row.link_title)));
    }
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Shortened URL', 'betterlinks'),
    selector: 'short_url',
    sortable: false,
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_LinkCopyUrl__WEBPACK_IMPORTED_MODULE_7__["default"], {
        shortUrl: row.short_url
      });
    }
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Target URL', 'betterlinks'),
    selector: 'target_url',
    sortable: false,
    // width: '450px',
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
        className: "btl-short-url-wrapper"
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
        className: "btl-short-url btl-truncate",
        title: row.target_url
      }, row.target_url), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("a", {
        className: "dnd-link-button",
        href: row.target_url,
        target: "_blank"
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
        className: "btl btl-visit-url"
      })));
    }
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Redirect Type', 'betterlinks'),
    selector: 'redirect_type',
    sortable: false,
    width: '80px',
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, row.redirect_type == 'cloak' ? 'Cloaked' : row.redirect_type);
    }
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clicks', 'betterlinks'),
    selector: '',
    sortable: false,
    width: '120px',
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, row.analytic ? (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
        className: "dnd-link-button btl-tooltip"
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
        className: "btl-tooltiptext"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clicks: ', 'betterlinks') + row.analytic.link_count + ' / ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Unique Clicks: ', 'betterlinks') + row.analytic.ip), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
        className: "icon"
      }, (0,_utils_helper__WEBPACK_IMPORTED_MODULE_9__.analytic)(row.analytic, row.ID))) : (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
        className: "dnd-link-button btl-tooltip"
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
        className: "btl-tooltiptext"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clicks: 0 / ', 'betterlinks') + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Unique Clicks: 0', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
        className: "icon"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('0/0', 'betterlinks'))));
    }
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Date', 'betterlinks'),
    selector: 'link_date',
    sortable: false,
    width: '120px',
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_6__.dateI18n)(_utils_helper__WEBPACK_IMPORTED_MODULE_9__.betterlinks_date_format || 'F j, Y', new Date(row.link_date)));
    }
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Action', 'betterlinks'),
    selector: '',
    sortable: false,
    width: '150px',
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
        className: "btl-list-view-action-wrapper"
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_LinkQuickAction__WEBPACK_IMPORTED_MODULE_13__["default"], {
        isAlowQr: is_allow_qr,
        isShowVisitLink: true,
        isShowAnalytics: false,
        isShowCopyLink: false,
        catId: parseInt(row.cat_id),
        submitLinkHandler: props.edit_link,
        deleteLinkHandler: props.delete_link,
        data: row,
        isShowEditLink: betterLinksHooks.applyFilters('betterLinksIsShowViewLink', true),
        isShowDeleteLink: betterLinksHooks.applyFilters('betterLinksIsShowDeleteLink', true)
      }));
    }
  }];
};
var ListCanvas = function ListCanvas(props) {
  var links = props.links.links;
  var settings = props.settings.settings;
  var terms = props.terms.terms;
  var password = props.password.password;
  var metaTags = props.metaTags.metaTags;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({}),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    bulkActionData = _useState2[0],
    setBulkActionData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
    filterText = _useState4[0],
    setFilterText = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
    resetPaginationToggle = _useState6[0],
    setResetPaginationToggle = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState7, 2),
    selectedCategory = _useState8[0],
    setCategory = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState9, 2),
    selectedTag = _useState10[0],
    setTag = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState11, 2),
    selectedClicksType = _useState12[0],
    setClicksType = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState14 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState13, 2),
    selectedDateType = _useState14[0],
    setDateType = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState16 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState15, 2),
    isOpenCustomDateFilter = _useState16[0],
    setIsOpenCustomDateFilter = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([{
      startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_20__["default"])(new Date(), 30),
      endDate: new Date(),
      key: 'selection'
    }]),
    _useState18 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState17, 2),
    customDateFilter = _useState18[0],
    setCustomDateFilter = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState20 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState19, 2),
    toggledClearRows = _useState20[0],
    setToggledClearRows = _useState20[1];
  var sortByFav = props.favouriteSort.sortByFav;
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (!links) {
      props.fetch_links_data();
    }
    if (!settings) {
      props.fetch_settings_data();
      props.fetch_tracking_settings();
    }
    if (!terms) {
      props.fetch_terms_data();
    }
    if (!password) {
      props.fetch_links_password();
    }
    if (!metaTags) {
      props.fetch_meta_tags();
    }
  }, []);
  var stored = links && Object.values(links).reduce(function (total, item) {
    total = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(total), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(item.lists));
    return total;
  }, []);
  var categories = links && Object.entries(links).reduce(function (total, _ref) {
    var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, 2),
      key = _ref2[0],
      item = _ref2[1];
    total = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(total), [{
      value: key,
      label: item.term_name
    }]);
    return total;
  }, []);
  var tags = links && Object.entries((0,_utils_helper__WEBPACK_IMPORTED_MODULE_9__.get_tags)(links)).reduce(function (total, item) {
    total = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(total), [{
      value: item === null || item === void 0 ? void 0 : item[0],
      label: item === null || item === void 0 ? void 0 : item[1]
    }]);
    return total;
  }, []);
  var dateFilterControl = function dateFilterControl(type) {
    setDateType(type);
    if (type && type.value == 'custom') {
      (0,_utils_helper__WEBPACK_IMPORTED_MODULE_9__.insertOverlayElement)();
      setIsOpenCustomDateFilter(!isOpenCustomDateFilter);
    } else {
      setIsOpenCustomDateFilter(false);
    }
  };
  var resetFilterHandler = function resetFilterHandler() {
    setFilterText('');
    setCategory(null);
    setTag(null);
    setClicksType(null);
    setDateType(null);
    setIsOpenCustomDateFilter(false);
  };
  var _onSelectedRowsChange = function onSelectedRowsChange(e) {
    setBulkActionData(e);
  };
  var handleClearRows = function handleClearRows() {
    setToggledClearRows(!toggledClearRows);
  };
  var subHeaderComponentMemo = react__WEBPACK_IMPORTED_MODULE_2___default().useMemo(function () {
    var handleClear = function handleClear() {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_LinksFilter__WEBPACK_IMPORTED_MODULE_8__["default"], {
      deleteLinkHandler: props.delete_link,
      catItems: categories,
      tagItems: tags,
      bulkActionData: bulkActionData,
      onFilter: function onFilter(e) {
        return setFilterText(e.target.value);
      },
      selectedCategory: selectedCategory,
      categorySelectHandler: setCategory,
      selectedTag: selectedTag,
      tagSelectHandler: setTag,
      selectedClicksType: selectedClicksType,
      setClicksType: setClicksType,
      selectedDateType: selectedDateType,
      dateHandler: dateFilterControl,
      customDateFilter: customDateFilter,
      setCustomDateFilter: setCustomDateFilter,
      isOpenCustomDateFilter: isOpenCustomDateFilter,
      setIsOpenCustomDateFilter: setIsOpenCustomDateFilter,
      onClear: handleClear,
      filterText: filterText,
      resetFilterHandler: resetFilterHandler,
      setToggledClearRows: handleClearRows
    });
  }, [filterText, resetPaginationToggle, bulkActionData, _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.delete_link, categories, customDateFilter, setCustomDateFilter, isOpenCustomDateFilter, setIsOpenCustomDateFilter, resetFilterHandler]);
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-list-view"
  }, links ? (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_data_table_component__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "btl-list-view-table",
    columns: getLinksListViewColumnData(props),
    data: (0,_utils_helper__WEBPACK_IMPORTED_MODULE_9__.linksFilterData)(stored, filterText, selectedCategory, selectedClicksType, selectedDateType, customDateFilter, sortByFav, selectedTag),
    pagination: true,
    paginationResetDefaultPage: resetPaginationToggle,
    subHeader: true,
    highlightOnHover: true,
    onChangeRowsPerPage: function onChangeRowsPerPage(rpp) {
      return localStorage.setItem('btlRowsPerPage', rpp);
    },
    paginationPerPage: +localStorage.getItem('btlRowsPerPage') || 10,
    subHeaderComponent: subHeaderComponentMemo,
    persistTableHead: true,
    selectableRows: true,
    selectableRowsVisibleOnly: true,
    onSelectedRowsChange: function onSelectedRowsChange(e) {
      return _onSelectedRowsChange(e);
    },
    clearSelectedRows: toggledClearRows,
    paginationRowsPerPageOptions: [10, 30, 50, 100, 200]
  }) : (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_Loader_TableLoader__WEBPACK_IMPORTED_MODULE_15__["default"], null)));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    links: state.links,
    settings: state.settings,
    terms: state.terms,
    favouriteSort: state.favouriteSort,
    password: state.password,
    metaTags: state.metaTags
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetch_links_data: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.fetch_links_data, dispatch),
    fetch_settings_data: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_11__.fetch_settings_data, dispatch),
    fetch_tracking_settings: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_settings_actions__WEBPACK_IMPORTED_MODULE_11__.fetch_tracking_settings, dispatch),
    add_new_cat: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.add_new_cat, dispatch),
    add_new_link: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.add_new_link, dispatch),
    edit_link: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.edit_link, dispatch),
    delete_link: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_10__.delete_link, dispatch),
    fetch_terms_data: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_12__.fetch_terms_data, dispatch),
    fetch_links_password: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_password_actions__WEBPACK_IMPORTED_MODULE_17__.fetch_links_password, dispatch),
    fetch_meta_tags: (0,redux__WEBPACK_IMPORTED_MODULE_21__.bindActionCreators)(_redux_actions_metaTags_actions__WEBPACK_IMPORTED_MODULE_18__.fetch_meta_tags, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_4__.connect)(mapStateToProps, mapDispatchToProps)(ListCanvas));

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
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../redux/actions/activity.actions */ "./dev_betterlinks/redux/actions/activity.actions.js");
/* harmony import */ var _redux_actions_favouritesort_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../redux/actions/favouritesort.actions */ "./dev_betterlinks/redux/actions/favouritesort.actions.js");
/* harmony import */ var _DeleteClicks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DeleteClicks */ "./dev_betterlinks/containers/DeleteClicks.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);


var _excluded = ["is_pro", "render"];










var propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string),
  render: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func)
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
  }, props.label), is_pro && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    "class": "pro-badge"
  }, "Pro")), render()), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar-inner"
  }, currentPage === 'betterlinks' && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-view-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
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
    className: "btl-link-view-toggler ".concat(props.activity.linksView == 'list' ? 'active' : ''),
    onClick: function onClick() {
      return props.linksView('list');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-list"
  })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
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
    htmlFor: "theme-mood"
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
    linksView: (0,redux__WEBPACK_IMPORTED_MODULE_10__.bindActionCreators)(_redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__.linksView, dispatch),
    sortFavourite: (0,redux__WEBPACK_IMPORTED_MODULE_10__.bindActionCreators)(_redux_actions_favouritesort_actions__WEBPACK_IMPORTED_MODULE_7__.sortFavourite, dispatch),
    update_theme_mode: (0,redux__WEBPACK_IMPORTED_MODULE_10__.bindActionCreators)(_redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__.update_theme_mode, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)(TopBar));

/***/ }),

/***/ "./dev_betterlinks/pages/ManageLinks.js":
/*!**********************************************!*\
  !*** ./dev_betterlinks/pages/ManageLinks.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _containers_TopBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/TopBar */ "./dev_betterlinks/containers/TopBar.js");
/* harmony import */ var _containers_DndCanvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../containers/DndCanvas */ "./dev_betterlinks/containers/DndCanvas.js");
/* harmony import */ var _containers_ListCanvas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../containers/ListCanvas */ "./dev_betterlinks/containers/ListCanvas.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");
/* harmony import */ var _redux_actions_password_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../redux/actions/password.actions */ "./dev_betterlinks/redux/actions/password.actions.js");
/* harmony import */ var _containers_Link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../containers/Link */ "./dev_betterlinks/containers/Link.js");











var ManageLinks = function ManageLinks(_ref) {
  var add_new_link = _ref.add_new_link,
    add_new_password = _ref.add_new_password,
    activity = _ref.activity,
    favouriteSort = _ref.favouriteSort;
  var sortByFav = favouriteSort.sortByFav;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_containers_TopBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('BetterLinks', 'betterlinks'),
    render: function render() {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, betterLinksHooks.applyFilters('betterLinksIsShowWriteLink', true) && !sortByFav && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "btl-create-links"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_containers_Link__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isShowIcon: false,
        submitHandler: add_new_link,
        add_new_password: add_new_password
      })));
    }
  }), activity.linksView == 'list' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_containers_ListCanvas__WEBPACK_IMPORTED_MODULE_5__["default"], null) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_containers_DndCanvas__WEBPACK_IMPORTED_MODULE_4__["default"], null));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    activity: state.activity,
    favouriteSort: state.favouriteSort
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    add_new_link: (0,redux__WEBPACK_IMPORTED_MODULE_9__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_6__.add_new_link, dispatch),
    add_new_password: (0,redux__WEBPACK_IMPORTED_MODULE_9__.bindActionCreators)(_redux_actions_password_actions__WEBPACK_IMPORTED_MODULE_7__.add_new_password, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, mapDispatchToProps)(ManageLinks));

/***/ })

}]);
//# sourceMappingURL=manage-links.js.map